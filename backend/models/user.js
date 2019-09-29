var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema  = new mongoose.Schema({
	username: String,
	password: String
});
//plugin 으로 passportLocalMongoose npm메소드 추가
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);