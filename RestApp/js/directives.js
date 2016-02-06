restApp

.directive('menuItemPage', ['menuFactory', function( menuFactory ){
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
			});

			$scope.selectNum = function( num ) {
				$scope.selectedAmount = num;
			};

			$scope.activeNum = function( num ) {
				return $scope.selectedAmount == num;
			};

			$scope.addItem = function() {

			};

			$scope.saveItem = function() {

			};

			$scope.removeItem = function() {

			};
		}
	};
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

