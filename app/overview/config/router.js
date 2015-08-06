angular.module('overview').config(['$routeProvider', '$locationProvider',
        function indexRouteConfig($routeProvider, $locationProvider) {

    // Disable HTML5 mode (use # for routing)
    $locationProvider.html5Mode(false);

    var APP_NAME = "Docker easy UI";

    $routeProvider

        // Overview screen
        .when('/overview', {
            title         : APP_NAME,
            templateUrl   : 'overview/templates/overview.html',
            controller    : 'overviewController'
        })
}]);
