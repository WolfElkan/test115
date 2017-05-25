var app = angular.module('app', ['ngRoute','ngCookies'])

app.config(function($routeProvider) {
	$routeProvider.when('/login',{
		templateUrl : 'assets/User/entrance.html',
		controller  : 'UsersController'
	})
	$routeProvider.when('/users',{
		templateUrl : 'assets/User/index.html',
		controller  : 'UsersController'
	})
	$routeProvider.when('/pachyderms/edit/:id',{
		templateUrl : 'assets/Elephant/edit/EditElephant.html',
		controller  : 'EditElephant'
	})
	$routeProvider.when('/pachyderms',{
		templateUrl : 'assets/Elephant/index/IndexElephant.html',
		controller  : 'IndexElephant'
	})
	$routeProvider.when('/pachyderms/new',{
		templateUrl : 'assets/Elephant/new/NewElephant.html',
		controller  : 'NewElephant'
	})
	$routeProvider.when('/pachyderms/show/:id',{
		templateUrl : 'assets/Elephant/show/ShowElephant.html',
		controller  : 'ShowElephant'
	})
	$routeProvider.otherwise({
		redirectTo: '/pachyderms'
	})
})