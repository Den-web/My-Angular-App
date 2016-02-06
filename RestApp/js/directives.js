restApp

.direcive('menuItemPage', ['menuFactory', function(menuFactory){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-pages/menuItemPage.html',
		scope: {},
		controller: function($scope){
			$('$menuItemPage').page();

			$scope.addItem = function(){

			};

			$scope.saveItem = function(){

			};

			$scope.removeItem = function(){

			};
		}
	};
}]);