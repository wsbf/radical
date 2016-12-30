"use strict";
var _ = require("lodash");

var mainModule = angular.module("wizbif.main", [
	"ui.router",
	"wizbif.alert"
]);

mainModule.controller("MainCtrl", ["$scope", "$http", "$state", "alert", function($scope, $http, $state, alert) {
	$scope.isNavVisible = false;
	$scope.alert = alert;

	$scope.$on("$stateChangeSuccess", function(event, toState) {
		$scope.isNavVisible = (toState.name !== "login");
	});

	$scope.logout = function() {
		$http.get("https://wsbf.net/api/auth/logout.php")
			.then(function() {
				$state.go("login");
			});
	};
}]);
