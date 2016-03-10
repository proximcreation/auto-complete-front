module.exports = (function(){
	var app = angular.module(
		'app',
		['ngRoute', 'LocalStorageModule']
	);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({ redirectTo: '/' });

		$locationProvider.hashPrefix('!');
	}]);

	app.config(function(localStorageServiceProvider){
		// === TODO : define a prefix for your localstorage data
		localStorageServiceProvider.setPrefix('todo');
	});

	return app;
})();
