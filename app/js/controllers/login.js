"use strict";

const loginModule = angular.module("app.login", [
	"ui.router",
	"app.database"
]);

loginModule.controller("LoginCtrl", ["$scope", "$http", "db", function($scope, $http, db) {
	$scope.login = function(credentials) {
		$http.post("https://wsbf.net/api/auth/login.php", credentials)
			.then(function() {
				return db.User.get();
			})
			.then(function(user) {
				$scope.$close(user);
			}, function(res) {
				$scope.error = res.data;
			});
	};
}]);
