"use strict";
const _ = require("lodash");
const debug = require("./js/debug");

const mainModule = angular.module("app.main", [
	"ui.bootstrap",
	"ui.router",
	"app.alert"
]);

mainModule.controller("MainCtrl", ["$scope", "$http", "$state", "$uibModal", "alert", function($scope, $http, $state, $uibModal, alert) {
	$scope.alert = alert;
	$scope.user = null;

	$scope.login = function() {
		$uibModal
			.open({
				templateUrl: "views/login.html",
				controller: "LoginCtrl",
				size: "sm"
			})
			.result.then(function(user) {
				$scope.user = user;
				$state.reload();
				alert.success("Successfully logged in.");
			});
	};

	$scope.logout = function() {
		$http.get("https://wsbf.net/api/auth/logout.php")
			.then(function() {
				$scope.user = null;
				alert.success("Successfully logged out.");
			});
	};

	if ( debug.ENABLED ) {
		$scope.user = debug.USER;
	}
	else {
		$scope.login();
	}
}]);
