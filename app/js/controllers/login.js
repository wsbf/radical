"use strict";

var loginModule = angular.module("wizbif.login", [
	"ui.router",
	"wizbif.database"
]);

loginModule.controller("LoginCtrl", ["$scope", "$http", "$state", "db", function($scope, $http, $state, db) {
	$scope.login = function(credentials) {
		$http.post("https://wsbf.net/api/auth/login.php", credentials)
			.then(function() {
				return db.User.get().then(function(user) {
					$scope.$parent.user = user;
					$state.go("logbook");
				});
			}, function(res) {
				$scope.error = res.data;
			});
	};
}]);
