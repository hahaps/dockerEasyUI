angular.module('container').config(['$routeProvider', '$locationProvider',
        function indexRouteConfig($routeProvider, $locationProvider) {

    // Disable HTML5 mode (use # for routing)
    $locationProvider.html5Mode(false);

    var APP_NAME = "Docker easy UI";

    // Configure each possible route
    $routeProvider

        //  Container screen
        .when('/container', {
            title         : APP_NAME,
            templateUrl   : 'container/templates/container.html',
            controller    : 'containerController'
        })
        // Image detail screen
        .when('/container/:id', {
            title         : APP_NAME,
            templateUrl   : 'container/templates/detail.html',
            controller    : 'containerDetailController'
        })
        .when('/container/:id/console', {
            title         : APP_NAME,
            templateUrl   : 'container/templates/console.html',
            controller    : 'containerConsoleController'
        })
}]);
