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

//Product Like Route
router.post("/:id/like", function(req,res){
	Product.findById(req.params.id, function(err, foundProduct) {
		if(err) {
			
		}
		console.log(foundProduct);
		var foundLikeUser = foundProduct.likes.some(function(like) {
				console.log(like);
				return like.equals(req.body.userid);
			
		});
		if(foundLikeUser) {
			//already likded, removing like
			console.log(req.user);
			foundProduct.likes.pull(req.body.userid);
			console.log('이제 안좋아해');
			console.log(foundProduct.likes);

		}else { 
			console.log(req.user);
			foundProduct.likes.push(req.body.userid);
			console.log('이제 좋아해');
			console.log(foundProduct.likes);
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