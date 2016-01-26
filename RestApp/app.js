var restApp = angular.module( 'restApp', [] )

.factory('menuFactory', ['$http', '$q', function( $http, $q ){
	var menuApiUrl = "menu.json";

	var menu = null;
	var currency = '';

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
		}
	}
}])

/************************************************************
 * Main controller of whole app
 */
.controller( 'mainCtrl', [ '$scope', function( $scope ){
	
}])

.controller( 'menuListCtrl', [ '$scope', 'menuFactory', function( $scope, menuFactory ){
	
	menuFactory.getMenu().then(function( menuObj ){
		$scope.currency = menuObj.currency;
		$scope.products = menuObj.products;
	});

}])