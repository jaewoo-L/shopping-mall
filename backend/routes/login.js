var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
const crypto = require('crypto');

router.post('/signUp', function(req, res, next) {
	var id = req.body.username;
	var password = req.body.password;
	console.log('id: ' + req.body.username);
	console.log('password: ' + password);
	User.register(new User({username: id}), password, function(err,newuser) {
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

module.exports = router;
