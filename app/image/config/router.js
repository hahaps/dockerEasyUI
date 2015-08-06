angular.module('image').config(['$routeProvider', '$locationProvider',
        function indexRouteConfig($routeProvider, $locationProvider) {

    // Disable HTML5 mode (use # for routing)
    $locationProvider.html5Mode(false);

    var APP_NAME = "Docker easy UI";

    // Configure each possible route
    $routeProvider

        // Image screen
        .when('/image', {
            title         : APP_NAME,
            templateUrl   : 'image/templates/image.html',
            controller    : 'imageController'
        })

        // Image detail screen
        .when('/image/:id', {
            title         : APP_NAME,
            templateUrl   : 'image/templates/detail.html',
            controller    : 'imageDetailController'
        })
}]);
