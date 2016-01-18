var app = angular.module("app",[]);
app.controller("MainCtrl",[function(){

}]);

app.directive('myDirective',[function(){
	return{
		restrict: 'E',
		template: '<div>This my directive</div>',
		link: function(scope.element, attr){

		}
	}
}]);