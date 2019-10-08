var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');

router.get('/signUp', function(req, res) {
	User.find().where('username').exec(function(err, foundUsername) {
		console.log('backend user');
		console.log(foundUsername);

		res.json(foundUsername);
	});
});

router.post('/signUp', function(req, res, next) {
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		avatar: req.body.avatar,
		age: req.body.age,
		address: req.body.address,
		phone_first: req.body.phone_first,
		phone_middle: req.body.phone_middle,
		phone_last: req.body.phone_last
	});
	var password = req.body.password;
	console.log('id: ' + req.body.username);
	console.log('password: ' + password);
	User.register(newUser, password, function(err,newuser) {
		if(err){
			console.log(err);
			return res.json({result: 0});
		}else{
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
	console.log('user ');
	console.log(req.user);
	req.session._id = req.user._id;
	sendmsg.isAdmin = req.user.isAdmin;
	sendmsg.username = req.user.username;
	sendmsg.session = req.session._id;
	console.log('sendmsg object!!!');
	console.log(sendmsg);
	 res.json(sendmsg);
});


router.get('/logout', function(req, res) {
	req.logout();
	res.json({msg: 'logout'});
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
					alert('존재하지 않는 email 입니다.')
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
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
							//req.headers.host 는 내 홈페이지 기본 주소.
			          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
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

// router.get('/reset/:token', function(req, res) {
// 	User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user) {
// 		if(!user) {
// 			res.json('존재하지 않는 유저입니다.')
// 		} else {

// 		}
// 	});
// });

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
						console.log('비밀번호 변경.')
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
				text: 'Hello \n\n' +
					  'This is a confirmation that the password for your account ' + user.username + ' has just changed.'
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

module.exports = router;
