var _ = require("lodash");

var dashboardModule = angular.module("wizbif.dashboard", [
	"ui.router",
	"wizbif.alert",
	"wizbif.database"
]);

dashboardModule.controller("DashboardCtrl", ["$scope", "$http", "$state", "alert", "db", function($scope, $http, $state, alert, db) {
	// temporary status/position sets
	var statusSets = {
		editProfile: ["0", "1", "2", "4"],
		reviewer: ["0", "1", "2", "4", "5"]
	};

	var positionSets = {
		seniorStaff: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		musicDirector: [0, 1, 2, 3, 8, 13, 14, 17, 18, 19, 20],
		engineer: [1, 5, 6, 8, 10]
	};

	$scope.user = {};
	$scope.check = {};
	$scope.alert = alert;

	var getUser = function() {
		db.User.get().then(function(user) {
			$scope.user = user;

			_.assign($scope.check, _.mapValues(statusSets, function(set) {
				return set.indexOf(user.statusID) !== -1;
			}), _.mapValues(positionSets, function(set) {
				return set.indexOf(user.positionID) !== -1;
			}));
		}, function() {
			$state.go("login");
		});
	};

	$scope.logout = function() {
		$http.get("https://wsbf.net/api/auth/logout.php")
			.then(function() {
				$state.go("login");
			});
	};

	// initialize
	getUser();
}]);
