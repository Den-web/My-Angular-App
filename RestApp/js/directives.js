restApp

.directive('menuItemPage', ['menuFactory', 'cartFactory', '$rootScope', function( menuFactory, cartFactory, $rootScope ){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-pages/menuItemPage.html',
		scope: {},
		controller: function( $scope ) {
			$('#menuItemPage').page();

			$scope.$on('open-item', function(event, args){
				$scope.currentItem = menuFactory.getCurrentItem();
				$scope.currency = menuFactory.getCurrency();
				$scope.selectedAmount = menuFactory.getCurrentItemAmount();
				$scope.itemStatus = menuFactory.getCurrentItemStatus();
				$scope.cartCount = cartFactory.getCartCount();
			});

			$scope.selectNum = function( num ) {
				$scope.selectedAmount = num;
			};

			$scope.activeNum = function( num ) {
				return $scope.selectedAmount == num;
			};

			$scope.addItem = function() {
				var modifiersList = $('#select-modifiers').val();
				var modifiers = [];
				if ( !! modifiersList && modifiersList.length > 0 ) {
					for(var i=0; i<modifiersList.length; i++){
						var modifier = $scope.currentItem.modifiers[ modifiersList[i] ];
						modifier.indexID = modifiersList[i];
						modifiers.push( modifier );
					}
				}
				cartFactory.addItemToCart( $scope.currentItem, $scope.selectedAmount, modifiers );
				$.mobile.changePage('#cartPage', {transition: "slideup"} );
				$rootScope.$broadcast('open-cart');
			};

			$scope.saveItem = function() {

			};

			$scope.removeItem = function() {

			};
		}
	};
}])

.directive('cartPage', ['menuFactory', '$rootScope', 'cartFactory', function( menuFactory, $rootScope, cartFactory ){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-pages/cartPage.html',
		scope: {},
		controller: function( $scope ) {
			$( '#cartPage' ).page();

			$scope.$on('open-cart', function(event, args) {
				$scope.cart = cartFactory.getCart();
				$scope.currency = menuFactory.getCurrency();
				$scope.total = cartFactory.getTotal();
			});
		}
	}
}])

.directive('multipleSelectWidget',['menuFactory', '$timeout', function( menuFactory, $timeout ){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-widgets/multipleSelectWidget.html',
		scope: {},
		controller: function( $scope ) {
			$( '#select-modifiers' ).selectmenu();
			$scope.$on('open-item', function(event, args){
				$scope.currentItem = menuFactory.getCurrentItem();
				$scope.currency = menuFactory.getCurrency();
				$scope.currentItemStatus = menuFactory.getCurrentItemStatus();
				$timeout(function(){
					if ( $scope.currentItemStatus == 'new' ) {
						$( '#select-modifiers' ).find('option').each(function(){
							$(this).removeAttr('selected');
						});
					}

					$( '#select-modifiers' ).selectmenu( 'refresh' );
				}, 100);
			});
		}
	}
}]);

