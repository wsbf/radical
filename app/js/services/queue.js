/**
 * @file app/js/services/queue.js

 * The Queue service provides an interface to the play queue.
 */
"use strict";

var queueModule = angular.module("app.queue", []);

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

queueModule.service("queue", ["cartConfig", function(cartConfig) {
	var self = this;
	var showID = {};
	var isPlaying = false;

	this.items = [];

	/**
	 * Insert tracks from the music library into the queue.
	 */
	var insertTracks = function() {

	};

	/**
	 * Insert carts into the queue according to the cart specification.
	 */
	var insertCarts = function() {

	};

	/**
	 * Remove all carts from the queue.
	 */
	var removeCarts = function() {

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
	};

	/**
	 * Stop the queue at the end of the current item.
	 */
	this.stop = function() {
		isPlaying = false;
	};
}]);
