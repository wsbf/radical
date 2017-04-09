"use strict";

var libraryModule = angular.module("app.library", [
	"ui.router",
	"app.alert",
	"app.database",
	"app.queue"
]);

libraryModule.controller("LibraryCtrl", ["$scope", "$state", "alert", "db", function($scope, $state, alert, db) {
	$scope.general_genres = db.getDefs("general_genres");
	$scope.rotations = db.getDefs("rotations");
	$scope.rotationID = $state.params.rotationID;
	$scope.general_genreID = $state.params.general_genreID;
	$scope.query = $state.params.query;
	$scope.page = $state.params.page;
	$scope.albums = [];

	$scope.go = function(rotationID, general_genreID, query, page) {
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
		}, angular.noop);
}]);

libraryModule.controller("LibraryAlbumCtrl", ["$scope", "$stateParams", "alert", "db", "queue", function($scope, $stateParams, alert, db, queue) {
	$scope.airability = db.getDefs("airability");
	$scope.general_genres = db.getDefs("general_genres");
	$scope.rotations = db.getDefs("rotations");
	$scope.album = {};
	$scope.related_artists = [];

	var getAlbum = function(albumID) {
		db.Library.getAlbum(albumID)
			.then(function(album) {
				$scope.album = album;

				return db.Library.getRelatedArtists(album.artist_name);
			}, angular.noop)
			.then(function(related_artists) {
				$scope.related_artists = related_artists;
			});
	};

	$scope.enqueueTrack = function(track, album) {
		if ( track.airabilityID === "2" ) {
			alert.error("Cannot add a No Air track.");
			return;
		}

		var item = angular.extend({
			albumID: album.albumID,
			album_code: album.album_code,
			rotation: $scope.rotations[album.rotationID].bin_abbr,
			album_name: album.album_name,
			label: album.label
		}, track);

		queue.insert(item);
		alert.success("Added track to play queue.");
	};

	// initialize
	getAlbum($stateParams.albumID);
}]);
