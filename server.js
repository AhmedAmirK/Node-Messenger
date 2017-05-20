require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./db/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));


app.use(express.static(__dirname + "/public"));

require('./routes/user')(app);
require('./routes/chat')(app);

app.use(function(req,res,next) {
	res.status(404).json({
		message:'the requested route was not found'
	});
});

app.listen(3000);
console.log("Server running on port 3000..");
