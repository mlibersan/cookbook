var app = angular.module('clientprofile',['$strap.directives','ngResource','ngRoute']);


app.config(['$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
}]);

app.config(['$routeProvider', function($routeProvider) {
	  // Configure routes
	  $routeProvider.
	      when('/list', {templateUrl: 'list.html'}).
	      when('/edit/:clientId', {templateUrl: 'edit.html'}).
	      when('/view/:clientId', {templateUrl: 'view.html'}).
	      when('/editAddress/:clientId', {templateUrl: 'editAddress.html'}).
	      when('/new', {templateUrl: 'new.html'}).
	      otherwise({redirectTo: '/list'});
	}]);


app.service('config', function() {
    return new Config();
});



