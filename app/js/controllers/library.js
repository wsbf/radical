"use strict";

var libraryModule = angular.module("wizbif.library", [
	"ui.router",
	"wizbif.alert",
	"wizbif.database"
]);

libraryModule.controller("LibraryCtrl", ["$scope", "$state", "alert", "db", function($scope, $state, alert, db) {
	$scope.rotations = db.getDefs("rotations");
	$scope.general_genres = db.getDefs("general_genres");
	$scope.rotationID = $state.params.rotationID;
	$scope.general_genreID = $state.params.general_genreID;
	$scope.query = $state.params.query;
	$scope.page = $state.params.page;
	$scope.albums = [];

	$scope.select = function(rotationID, general_genreID, query, page) {
		$state.go("library", {
			rotationID: rotationID,
			general_genreID: general_genreID,
			query: query,
			page: page
		});
	};

	// initialize
	db.Library.getLibrary($scope.rotationID, $scope.general_genreID, $scope.query, $scope.page)
		.then(function(albums) {
			$scope.albums = albums;
		});
}]);

libraryModule.controller("LibraryAlbumCtrl", ["$scope", "$stateParams", "db", "alert", function($scope, $stateParams, db, alert) {
	$scope.general_genres = db.getDefs("general_genres");
	$scope.airability = db.getDefs("airability");
	$scope.album = {};
	$scope.related_artists = [];

	var getAlbum = function(albumID) {
		db.Library.getAlbum(albumID)
			.then(function(album) {
				$scope.album = album;

				return db.Library.getRelatedArtists(album.artist_name);
			})
			.then(function(related_artists) {
				$scope.related_artists = related_artists;
			});
	};

	// initialize
	getAlbum($stateParams.albumID);
}]);
