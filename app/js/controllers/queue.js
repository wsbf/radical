"use strict";

var queueModule = angular.module("wizbif.queue", [
	"wizbif.alert",
	"wizbif.database"
]);

queueModule.controller("QueueCtrl", ["$scope", "$interval", "alert", "db", function($scope, $interval, alert, db) {
	$scope.days = db.getDefs("days");
	$scope.show_times = db.getDefs("show_times");
	$scope.showID = null;
	$scope.show = {};
	$scope.listenerCount = 0;

	var getListenerCount = function() {
		db.Logbook.getListenerCount().then(function(count) {
			$scope.listenerCount = count;
		});
	};

	var getCurrentShow = function() {
		db.Logbook.getCurrentShow().then(function(show) {
			$scope.show = show;

			if ( $scope.user ) {
				var scheduleShow = _.find($scope.user.shows || [], {
					scheduleID: show.scheduleID
				});

				$scope.scheduleID = (scheduleShow || {}).scheduleID;
				$scope.showID = $scope.scheduleID && show.showID;
			}
		}, function() {
			$scope.show = null;
		});
	};

	$scope.signOn = function(scheduleID) {
		db.Logbook.signOn(scheduleID).then(function() {
			getCurrentShow();
			alert.success("Successfully signed on.");
		}, function(res) {
			alert.error(res.data || res.statusText);
		});
	};

	$scope.signOff = function() {
		db.Logbook.signOff().then(function() {
			getCurrentShow();
			alert.success("Successfully signed off.");
		}, function(res) {
			alert.error(res.data || res.statusText);
		});
	};

	$scope.getAlbum = function(album_code) {
		db.Logbook.getAlbum(album_code).then(function(album) {
			$scope.newTrack.albumID = album.albumID;
			$scope.newTrack.rotation = album.rotation;
			$scope.newTrack.artist_name = album.artist_name;
			$scope.newTrack.album_name = album.album_name;
			$scope.newTrack.label = album.label;
		});
	};

	$scope.getTrack = function(album_code, disc_num, track_num) {
		db.Logbook.getTrack(album_code, disc_num, track_num).then(function(track) {
			$scope.newTrack.track_name = track.track_name;
			$scope.newTrack.airabilityID = track.airabilityID;
		});
	};

	$scope.addTrack = function(playlist, track) {
		track.rotation = track.rotation || "O";
		playlist.unshift(track);

		$scope.newTrack = {};
	};

	$scope.logTrack = function(track) {
		db.Logbook.logTrack(track).then(function() {
			track.logged = true;
			alert.success("Successfully logged track.");
		}, function(res) {
			alert.error(res.data || res.statusText);
		});
	};

	// initialize
	getListenerCount();
	getCurrentShow();

	$interval(getListenerCount, 5000);
}]);
