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