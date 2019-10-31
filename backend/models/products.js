var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	price: String,
	thumbnail: String,
	detailed_image: String,
	likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    buys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			//model만들때 첫번째 인자값
			ref: "Comment"
		}
	],
	kinds: String,
	brand: String,
	SItems: {type:Number, default: 0},
	MItems: {type:Number, default: 0},
	LItems: {type:Number, default: 0},
	XLItems: {type:Number, default: 0},
	FreeItems: {type:Number, default: 0},
	avatar: String,
	date: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model('Product',productSchema);