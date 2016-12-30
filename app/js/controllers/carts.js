"use strict";

var cartModule = angular.module("wizbif.carts", [
	"ui.router",
	"ui.bootstrap",
	"wizbif.alert",
	"wizbif.database"
]);

cartModule.controller("CartsCtrl", ["$scope", "$stateParams", "db", function($scope, $stateParams, db) {
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

	// initialize
	getCarts($scope.cart_typeID);
}]);
