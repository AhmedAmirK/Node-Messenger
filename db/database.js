var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/messenger');

require('./Models/User');
require('./Models/Message');

console.log('Connected to MondoDb..');

