/**
 * @file app/js/services/queue.js

 * The Queue service provides an interface to the play queue.
 */
"use strict";

const queueModule = angular.module("app.queue", [
	"app.database"
]);

queueModule.constant("cartConfig", [
	{
		cart_typeID: "0",
		minute: 0,
		max_delta: 300
	},
	{
		cart_typeID: "1",
		minute: 15,
		max_delta: 300
	},
	{
		cart_typeID: "0",
		minute: 30,
		max_delta: 300
	},
	{
		cart_typeID: "2",
		minute: 30,
		max_delta: 300
	},
	{
		cart_typeID: "1",
		minute: 45,
		max_delta: 300
	}
]);

queueModule.service("queue", ["cartConfig", "db", function(cartConfig, db) {
	const self = this;
	const PLAYLIST_MIN_LENGTH = 10;
	let showID = null;
	let isPlaying = false;

	this.items = [];

	/**
	 * Start the first track in the queue.
	 */
	const enqueue = function() {
	};

	/**
	 * Stop and remove the first track in the queue.
	 */
	const dequeue = function() {
	};

	/**
	 * Set the start time of each item in the queue.
	 */
	const setStartTimes = function() {
	}

	/**
	 * Insert tracks from the music library into the queue.
	 *
	 * @param min_length
	 */
	const insertTracks = function(min_length) {
		db.Logbook.getTracks(min_length)
			.then(function(tracks) {
				tracks.forEach(function(track) {
					self.insert(track);
				});

				setStartTimes();
			});
	};

	/**
	 * Insert a cart into the queue.
	 *
	 * This function inserts carts as near as possible to
	 * the target window.
	 *
	 * @param cart_typeID
	 * @param minute
	 * @param max_delta
	 */
	const insertCart = function(cart_typeID, minute, max_delta) {
	};

	/**
	 * Insert carts into the queue according to the cart specification.
	 */
	const insertCarts = function() {
		cartConfig.forEach(function(entry) {
			insertCart(entry.cart_typeID, entry.minute, entry.max_delta);
		});
	};

	/**
	 * Remove all carts from the queue.
	 */
	const removeCarts = function() {
		self.items = self.items.filter(function(item) {
			return item.album_name;
		});
	};

	/**
	 * Set the current show.
	 *
	 * @param show
	 */
	this.setShow = function(show) {
		self.items = (showID === show.showID)
			? self.items
			: show.playlist;
		showID = show.showID;
	};

	/**
	 * Insert a track or cart into the queue.
	 *
	 * @param item
	 */
	this.insert = function(item) {
		self.items.unshift(item);
	};

	/**
	 * Remove an item from the queue.
	 *
	 * @param index
	 */
	this.remove = function(index) {
		self.items.splice(index, 1);
	};

	/**
	 * Start the queue.
	 */
	this.start = function() {
		isPlaying = true;

		setStartTimes();
		insertCarts();
		enqueue();
	};

	/**
	 * Stop the queue at the end of the current item.
	 */
	this.stop = function() {
		isPlaying = false;
	};

	/**
	 * Transition to the next track.
	 */
	this.transition = function() {
		dequeue();

		// add tracks to the queue if necessary
		if ( self.items.length < PLAYLIST_MIN_LENGTH ) {
			insertTracks(PLAYLIST_MIN_LENGTH);
			removeCarts();
			insertCarts();
		}

		// insert carts if necessary
		let carts = self.items.filter(function(item) {
			return !item.album_name;
		})

		if ( carts.length === 0 ) {
			insertCarts();
		}

		// start the next track, or remove all carts
		if ( isPlaying ) {
			enqueue();
		}
		else {
			removeCarts();
		}
	};
}]);
