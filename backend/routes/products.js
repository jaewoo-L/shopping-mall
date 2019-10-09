var express = require('express');
var router = express.Router();
var Product = require('../models/products');
//var middleware = require('../middleware'); 보류

//INDEX Display a list of all products
router.get('/', function(req,res){
	//Get all products from DB
	Product.find({},function(err,allProducts){
		if(err){
			console.log(err);
		}else{
			res.json(allProducts);
		}
	});
});

//INDEX Display a list of tops products
router.get('/tops', function(req,res){
	//Get all products from DB
	Product.find().where('kinds').equals('tops').exec(function(err,topsProducts){
		if(err){
			console.log(err);
		}else{
			res.json(topsProducts);
		}
	});
});

//INDEX Display a list of bottoms products
router.get('/bottoms', function(req,res){
	//Get all products from DB
	Product.find().where('kinds').equals('bottoms').exec(function(err,bottomsProducts){
		if(err){
			console.log(err);
		}else{
			res.json(bottomsProducts);
		}
	});
});

//INDEX Display a list of accs products
router.get('/accs', function(req,res){
	//Get all products from DB
	Product.find().where('kinds').equals('accs').exec(function(err,accsProducts){
		if(err){
			console.log(err);
		}else{
			res.json(accsProducts);
		}
	});
});

//CREATE Add new products to DB
//router.post('/', middleware.isLogedIn, function(req,res){ 보류
router.post('/', function(req,res){	
	var newProduct = new Product({
		name: req.body.name,
		price: req.body.price,
		thumbnail: req.body.thumbnail,
		detailed_image: req.body.detailed_image,
		kinds: req.body.kinds,
		brand: req.body.brand,
		items: req.body.items,
		avatar: req.body.avatar
	});
	
	Product.create(newProduct ,function(err,newProduct){
		if(err){
			console.log(err);
		}else{
			console.log(newProduct);
			res.json(newProduct);
		}
	});
});

//SHOW show more info about one product
router.get('/:id', function(req,res){
	Product.findById(req.params.id).populate('likes').exec(function(err, foundProduct){
		if(err){
			
		}else{
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

module.exports = router;