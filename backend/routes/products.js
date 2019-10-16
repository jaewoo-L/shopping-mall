var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var async = require('async');
//multer를 이용해 imagefile 저장할 cloud
var cloudinary = require('cloudinary').v2;
//file 업로드에 사용되는 module
var multer = require('multer');
var storage = multer.diskStorage({
	//filename: function(req, file, callback) {
		//callback(null, Date.now() + file.originalname);
	//}
});
//file형식이 이미지가 맞는지 filtering
var imageFilter = function(req, file, callback) {
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});

cloudinary.config({
	cloud_name: 'du8m0pgtu',
	api_key: '912133187682198',
	api_secret: '2VtyQEbrxPHQLpvx7bTFQY0IFcI'
});


//INDEX Display a list of all products
// router.get('/', function(req,res){

// 	//Get all products from DB
// 	console.log(req.query.search);
// 	if(req.query.search) {
// 		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
// 		Product.find({name: regex}, function(err, allProducts){
//            if(err){
//                console.log(err);
//            } else {
//               if(allProducts.length < 1) {
//                 res.json({noMatch: '검색내용과 일치하는 상품이 없습니다.'});
//               } else {
//               	res.json(allProducts);
//               }
//            }
//         });
// 	} else {
// 		Product.find({},function(err,allProducts){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				res.json(allProducts);
// 			}
// 		});
// 	}
// });

router.get('/', function(req,res){
	let sendmsg= {};
	let perPage =3;
	let productnumber = null ;
	console.log('req.query.page ===');
	console.log(req.query.page);
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	//Get all products from DB
	console.log(req.query.search);
	Product.find({}, function(err, products) {
		if(err) {
			console.log(err);
		} else {
			productnumber = products.length;
		}
	});
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Product.find({name: regex}).skip((pageNumber*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
           	Product.count().exec(function(err, count) {
	           if(err){
	               console.log(err);
	           } else {
	              if(allProducts.length < 1) {
	                res.json({noMatch: '검색내용과 일치하는 상품이 없습니다.'});
	              } else {
	              	sendmsg.current = pageNumber;
	              	sendmsg.pages = Math.ceil(count/perPage);
	              	sendmsg.page = 'products';
	           		sendmsg.products = allProducts;
	           		sendmsg.productnumber = productnumber;
	              	console.log(sendmsg);
	              	res.json(sendmsg);
	              }
	           }
        	});
      	});
	} else {
		Product.find({}).skip((pageNumber*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
			Product.count().exec(function(err, count) {
				if(err){
					console.log(err);
				}else{
					sendmsg.current = pageNumber;
	              	sendmsg.pages = Math.ceil(count/perPage);
	              	sendmsg.page = 'products';
	           		sendmsg.products = allProducts;
	           		sendmsg.productnumber = productnumber;
	              	console.log(sendmsg);
	              	res.json(sendmsg);
				}
				});
		});	
	}
});

//INDEX Display a list of tops products
router.get('/tops', function(req,res){
	let sendmsg= {};
	let perPage =3;
	let productnumber = null ;
	console.log('req.query.page ===');
	console.log(req.query.page);
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('tops').exec(function(err,topsProducts){
		if(err){
			console.log(err);
		}else{
			productnumber = topsProducts.length;
		}
	});

	Product.find().where('kinds').equals('tops').skip((pageNumber*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('tops').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendmsg.current = pageNumber;
	            sendmsg.pages = Math.ceil(count/perPage);
	            sendmsg.page = 'topProducts';
	           	sendmsg.products = allProducts;
	           	sendmsg.productnumber = productnumber;
	            console.log(sendmsg);
	            res.json(sendmsg);
			}
		});
	});	
});


//INDEX Display a list of bottoms products
router.get('/bottoms', function(req,res){
	let sendmsg= {};
	let perPage =3;
	let productnumber = null ;
	console.log('req.query.page ===');
	console.log(req.query.page);
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('bottoms').exec(function(err,bottomsProducts){
		if(err){
			console.log(err);
		}else{
			productnumber = bottomsProducts.length;
		}
	});
	Product.find().where('kinds').equals('bottoms').skip((pageNumber*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('bottoms').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendmsg.current = pageNumber;
	            sendmsg.pages = Math.ceil(count/perPage);
	            sendmsg.page = 'bottomPproducts';
	           	sendmsg.products = allProducts;
	           	sendmsg.productnumber = productnumber;
	            console.log(sendmsg);
	            res.json(sendmsg);
			}
		});
	});	
});

//INDEX Display a list of accs products
router.get('/accs', function(req,res){
	let sendmsg= {};
	let perPage =3;
	let productnumber = null ;
	console.log('req.query.page ===');
	console.log(req.query.page);
	let pageQuery = parseInt(req.query.page);
	let pageNumber = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('accs').exec(function(err,accsProducts){
		if(err){
			console.log(err);
		}else{
			productnumber = accsProducts.length;
		}
	});
	Product.find().where('kinds').equals('accs').skip((pageNumber*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('accs').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendmsg.current = pageNumber;
	            sendmsg.pages = Math.ceil(count/perPage);
	            sendmsg.page = 'accProducts';
	           	sendmsg.products = allProducts;
	           	sendmsg.productnumber = productnumber;
	            console.log(sendmsg);
	            res.json(sendmsg);
			}
		});
	});	
});

//CREATE Add new products to DB
router.post('/', upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'detail', maxCount: 1}]), function(req,res){	
			console.log(req.files);
			console.log('------------------------');
			console.log(req.files['thumbnail'][0]);
			console.log('------------------------');
			console.log(req.files['detail'][0]);
			var newProduct = new Product({
						name: req.body.name,
						price: req.body.price,
						thumbnail: '',
						detailed_image: '',
						kinds: req.body.kinds,
						brand: req.body.brand,
						items: req.body.items,
						avatar: req.body.avatar
					});
			console.log(newProduct);

			cloudinary.uploader.upload(req.files['thumbnail'][0].path , function(err, result){
				if(err) {
					console.log(err);
				}
				else {
					newProduct.thumbnail = result.secure_url;
					cloudinary.uploader.upload(req.files['detail'][0].path , function(err, resultDetail){
						if(err) {
							console.log(err);
						} else {
							newProduct.detailed_image = resultDetail.secure_url;
							Product.create(newProduct ,function(err,newProduct){
								if(err){
									console.log(err);
								}else{
									console.log(newProduct);
									res.json(newProduct);
								}
							});
						}
					})
					
				}
			});
});

//SHOW show more info about one product
router.get('/:id', function(req,res){
	Product.findById(req.params.id).populate('comments likes').exec(function(err, foundProduct){
		if(err){
			
		}else{
			console.log('--foundProduct--');
			res.json(foundProduct);
		}
	}); 
});

//EDIT Product ROUTE
router.get("/:id/edit" ,function(req,res){
	Product.findById(req.params.id, function(err, foundProduct) {
		console.log(foundProduct);
		res.json(foundProduct);		
	});
});

//UPDATE Product ROUTE
router.put("/:id" ,function(req,res){
	//find and update the product
	Product.findByIdAndUpdate(req.params.id, req.body.product , function(err, editProduct){
		if(err){
			res.json({result: 'fail'})
		}else{
			res.json(editProduct)
		}
	});
});

//DESTROY Product ROUTE
router.delete("/:id" ,function(req,res){
	Product.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.json({result: 'fail'})
		}else{
			res.json({result: 'success'})
		}
	});
});

//Product Like Route
router.post("/:id/like", function(req,res){
	Product.findById(req.params.id, function(err, foundProduct) {
		if(err) {
			
		}
		console.log(foundProduct);
		var foundLikeUser = foundProduct.likes.some(function(like) {
				return like.equals(req.body.userid);
			
		});
		if(foundLikeUser) {
			//already likded, removing like
			foundProduct.likes.pull(req.body.userid);
		}else { 
			console.log(req.user);
			foundProduct.likes.push(req.body.userid);
		}
		
		foundProduct.save(function(err) {
			if(err) {
				
			}
			console.log('저장합니다.')
			console.log(foundProduct.likes);
			res.json(foundProduct.likes);
		});
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;