var mongoose = require('mongoose');

var purchaseStateSchema = new mongoose.Schema({
		username: String,
		postcode: String,
		roadAddress: String,
		jibunAddress: String,
		detailAddress: String,
		purchasePrice: String,
		productName: String,
		thumbnail:String,
		purchaseDate:String,
		purchaseCode:String,
		delivery:String,
		SItems: {type:Number, default: 0},
		MItems: {type:Number, default: 0},
		LItems: {type:Number, default: 0},
		XLItems: {type:Number, default: 0},
		FreeItems: {type:Number, default: 0}
});

module.exports = mongoose.model('PurchaseState', purchaseStateSchema);
