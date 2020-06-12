var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/products');
var PurchaseState = require('../models/purchaseState');
var passport = require('passport');
const crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');
var moment = require('moment');
require('dotenv').config();
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

router.get('/signUp', function(req, res) {
	User.find().where('username').exec(function(err, foundUsername) {
		var users = [];
		for(var i=0; i< foundUsername.length; i++){
			users.push(foundUsername[i].username);
		}
		res.json(users);
	});
});

router.post('/signUp', function(req, res, next) {
	var newUser = new User({
		username: req.body.username,
		nickname: req.body.nickname,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		avatar: req.body.avatar,
		age: req.body.age,
		postcode: req.body.postcode,
		roadAddress: req.body.roadAddress,
		jibunAddress: req.body.jibunAddress,
		detailAddress: req.body.detailAddress,
		extraAddress: req.body.extraAddress,
		phone_first: req.body.phone_first,
		phone_middle: req.body.phone_middle,
		phone_last: req.body.phone_last
	});
	var password = req.body.password;
	User.register(newUser, password, function(err,newuser) {
		if(err){
			console.log(err);
			return res.json({result: 0});
		}else{
			console.log(newuser);
			passport.authenticate('local', function (err, user, info) {
			    var error = err || info;
			    if (error) return res.json(401, error);
			    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

			    // 인증된 유저 정보로 응답
			    res.json({result: 1});
			  })(req, res, next);
		}
	});
});

router.post('/', passport.authenticate('local') ,function(req, res) {
	let sendmsg = {};
	req.session._id = req.user._id;
	sendmsg.isAdmin = req.user.isAdmin;
	sendmsg.username = req.user.username;
	sendmsg.nickname = req.user.nickname;
	sendmsg.session = req.session._id;
	 res.json(sendmsg);
});


router.get('/logout', function(req, res) {
	req.logout();
	res.json({msg: 'see you again.'});
});

router.post('/forgot', function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({username: req.body.username}, function(err, user) {
				if(!user) {
					res.json({result: '존재하지 않는 Email 입니다.'});
				} else {
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000;

					user.save(function(err){
						done(err, token, user);
					});
				}
			});
		},
		function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: 'Gmail',
				auth:{
					user: 'lim945169@gmail.com',
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.username,
				from: 'lim945169@gmail.com',
				subject: 'Password Reset',
				text: '당신(혹은 다른 사람)이 당신의 계정에 대한 비밀번호 재설정을 요청하여 해당메일이 전송되었습니다.\n\n' +
			          '아래의 링크를 클릭하거나 브라우저에 붙어넣기를 하여 다음을 수행하세요:\n\n' +
							//req.headers.host 는 내 홈페이지 기본 주소.
			          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			          '이 메일을 본인이 요청하지 않은 경우 이 메일을 무시하십시오. 암호가 변경되지 않은 상태로 유지될 수 있습니다.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err){
				console.log('mail sent');
				done(err, 'done');
			});
		}
	],function(err) {
		if(err) {
			res.json({result: '실패하였습니다.'})
		} else {
			res.json({result: '메일이 전송되었습니다.'})
		}
	});
});

router.post('/reset/:token', function(req, res) {
	async.waterfall([
		function(done) {
			User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
				if(!user) {
					res.json('존재하지 않는 유저입니다.')
				}
				user.setPassword(req.body.password, function(err) {
					user.resetPasswordToken = undefined;
					user.resetPasswordExpires = undefined;

					user.save(function(err) {
						req.logIn(user, function(err) {
							done(err, user);
						});
					});
				});
			});
		},
		function(user, done) {
			var smtpTransport = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: 'lim945169@gmail.com',
					pass: process.env.GMAILPW
				}
			});
			var mailOptions = {
				to: user.username,
				from: 'lim945169@gmail.com',
				subject: 'Your Password has been changed',
				text: '반갑습니다. \n\n' +
					  user.username + ' 계정의 암호가 성공적으로 변경되었습니다.'
			};
			smtpTransport.sendMail(mailOptions, function(err){
				done(err,'done');
			});
		}
	], function(err) {
		if(err) {
			res.json({result: '실패하였습니다.'})
		} else {
			res.json({result: '비밀번호가 변경되었습니다.'})
		}
	});
});

router.get('/:id/basket', function(req, res) {
	User.findById(req.params.id).where('basket').populate('basket').exec(function(err, foundUserBasket) {
		res.json(foundUserBasket);
	});
});

//User's item in shopping basket Route
router.post("/:id/basket", function(req,res){
	User.findById(req.body.userid, function(err, foundUser) {
		if(err) {
			console.log(err);
		}
		var foundBasketUser = foundUser.basket.some(function(basket) {
				return basket.equals(req.params.id);
		});
		if(foundBasketUser) {
			//already have, removing product
			foundUser.basket.pull(req.params.id);
		}else {
			foundUser.basket.push(req.params.id);
		}
		foundUser.save(function(err) {
			if(err) {
				console.log(err);
			}
			res.json(foundUser.basket);
		});
	});
});

router.get('/:id/orders', function(req, res) {
	User.findById(req.params.id).where('orders').populate('orders.product').exec(function(err, foundUserOrders) {
		res.json(foundUserOrders);
	});
});
router.post("/:id/orders/lookUp", function(req,res){
	User.findById(req.params.id).where('orders').populate('orders.product').exec(function(err, foundUser) {
		let data = moment();
		let orderArray = [];
		let orderTime;
		let userOders = foundUser.orders;
		for(let [idx,user] of userOders.entries()) {
			//문자열을 moment객체로 만들기.
			orderTime = moment(user.date,'YYYY-MM-DD HH:mm:ss')
			if(req.body.year) {
				let year = moment(req.body.year,'YYYY')
				if(year.diff(orderTime,req.body.type)==0) {
					orderArray.push(user)
				}
			} else {
				if(data.diff(orderTime,req.body.type)<=req.body.num) {
					orderArray.push(user)
				}
			}
		}
		res.json(orderArray);
	});
});

router.post("/:id/orders", function(req,res){
	User.findById(req.body.userid, function(err, foundUser) {
		let data = moment().format('YYYY-MM-DD HH:mm:ss');
		let randomCode = randomString(20);
		let ob={}
		ob.product=req.params.id;
		ob.date = data;
		ob.delivery = '배송 준비중';
		ob.orderCode = randomCode;
		foundUser.orders.push(ob);
		foundUser.save(function(err) {
			if(err) {
				coonsole.log(err);
			}
			res.json(ob);
		});
	});
});

router.get("/:id/purchaseState", function(req, res) {
	if(req.params.id != process.env.ADMIN) {
		res.json({result: 'fail'})
	} else {
		User.findById(req.params.id).populate('purchaseState').exec(function(err, foundUser) {
			res.json(foundUser.purchaseState);
		})
	}
})

router.post("/:id/purchaseState", function(req, res) {
	var newPurchaseProduct = {
		username:req.body.username,
		postcode:req.body.postcode,
		roadAddress:req.body.roadAddress,
		jibunAddress:req.body.jibunAddress,
		detailAddress:req.body.detailAddress,
		purchasePrice:req.body.purchasePrice,
		productName:req.body.productName,
		thumbnail:req.body.thumbnail,
		purchaseDate:req.body.purchaseDate,
		purchaseCode: req.body.purchaseCode,
		delivery: req.body.delivery,
		SItems:req.body.SItems,
		MItems:req.body.MItems,
		LItems:req.body.LItems,
		XLItems:req.body.XLItems,
		FreeItems:req.body.FreeItems
	}

	User.findById(process.env.ADMIN,function(err, foundUser) {
		if(err) {
			console.log(err);
		} else {
			PurchaseState.create(newPurchaseProduct, function(err, newpurchaseProduct) {
				if(err) {
					res.json({result: 'fail'})
				} else {
					foundUser.purchaseState.push(newpurchaseProduct._id);
					foundUser.save();
					res.json({result:'success'});
				}
			})
		}

	})
})

router.post("/:id/purchaseState/lookUp", function(req, res) {
	User.findById(req.params.id).populate('purchaseState').exec(function(err, foundProducts) {
		let data = moment();
		let productArray = [];
		let orderTime;
		let purchaseState = foundProducts.purchaseState;
		for(let [idx,product] of purchaseState.entries()) {
			orderTime = moment(product.purchaseDate,'YYYY-MM-DD HH:mm:ss')
			if(req.body.year) {
				let year = moment(req.body.year,'YYYY')
				if(year.diff(orderTime,req.body.type)==0) {
					productArray.push(product)
				}
			} else {
				if(data.diff(orderTime,req.body.type)<=req.body.num) {
					productArray.push(product)
				}
			}
		}
		res.json(productArray);
	})
})

router.post("/:id/purchaseState/delivery", function(req, res) {
	let code = req.body.purchaseCode;
	let state;
	if(req.body.state =="배송 준비중")state="배송중";
	else if(req.body.state =="배송중")state="배송 완료";

	User.find().where('orders.orderCode').equals(code).populate('orders.product').exec(function(err, find) {
		let findIdx=find[0].orders.findIndex(i=>i.orderCode==code);
		find[0].orders[findIdx].delivery=state;
		find[0].save(function(err) {
			if(err) {
				console.log(err);
				res.json({result: 'fail'});
			} else {
				PurchaseState.find().where('purchaseCode').equals(code).exec(function(err, foundProduct) {
					foundProduct[0].delivery=state;
					foundProduct[0].save(function(err){
						if(err){
							console.log(err);
							res.json({result:'fail'});
						} else {
							res.json(state)
						}
					})
				})
			}
		})
	})
})

router.delete('/:id/purchaseState/:productid', function(req, res) {
	PurchaseState.findByIdAndRemove(req.params.productid, function(err){
		if(err){
			res.json({result: 'fail'})
		}else{
			User.findById(req.params.id, function(err, foundUser) {
				if(err) {
					console.log(err);
					res.json({result:'fail'});
				} else {
					for(var i=0; i < foundUser.purchaseState.length; i++) {
						if(foundUser.purchaseState[i]._id == req.params.productid) {
							foundUser.purchaseState.splice(i,1);
							foundUser.save();
						}
					}
					res.json({result:'success'});
				}
			})
		}
	})
})

router.get('/:id/myPage', function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		res.json(foundUser);
	});
});

router.put("/:id/myPage/edit", function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if(err) {
			console.log(err);
		} else {
			foundUser.nickname = req.body.nickname
			foundUser.lastName = req.body.lastName
			foundUser.firstName = req.body.firstName
			foundUser.avatar = req.body.avatar
			foundUser.age = req.body.age
			foundUser.postcode = req.body.postcode
			foundUser.roadAddress = req.body.roadAddress
			foundUser.jibunAddress = req.body.jibunAddress
			foundUser.detailAddress = req.body.detailAddress
			foundUser.extraAddress = req.body.extraAddress
			foundUser.phone_first = req.body.phone_first
			foundUser.phone_middle = req.body.phone_middle
			foundUser.phone_last = req.body.phone_last
			foundUser.save(function(err) {
				if(err) {
					console.log(err);
					res.json({result: 'fail'});
				} else {
					res.json(foundUser);
				}
			})
		}
	})
});

router.delete("/:id/myPage/comments", function(req, res) {
	Product.find({}).populate('comments').exec( function(err, docs) {
		if(err){
			console.log(err);
			res.json({result: 'fail'})
		} else {
			for(var i=0; i<docs.length; i++) {
				for(var j=0 ; j<docs[i].comments.length; j++) {
					if(docs[i].comments[j].author.id == req.params.id) {
						docs[i].comments.splice(j, 1);
						j -= 1;
					}
				}
				docs[i].save();
			}
			res.json({result: 'success'});
		}
	})
})

router.delete("/:id/myPage" ,function(req,res){
	Product.find({}).populate('comments').exec( function(err, docs) {
		if(err){
			console.log(err);
		} else {
			for(var i=0; i<docs.length; i++) {
				for(var j=0 ; j<docs[i].comments.length; j++) {
					if(docs[i].comments[j].author.id == req.params.id) {
						docs[i].comments.splice(j, 1);
						j -= 1;
					}
				}
				docs[i].save();
			}
			for(var i=0; i<docs.length; i ++) {
				for(var j=0; j<docs[i].likes.length; j++) {
					if(docs[i].likes[j]._id == req.params.id) {
						docs[i].likes.splice(j, 1);
						j -= 1;
					}
				}
				docs[i].save();
			}
			 User.findByIdAndRemove(req.params.id, function(err){
			 	if(err){
			 		res.json({result: 'fail'})
			 	}else{
			 		res.json({result: 'success'})
			 	}
			 });
		}
	})
});

router.get("/:id/management", function(req, res) {
	let sendObj = {};
	let perPage =20;
	let allUsersNum = null;
	let pageQuery = parseInt(req.query.page);
	let pageNum = pageQuery ? pageQuery : 1;

	if(req.params.id != process.env.ADMIN) {
		res.json({result: 'fail'})
	} else {
		if(req.query.search) {
			const regex = new RegExp(escapeRegex(req.query.search), 'gi');
			User.find({username: regex}).sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, searchUsers){
	           	User.count({username: regex}).exec(function(err, count) {
		           if(err){
		               console.log(err);
		           } else {
		              if(searchUsers.length < 1) {
		                res.json({noMatch: '검색내용과 일치하는 상품이 없습니다.'});
		              } else {
										let userData = searchUsers;
										for(let [idx,user] of userData.entries()) {
											if(user._id==process.env.ADMIN) {
												userData.splice(idx,1);
											}
											if(user.orders)user.orders=undefined;
											if(user.basket)user.basket=undefined;
											if(user.purchaseState)user.purchaseState=undefined;
										}
		              	sendObj.current = pageNum;
		              	sendObj.pages = Math.ceil(count/perPage);
		              	sendObj.page = 'users';
		           			sendObj.users = userData;
		              	res.json(sendObj);
		              }
		           }
	        	});
	      	});
		} else {
			User.find({}).sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, allUsers){
				User.count().exec(function(err, count) {
					if(err){
						console.log(err);
					}else{
						let userData = allUsers;
						for(let [idx,user] of userData.entries()) {
							if(user._id==process.env.ADMIN) {
								userData.splice(idx,1);
							}
							if(user.orders)user.orders=undefined;
							if(user.basket)user.basket=undefined;
							if(user.purchaseState)user.purchaseState=undefined;
						}
						sendObj.current = pageNum;
		        sendObj.pages = Math.ceil(count/perPage);
		        sendObj.page = 'users';
		        sendObj.users = userData;
		        res.json(sendObj);
					}
					});
			});
		}
	}
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
function randomString(leng) {
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	let string_length = leng;
	let randomstring = '';
	for (let i=0; i<string_length; i++) {
	let rnum = Math.floor(Math.random() * chars.length);
	randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}
module.exports = router;
