"use strict";

var app = angular.module("wizbif", [
	"ui.bootstrap",
	"ui.router",
	"wizbif.main",
	"wizbif.carts",
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
			url: "/login",
			templateUrl: "views/login.html",
			controller: "LoginCtrl"
		})
		.state("carts", {
			url: "/carts",
			params: {
				cart_typeID: "0"
			},
			templateUrl: "views/carts.html",
			controller: "CartsCtrl"
		})
		.state("library", {
			url: "/library",
			params: {
				rotationID: "1",
				general_genreID: null,
				query: null,
				page: 0
			},
			templateUrl: "views/library.html",
			controller: "LibraryCtrl"
		})
		.state("library-album", {
			url: "/library/album",
			params: {
				albumID: null
			},
			templateUrl: "views/library_album.html",
			controller: "LibraryAlbumCtrl"
		})
		.state("logbook", {
			url: "/logbook",
			templateUrl: "views/logbook.html",
			controller: "LogbookCtrl"
		});

	$urlRouterProvider.otherwise("/login");
}]);
