"use strict";

const playqueueModule = angular.module("app.playqueue", [
	"app.alert",
	"app.database",
	"app.queue"
]);

playqueueModule.controller("PlayQueueCtrl", ["$scope", "$interval", "alert", "db", "queue", function($scope, $interval, alert, db, queue) {
	$scope.days = db.getDefs("days");
	$scope.show_times = db.getDefs("show_times");
	$scope.showID = null;
	$scope.show = {};
	$scope.listenerCount = 0;
	$scope.playlists = [];
	$scope.queue = queue;
	$scope.newTrack = { disc_num: 1 };

	const getCurrentShow = function() {
		db.Logbook.getCurrentShow().then(function(show) {
			$scope.show = show;

			if ( $scope.user ) {
				let scheduleShow = _.find($scope.user.shows || [], {
					scheduleID: show.scheduleID
				});

				$scope.scheduleID = (scheduleShow || {}).scheduleID;
				$scope.showID = $scope.scheduleID && show.showID;

				queue.setShow(show);

				if ( debug.ENABLED ) {
					$scope.showID = show.showID;
				}
			}
		}, function() {
			$scope.show = null;
		});
	};

	const getListenerCount = function() {
		db.Logbook.getListenerCount().then(function(count) {
			$scope.listenerCount = count;
		});
	};

	const getPlaylists = function() {
		db.Playlist.getPlaylists()
			.then(function(playlists) {
				$scope.playlists = playlists;
			}, angular.noop);
	};

	$scope.Auto = {};
	$scope.Auto.state = "stopped";

	$scope.Auto.start = function() {
		queue.start();
		$scope.Auto.state = "playing";
	};

	$scope.Auto.stop = function() {
		queue.stop();
		$scope.Auto.state = "stopping";
	};

	$scope.Auto.stopNow = function() {
		queue.transition();
		$scope.Auto.state = "stopped";
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

	$scope.addPlaylist = function(playlistID) {
		db.Playlist.get(playlistID)
			.$promise
			.then(function(playlist) {
				playlist.tracks.forEach(function(track) {
					track.rotation = track.rotation || "O";
					queue.insert(track);
				});

				$scope.playlistID = null;
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

	$scope.addTrack = function(track) {
		if ( track.airabilityID === "2" ) {
			alert.error("Cannot add a No Air track.");
			return;
		}

		track.rotation = track.rotation || "O";
		queue.insert(track);

		$scope.newTrack = { disc_num: 1 };
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
	getCurrentShow();
	getListenerCount();
	getPlaylists();

	let listenerCount = $interval(getListenerCount, 5000);

	$scope.$on("$destroy", function() {
		$interval.cancel(listenerCount);
	});
}]);
