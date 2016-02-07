var restApp = angular.module( 'restApp', [] )

.factory('menuFactory', ['$http', '$q', function( $http, $q ){
	var menuApiUrl = "menu.json";

	var menu = null;
	var currency = '';

	var currentItem = null;
	var currentItemStatus = 'new'; // new OR edit
	var currentAmount = 1;

	return {
		getMenu: function() {
			var deferred = $q.defer();

			$http({method: 'GET', url: menuApiUrl})
				.success(function(data){
					menu = data;
					currency = data.currency;
					deferred.resolve( data );
				})
				.error(function(data, status, headers, config) {
					deferred.reject( 'Error in $http request' );
					console.log( data );
					console.log( status );
				});
			return deferred.promise;
		},

		getCurrency: function() {
			return currency;
		},

		setCurrentItem: function( item ) {
			currentItem = item;
		},

		getCurrentItem: function() {
			return currentItem;
		},

		setCurrentItemStatus: function( status ) {
			currentItemStatus = status;
		},

		getCurrentItemStatus: function() {
			return currentItemStatus;
		},

		setCurrentItemAmount: function( newAmount ) {
			currentAmount = newAmount;
		},

		getCurrentItemAmount: function( newAmount ) {
			return currentAmount;
		}
	}
}])

.factory('cartFactory', [function(){
	var cart = [];

	return {
		getCartCount: function() {
			return cart.length;
		},

		addItemToCart: function( item, amount, modifiers ) {
			var newItem = {};
			newItem.modifiers = [];
			newItem.id = item.id;
			newItem.name = item.name;
			newItem.price = item.price;
			newItem.amount = amount;
			if ( !! modifiers && modifiers.length > 0 ) {
				newItem.modifiers = modifiers;
			}
			cart.push( newItem );
		},

		getCart: function() {
			return cart;
		},

		getTotal: function() {
			var total = 0;

			if ( cart.length > 0 )
				for ( var i=0; i < cart.length; i++ ){
					total += cart[i].price * cart[i].amount;
					if ( cart[i].modifiers.length > 0 )
						for( var j=0; j < cart[i].modifiers.length; j++ ){
							total += cart[i].modifiers[j].price * cart[i].amount;
						}
				}

			return total.toFixed(2);
		},

		removeItem: function( item ) {
			var id = item.id;
			for (var i=0; i < cart.length; i++){
				if ( cart[i].id == id ) {
					cart.splice(i, 1);
					return true;
				}
			}
			return false;
		}
	}
}])

/************************************************************
 * Main controller of whole app
 */
.controller( 'mainCtrl', [ '$scope', function( $scope ){
	
}])

.controller( 'menuListCtrl', [ '$scope', '$rootScope', 'menuFactory', function( $scope, $rootScope, menuFactory ){
	
	menuFactory.getMenu().then(function( menuObj ){
		$scope.currency = menuObj.currency;
		$scope.products = menuObj.products;
	});

	$scope.openItem = function( item ) {
		menuFactory.setCurrentItem( item );
		menuFactory.setCurrentItemStatus( 'new' );
		menuFactory.setCurrentItemAmount( 1 );

		$rootScope.$broadcast('open-item');

		$.mobile.changePage( '#menuItemPage', {transition: "slideup"} );
	}

}])