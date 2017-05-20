var jwt = require('jsonwebtoken');

module.exports = function(req,res,next){

	var token = req.headers.token;

	if(!token || token === null){
		return res.status(401).json({
			message: 'Unauthorized!'
		});
	}

	try{
		var decoded = jwt.verify(token,process.env.SECRET);
	}catch(err){
		console.log(err);
		return res.status(401).json({
			message: 'Unauthorized!'
		});
	}
	req.user_id = decoded.id
	next();



}