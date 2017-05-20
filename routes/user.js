var User = require('../db/Models/User');
var Message = require('../db/Models/Message');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('./auth.js');

module.exports = function(app){

app.post('/api/register', function(req,res,next){

	var username = req.body.username;
	var password = req.body.password;

	var new_user = new User();
	new_user.username = username;
	new_user.password = bcrypt.hashSync(password);
	new_user.save(function(err,user){

		if (err) {
			console.log(err);
			return res.status(500).json(err);
		}

		else return res.status(200).json({
		message: 'Successfully Registered!'
		});

	});

});


app.post('/api/login',function(req,res,next){

	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username}, function(err,user){

		if (err) {
			console.log(err);
			return res.status(500);
		}

		if(!user){
			return res.status(404).json({
				message : 'User Not Found'
			});
		}
		var payload = {
			id : user._id
		}
		var token = jwt.sign(payload, process.env.SECRET);

		var right_pass = bcrypt.compareSync(password, user.password);
		if(right_pass){
			
			user.status = true;
			user.save(function(err,usr){
				if(!err)
					return res.status(200).json({
						user: usr,
						token: token
					});
				else {
					console.log(err);
					return res.status(500);
				}
			});
		}
		else{

			return res.status(401).json({
				message: 'Wrong password'
			});
		}

		

	});

});


app.post('/api/logout',auth,function(req,res,next){

		var id = req.user_id;
		
		User.findById(id, function(err, user){
			user.status = false;

			user.save();

			return res.status(200).json({
			message: 'Logged Out!'
		});
		});

		
});


};