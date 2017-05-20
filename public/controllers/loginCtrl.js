App.controller('loginCtrl', function($scope,chatSrv,$location,$window){

		//Microsoft Edge								//Chrome
if($window.localStorage.token == 'null'|| !$window.localStorage.token){
	//stay here 
}
else {
	$location.path('/chat');
}
	


$scope.login = function(){

	if(!$scope.user || !$scope.pass){
		Materialize.toast('Need a Username and Password!', 1000);
		return;
	}

	chatSrv.loginUser($scope.user,$scope.pass).then(function(res){

		$window.localStorage.user_id = res.data.user._id;
		$window.localStorage.username = res.data.user.username;
		$window.localStorage.token = res.data.token;
		$location.path('/chat');

	}, function(err){
		if(err.status==404){
			Materialize.toast(err.data.message, 1000);
		}
	});
}

$scope.register = function(){

	if(!$scope.user || !$scope.pass){
		Materialize.toast('Need a Username and Password!', 1000);
		return;
	}

	chatSrv.registerUser($scope.user,$scope.pass).then(function(res){
		
		chatSrv.loginUser($scope.user,$scope.pass).then(function(logged_user){
			$window.localStorage.user_id = logged_user.data.user._id;
			$window.localStorage.username = logged_user.data.user.username;
			$window.localStorage.token = logged_user.data.token;

			chatSrv.setUser(logged_user.data);
			$location.path('/chat');
		}, function (err) {
			console.log(err);
		});
	
	}, function(err){

			console.log(err);

			if(err.data.code==11000){
				Materialize.toast('Username Taken!', 1000);
			}
	});
}


});