var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	text: String,
	date: {
			type: String
	},
	author: {
		id:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
		nickname:String
	},
	editarea: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Comment',commentSchema);
