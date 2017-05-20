var App = angular.module('App',['ngRoute']);

App.config(function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: '/partials/login.html',
			controller: 'loginCtrl'
		})

		.when('/chat',{
			templateUrl: '/partials/chat.html',
			controller: 'chatCtrl'
		});

});