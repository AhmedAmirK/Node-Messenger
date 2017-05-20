var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
	username: {type: String, unique: true},
	password: String,
	status: {type: Boolean, default: false}
});

var User = mongoose.model('User',User);

module.exports = User;