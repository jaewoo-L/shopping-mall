var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var PurchaseState = require('../models/purchaseState');
var async = require('async');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var storage = multer.diskStorage({
	//filename: function(req, file, callback) {
		//callback(null, Date.now() + file.originalname);
	//}
});
require('dotenv').config();
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
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});


//INDEX Display a list of all products
router.get('/', function(req,res){
	let sendObj = {};
	let perPage =20;
	let allProductsNum = null;
	let pageQuery = parseInt(req.query.page);
	let pageNum = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find({}, function(err, allproducts) {
		if(err) {
			console.log(err);
		} else {
			allProductsNum = allproducts.length;
		}
	});
	if(req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Product.find({name: regex}).sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, searchProducts){
           	Product.count({name: regex}).exec(function(err, count) {
	           if(err){
	               console.log(err);
	           } else {
	              if(searchProducts.length < 1) {
	                res.json({noMatch: '검색내용과 일치하는 상품이 없습니다.'});
	              } else {
	              	sendObj.current = pageNum;
	              	sendObj.pages = Math.ceil(count/perPage);
	              	sendObj.page = 'products';
	           		sendObj.products = searchProducts;
	           		sendObj.productsNum = allProductsNum;
	              	res.json(sendObj);
	              }
	           }
        	});
      	});
	} else {
		Product.find({}).sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
			Product.count().exec(function(err, count) {
				if(err){
					console.log(err);
				}else{
					sendObj.current = pageNum;
	              	sendObj.pages = Math.ceil(count/perPage);
	              	sendObj.page = 'products';
	           		sendObj.products = allProducts;
	           		sendObj.productsNum = allProductsNum;
	              	res.json(sendObj);
				}
				});
		});	
	}
});

//INDEX Display a list of tops products
router.get('/tops', function(req,res){
	let sendObj= {};
	let perPage =20;
	let topProductsNum = null;
	let pageQuery = parseInt(req.query.page);
	let pageNum = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('tops').sort({date:-1}).exec(function(err,topsProducts){
		if(err){
			console.log(err);
		}else{
			topProductsNum = topsProducts.length;
		}
	});


	Product.find().where('kinds').equals('tops').sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('tops').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendObj.current = pageNum;
	            sendObj.pages = Math.ceil(count/perPage);
	            sendObj.page = 'topProducts';
	           	sendObj.products = allProducts;
	           	sendObj.productsNum = topProductsNum;
	            res.json(sendObj);
			}
		});
	});	
});


//INDEX Display a list of bottoms products
router.get('/bottoms', function(req,res){
	let sendObj= {};
	let perPage =20;
	let bottomProductsNum = null;
	let pageQuery = parseInt(req.query.page);
	let pageNum = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('bottoms').sort({date:-1}).exec(function(err,bottomsProducts){
		if(err){
			console.log(err);
		}else{
			bottomProductsNum = bottomsProducts.length;
		}
	});
	Product.find().where('kinds').equals('bottoms').sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('bottoms').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendObj.current = pageNum;
	            sendObj.pages = Math.ceil(count/perPage);
	            sendObj.page = 'bottomPproducts';
	           	sendObj.products = allProducts;
	           	sendObj.productsNum = bottomProductsNum;
	            res.json(sendObj);
			}
		});
	});	
});

//INDEX Display a list of accs products
router.get('/accs', function(req,res){
	let sendObj= {};
	let perPage =20;
	let accProductsNum = null;
	let pageQuery = parseInt(req.query.page);
	let pageNum = pageQuery ? pageQuery : 1;
	//Get all products from DB
	Product.find().where('kinds').equals('accs').sort({date:-1}).exec(function(err,accsProducts){
		if(err){
			console.log(err);
		}else{
			accProductsNum = accsProducts.length;
		}
	});
	Product.find().where('kinds').equals('accs').sort({date:-1}).skip((pageNum*perPage)-perPage).limit(perPage).exec(function(err, allProducts){
		Product.where('kinds').equals('accs').count().exec(function(err, count) {
			if(err){
				console.log(err);
			}else{
				sendObj.current = pageNum;
	            sendObj.pages = Math.ceil(count/perPage);
	            sendObj.page = 'accProducts';
	           	sendObj.products = allProducts;
	           	sendObj.productsNum = accProductsNum;
	            res.json(sendObj);
			}
		});
	});	
});

//CREATE Add new products to DB
router.post('/', upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'detail', maxCount: 1}]), function(req,res){	
			var newProduct = new Product({
					name: req.body.name,
					price: req.body.price,
					thumbnail: '',
					detailed_image: '',
					kinds: req.body.kinds,
					brand: req.body.brand,
					SItems: req.body.SItems,
					MItems: req.body.MItems,
					LItems: req.body.LItems,
					XLItems: req.body.XLItems,
					FreeItems: req.body.FreeItems,
					avatar: req.body.avatar
				});
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
			console.log(err);
		}else{
			res.json(foundProduct);
		}
	}); 
});


//EDIT Product ROUTE
router.get("/:id/edit" ,function(req,res){
	Product.findById(req.params.id, function(err, foundProduct) {
		res.json(foundProduct);		
	});
});

//UPDATE Product ROUTE
router.put("/:id", upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'detail', maxCount: 1}]), function(req,res){
	var editProduct = new Product({
			name: req.body.name,
			price: req.body.price,
			thumbnail: '',
			detailed_image: '',
			kinds: req.body.kinds,
			brand: req.body.brand,
			SItems: req.body.SItems,
			MItems: req.body.MItems,
			LItems: req.body.LItems,
			XLItems: req.body.XLItems,
			FreeItems: req.body.FreeItems,
			avatar: req.body.avatar
		});
	cloudinary.uploader.upload(req.files['thumbnail'][0].path , function(err, result){
			if(err) {
				console.log(err);
			}
			else {
				editProduct.thumbnail = result.secure_url;
				cloudinary.uploader.upload(req.files['detail'][0].path , function(err, resultDetail){
					if(err) {
						console.log(err);
					} else {
						editProduct.detailed_image = resultDetail.secure_url;
						//find and update the product
						Product.findById(req.params.id, function(err, product) {
							if(err) {
								console.log(err);
							} else {
								product.name = editProduct.name;
								product.price = editProduct.price;
								product.thumbnail = editProduct.thumbnail;
								product.detailed_image = editProduct.detailed_image;
								product.kinds = editProduct.kinds;
								product.brand = editProduct.brand;
								product.SItems = editProduct.SItems;
								product.MItems = editProduct.MItems;
								product.LItems = editProduct.LItems;
								product.XLItems = editProduct.XLItems;
								product.FreeItems = editProduct.FreeItems;
								product.avatar = editProduct.avatar;
								product.save(function(err) {
									if(err) {
										console.log(err);
										res.json({result: 'fail'});
									} else {
										res.json({result:'success'});
									}
								})
							}
						});
					}
				})
				
			}
	});
});



router.put("/:id/buy", function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) {
			console.log(err);
		} else {
			product.SItems = req.body.SItemsNum
			product.MItems = req.body.MItemsNum
			product.LItems = req.body.LItemsNum
			product.XLItems = req.body.XLItemsNum
			product.FreeItems = req.body.FreeItemsNum
			product.save(function(err) {
				if(err) {
					console.log(err);
					res.json({result: 'fail'});
				} else {
					res.json({result:'success'});
				}
			})
		}
	})
})

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
			console.log(err);
		}
		var foundLikeUser = foundProduct.likes.some(function(like) {
				return like.equals(req.body.userid);
			
		});
		if(foundLikeUser) {
			//already likded, removing like
			foundProduct.likes.pull(req.body.userid);
		}else { 
			foundProduct.likes.push(req.body.userid);
		}
		
		foundProduct.save(function(err) {
			if(err) {
				console.log(err);
			}
			res.json(foundProduct.likes);
		});
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;