/**
 * @file app/js/services/queue.js

 * The Queue service provides an interface to the play queue.
 */
"use strict";

var queueModule = angular.module("wizbif.queue", []);

queueModule.service("queue", [function() {
	this.show = {};
	this.items = [];

	var self = this;

	/**
	 * Set the current show.
	 *
	 * @param show
	 */
	this.setShow = function(show) {
		self.items = (self.show.showID === show.showID)
			? self.items
			: show.playlist;
		self.show = show;
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
}]);
