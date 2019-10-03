var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	Detailed_image: String,
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
	items: Number,
	avatar: String
});

module.exports = mongoose.model('Product',productSchema);