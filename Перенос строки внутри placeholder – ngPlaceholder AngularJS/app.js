
(function( app ){
    /**
     * ngPlaceholder - Позволяет использовать перенос строки внутри placeholder
     *
     * @class ngPlaceholder
     * @memberof Directives
     */
    var ngPlaceholder = function() {
 
        var link = function(scope, elem, attr) {
            scope.$watch('placeholder',function() {
                elem[0].placeholder = scope.ngPlaceholder.replace(/<br>/g, '\n');
            });
        };
 
        return {
            restrict: 'A',
            scope: {
                ngPlaceholder: '@'
            },
            link: link
        }
    };
    app.directive('ngPlaceholder', [ngPlaceholder]);
})( yourApp );