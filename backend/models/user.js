var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema  = new mongoose.Schema({
	username: {type:String, unique: true, required: true},
	password: String,
	nickname: String,
	firstName: String,
	lastName: String,
	avatar: String,
	age: Number,
	postcode: String,
	roadAddress: String,
	jibunAddress: String,
	detailAddress: String,
	extraAddress: String,
	phone_first: String,
	phone_middle: String,
	phone_last: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	orders: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}],
	basket: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}],
	purchaseState:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "PurchaseState"
	}],
	isAdmin: {type:String, default:'false'}
});
//plugin 으로 passportLocalMongoose npm메소드 추가
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);
