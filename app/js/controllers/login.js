var loginModule = angular.module("wizbif.login", [
	"ui.router"
]);

loginModule.controller("LoginCtrl", ["$scope", "$http", "$state", function($scope, $http, $state) {
	$scope.user = {};

	$scope.login = function(user) {
		$http.post("https://wsbf.net/api/auth/login.php", user)
			.then(function() {
				$state.go("dashboard.logbook");
			}, function(res) {
				$scope.error = res.data;
			});
	};
}]);
