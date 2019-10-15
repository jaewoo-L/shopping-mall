var express = require('express'); 
var router = express.Router({mergeParams: true});
var Product = require('../models/products');
var Comment = require('../models/comments');
var middleware = require('../middleware');

router.get('/new', function(req,res){
	//여기서 경로명을 단축함으로써 생기는 문제는 findById에서 req.params.id 즉 id값을 읽어오지 못하는 문제가 발생한다.
	// 이를 해결하기 위해 express.Router({mergeParams: true}) 를 통해 app.js에 있는 id값을 읽어올 수 있게된다.
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		}else{
			console.log('==foundproduct==');
			console.log(product);
			res.json(product);		
		}
	});
});

router.post('/', function(req,res){
	Product.findById(req.params.id, function(err, product){
		if(err){
			console.log(err);
		}else{
			Comment.create({text: req.body.comment}, function(err, comment){
				if(err){
					console.log(err);
					res.json({result: '후기작성 오류.'});
				}else{
					comment.author.nickname = req.body.nickname;
					comment.author.id = req.body.id;
					//save comment
					comment.save();
					//save comment in the product
					product.comments.push(comment);
					product.save();
					res.json({result: '후기작성 완료.'});
				}
			});
		}
	});
});

router.get('/:comment_id/edit', function(req,res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		}else{
			res.json(foundComment);
		}
	});		
});

router.put('/:comment_id', function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, editComment){
		if(err){
			res.json({result: 'fail'})
		}else{
			res.json(editComment)
		}
	});
});

router.delete('/:comment_id', function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.json({result: 'fail'})
		}else{
			res.json({result: 'success'})
		}
	});
});

module.exports = router;