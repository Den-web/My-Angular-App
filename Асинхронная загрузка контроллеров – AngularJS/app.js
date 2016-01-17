var lazyloadapp = angular.module('lazyloadapp', ['ui.router']);
 
(function(app){
 
    /**
     * Базовая конфигурация
     */
    app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', function($stateProvider, $urlRouterProvider, $controllerProvider){
 
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: 'pages/home.html'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: 'pages/profile.html'
            });
 
        // Сохраняем отдельно функцию, которую ангулар использует для регистрации
        app.lazyRegisterController = $controllerProvider.register;
 
        $urlRouterProvider.otherwise("/");
 
    }]);
 
    /**
     * LoadJS factory
     * Эта фактори будет использоваться для загрузки фала с контроллером
     */
    var loadJSFactory = function($q) {
 
        var loadJSFactory= {};
 
        /**
         * Load JS
         * @param url
         * @returns {*}
         */
        loadJSFactory.load = function( url ) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            var deferred = $q.defer();
 
            script.type = 'text/javascript';
            script.src = url;
 
            script.onload = function(){
                deferred.resolve();
            };
 
            head.appendChild(script);
 
            return deferred.promise;
        };
 
        return loadJSFactory;
    };
 
    app.factory('loadJSFactory', ['$q', loadJSFactory]);
 
})(lazyloadapp);