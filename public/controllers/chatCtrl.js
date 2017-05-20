App.controller('chatCtrl',function ($scope,chatSrv,$location,$window) {

$scope.status="";
$scope.chatUser=null;
var active_user_id = $window.localStorage.user_id;
$scope.username = $window.localStorage.username;
$scope.messages= [];


var getUsers = function(){

	chatSrv.getUsers().then(function(res){

		$scope.Users= res.data;


	}, function(err){
		if(err.status==401){
			$location.path('/')
		}
	});
}

$scope.chatWith = function(user){

	if(user===null)
		return;

	$scope.chatUser = user;

	chatSrv.getUserStatus(user._id).then(function (res) {
		$scope.status = res.data.status? "Online": "Offline";
		$scope.chatUser.status = res.data.status;
	});

	chatSrv.getMessages(user._id, active_user_id).then(function (messages_from) { 
		
		var data = messages_from.data;
		
		chatSrv.getMessages(active_user_id, user._id ). then(function (messages_to) {  
			
			data = data.concat(messages_to.data);
			var messages = [];

			data.forEach(function (m) {
				
				var sender = m.to==active_user_id? user.username : $scope.username;

				var message = {
					message: m.message,
					timestamp: m.timestamp,
					sender: sender
				}

				messages.push(message);

			});

			$scope.messages = messages;

			
		});

	}, function (err) {
		console.log(err);
	})

}

$scope.logout = function () {

	chatSrv.logoutUser().then(function (res) {
		
		$window.localStorage.clear();

		Materialize.toast('Logged Out', 1000);
		$location.path('/');

	}, function (err) {
		console.log(err);
	})

}

$scope.sendMessage = function(m) {
	
	chatSrv.sendMessage($scope.chatUser._id,m).then(function (res) {
		console.log(res.data.message);
		$scope.text = "";

		var message = {
			timestamp: new Date().toLocaleString() ,
			message: m,
			sender: $scope.username
		}

		$scope.messages.push(message);

	}, function (err) {
		console.log(err);
	});
}

getUsers();

});