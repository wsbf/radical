var app = angular.module("wizbif", [
	"ui.bootstrap",
	"ui.router",
	"wizbif.dashboard",
	"wizbif.library",
	"wizbif.logbook",
	"wizbif.login"
]);

app.config(["$compileProvider", function($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("login", {
			url: "/",
			templateUrl: "views/login.html",
			controller: "LoginCtrl"
		})
		.state("dashboard", {
			templateUrl: "views/dashboard.html",
			controller: "DashboardCtrl"
		})
		.state("dashboard.library", {
			params: {
				rotationID: "1",
				general_genreID: null,
				query: null,
				page: 0
			},
			templateUrl: "views/library.html",
			controller: "LibraryCtrl"
		})
		.state("dashboard.library-album", {
			params: {
				albumID: null
			},
			templateUrl: "views/library_album.html",
			controller: "LibraryAlbumCtrl"
		})
		.state("dashboard.logbook", {
			templateUrl: "views/logbook.html",
			controller: "LogbookCtrl"
		});

	$urlRouterProvider.otherwise("/");
}]);
