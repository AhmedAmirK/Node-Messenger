App.factory('chatSrv',function($http,$window){
	
	return {
		getUsers: function(){
			return $http.get('/api/users',{headers: {'token': $window.localStorage.token}});
		},

		getMessages: function(sender_id,receiver_id){
			return $http.get('/api/messages/'+sender_id+'/'+receiver_id, {headers: {'token': $window.localStorage.token}});
		},

		sendMessage: function(id,message){
			return $http.post('/api/message/'+id, {message: message}, {headers: {'token': $window.localStorage.token}});
		},
		setUser:function(user){
			this.user = user;
		},
		getUser:function(){
			return this.user;
		},
		loginUser:function(user,pass){
			return $http.post('/api/login',{username:user, password:pass}, {headers: {'token': $window.localStorage.token}});
		},
		registerUser:function(user,pass){
			return $http.post('/api/register',{username:user, password:pass}, {headers: {'token': $window.localStorage.token}});
		},
		logoutUser:function(){
			return $http.post('/api/logout',{},{headers: {'token': $window.localStorage.token}});
		},
		getUserStatus: function(id) {
			return $http.get('/api/status/'+id, {headers: {'token': $window.localStorage.token}});
		}
	};	

})