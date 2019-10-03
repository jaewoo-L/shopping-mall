var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema  = new mongoose.Schema({
	username: {type:String, unique: true, required: true},
	password: String,
	firstName: String,
	lastName: String,
	avatar: String,
	age: String,
	address: String,
	phone_first: Number,
	phone_middle: Number,
	phone_last: Number,
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
	isAdmin: {type:Boolean, default:false}
});
//plugin 으로 passportLocalMongoose npm메소드 추가
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);