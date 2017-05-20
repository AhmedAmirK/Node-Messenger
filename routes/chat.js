module.exports = function (app) {
	
var User = require('../db/Models/User');
var Message = require('../db/Models/Message');
var auth = require('./auth.js');

app.get('/api/users',auth,function(req,res,next){



	User.find({_id : { $ne : req.user_id}}, function(err, users){

		if(err){
			console.log(err);
			return res.status(500);
		}

		return res.status(200).json(users);

	});

});

//get messages from sender to receiver

app.get('/api/messages/:sender_id/:receiver_id', auth,function(req,res,next){

	if(!req.params.receiver_id || !req.params.sender_id){
		return res.status(400).json({
			message: 'Missing parameters'
		});
	}

	Message.find({ from: req.params.sender_id, to: req.params.receiver_id }, function(err,messages){


		if(err){
			console.log(err);
			return res.status(500);
		}

		return res.status(200).json(messages);

	});

});

app.get('/api/status/:id',auth, function(req,res,next) {
	
	if(!req.params.id){
		return res.status(400).json({
			message: 'Missing parameters'
		});
	}
	var id = req.params.id;

	User.findById(id,function(err,user){

		if(!err){
			return res.status(200).json({
				status: user.status
			});
		}
		else return res.status(500).json({
			message: 'Internal Server Error'
		});

	});

});

//send message to user

app.post('/api/message/:id',auth, function(req,res,next){

	var message = req.body.message;

	var m = new Message({
		message: message,
		from: req.user_id,
		to: req.params.id
	});

	m.save();

	return res.status(200).json({
		message: 'Sent succesfully'
	})
});


}