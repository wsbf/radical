"use strict";

var cartModule = angular.module("app.carts", [
	"ui.router",
	"ui.bootstrap",
	"app.alert",
	"app.database",
	"app.queue"
]);

cartModule.controller("CartsCtrl", ["$scope", "$stateParams", "alert", "db", "queue", function($scope, $stateParams, alert, db, queue) {
	$scope.cart_types = db.getDefs("cart_type");
	$scope.cart_typeID = $stateParams.cart_typeID;
	$scope.carts = [];

	var getCarts = function(cart_typeID) {
		db.Carts.getCarts(cart_typeID)
			.then(function(carts) {
				var now = Date.now();

				$scope.carts = carts
					.filter(function(cart) {
						return (cart.end_date == null || now < Date.parse(cart.end_date));
					});
			});
	};

	$scope.enqueueCart = function(cart) {
		var item = {
			album_code: cart.cartID,
			rotation: $scope.cart_types[cart.cart_typeID].type,
			track_name: cart.title,
			artist_name: cart.issuer
		};

		queue.insert(item);
		alert.success("Added cart to play queue.");
	};

	// initialize
	getCarts($scope.cart_typeID);
}]);
