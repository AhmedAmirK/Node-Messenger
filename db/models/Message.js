var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Message = new Schema({
	timestamp: {type: Date, default: Date.now},
	message: String,
	from: ObjectId,
	to: ObjectId
});

var Message = mongoose.model('Message',Message);

module.exports = Message;