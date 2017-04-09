/**
 * @file app/js/services/database.js

 * The Database service provides an interface to server-side data.
 */
"use strict";

var databaseModule = angular.module("wizbif.database", [
	"ngResource"
]);

databaseModule.service("db", ["$http", "$q", "$resource", function($http, $q, $resource) {

	var api = {};

	api.Defs = $resource("https://wsbf.net/api/defs.php", {}, {
		get: { method: "GET", isArray: true, cache: true }
	});

	api.LogbookShow = $resource("https://wsbf.net/api/logbook/show.php");
	api.LogbookTrack = $resource("https://wsbf.net/api/logbook/track.php");

	api.Playlist = $resource("https://wsbf.net/api/playlist/playlist.php");

	api.Spotify = {};

	api.Spotify.SearchArtist = $resource("https://api.spotify.com/v1/search", {
		type: "artist",
		limit: 1
	}, {
		get: { method: "GET", cache: true }
	});

	api.Spotify.RelatedArtists = $resource("https://api.spotify.com/v1/artists/:id/related-artists", {}, {
		get: { method: "GET", cache: true }
	});

	/**
	 * Get a definitions table.
	 *
	 * @param tableName
	 * @return table array
	 */
	this.getDefs = function(tableName) {
		return api.Defs.get({ table: tableName });
	};

	this.Carts = {};

	/**
	 * Get the carts of a cart type.
	 *
	 * @param cart_typeID
	 * @return Promise of carts array
	 */
	this.Carts.getCarts = function(cart_typeID) {
		return $http.get("https://wsbf.net/api/carts/carts.php", {
			params: {
				cart_typeID: cart_typeID
			}
		}).then(function(res) {
			return res.data;
		});
	};

	/**
	 * Get a cart.
	 *
	 * @param cartID
	 * @return Promise of cart object
	 */
	this.Carts.getCart = function(cartID) {
		return $http.get("https://wsbf.net/api/carts/cart.php", {
			params: {
				cartID: cartID
			}
		}).then(function(res) {
			return res.data;
		});
	};

	this.Library = {};

	/**
	 * Get albums in the music library.
	 *
	 * @param rotationID
	 * @param general_genreID
	 * @param query
	 * @param page
	 * @return Promise of albums array
	 */
	this.Library.getLibrary = function(rotationID, general_genreID, query, page) {
		return $http.get("https://wsbf.net/api/library/library.php", {
			params: {
				rotationID: rotationID,
				general_genreID: general_genreID,
				query: query,
				page: page
			}
		}).then(function(res) {
			return res.data;
		});
	};

	/**
	 * Get an album in the library.
	 *
	 * @param albumID
	 * @return Promise of album object
	 */
	this.Library.getAlbum = function(albumID) {
		return $http.get("https://wsbf.net/api/library/album.php", {
			params: {
				albumID: albumID
			}
		}).then(function(res) {
			return res.data;
		});
	};

	/**
	 * Get a list of related artists.
	 *
	 * @param artist_name
	 * @return Promise of related artists array
	 */
	this.Library.getRelatedArtists = function(artist_name) {
		return api.Spotify.SearchArtist
			.get({ q: artist_name }).$promise
			.then(function(data) {
				var artist = data.artists.items[0];

				return artist
					? api.Spotify.RelatedArtists.get({ id: artist.id }).$promise
					: $q.resolve({ artists: [] });
			})
			.then(function(data) {
				return data.artists.map(function(a) {
					return a.name;
				});
			});
	};

	this.Logbook = {};

	/**
	 * Get the current listener count.
	 *
	 * @return Promise of listener count
	 */
	this.Logbook.getListenerCount = function() {
		return $http.get("https://wsbf.net/api/logbook/listener_count.php")
			.then(function(res) {
				return res.data;
			});
	};

	/**
	 * Get the current show.
	 *
	 * @return Promise of current show object
	 */
	this.Logbook.getCurrentShow = function() {
		return api.LogbookShow.get().$promise;
	};

	/**
	 * Start a new show with the current user.
	 *
	 * @param scheduleID
	 * @return Promise of new show ID
	 */
	this.Logbook.signOn = function(scheduleID) {
		return api.LogbookShow.save({ scheduleID: scheduleID }, null).$promise;
	};

	/**
	 * End the current show.
	 *
	 * @return Promise of http response
	 */
	this.Logbook.signOff = function() {
		return api.LogbookShow.remove().$promise;
	};

	/**
	 * Get the information for an album.
	 *
	 * @param album_code
	 * @return Promise of album object
	 */
	this.Logbook.getAlbum = function(album_code) {
		return api.LogbookTrack.get({ album_code: album_code }).$promise;
	};

	/**
	 * Get the information for a track.
	 *
	 * @param album_code
	 * @param disc_num
	 * @param track_num
	 * @return Promise of track object
	 */
	this.Logbook.getTrack = function(album_code, disc_num, track_num) {
		return api.LogbookTrack.get({
			album_code: album_code,
			disc_num: disc_num,
			track_num: track_num
		}).$promise;
	};

	/**
	 * Log a track in the current show.
	 *
	 * @param track
	 * @return Promise of http response
	 */
	this.Logbook.logTrack = function(track) {
		return api.LogbookTrack.save({}, track).$promise;
	};

	this.Playlist = {};

	/**
	 * Get the list of the current user's playlists.
	 *
	 * @return Promise of playlists array
	 */
	this.Playlist.getPlaylists = function() {
		return $http.get("https://wsbf.net/api/playlist/playlists.php")
			.then(function(res) {
				return res.data;
			});
	};

	/**
	 * Get a playlist.
	 *
	 * @param playlistID
	 * @return Promise of playlist object
	 */
	this.Playlist.get = function(playlistID) {
		return api.Playlist.get({ playlistID: playlistID });
	};

	this.User = {};

	/**
	 * Get the current user.
	 *
	 * @return Promise of user object
	 */
	this.User.get = function() {
		return $http.get("https://wsbf.net/api/users/user.php")
			.then(function(res) {
				return res.data;
			});
	};
}]);
