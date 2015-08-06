angular.module('dockerEasyUiApp').config(['$routeProvider', '$locationProvider',
        function indexRouteConfig($routeProvider, $locationProvider) {

    // Disable HTML5 mode (use # for routing)
    $locationProvider.html5Mode(false);

    var APP_NAME = "Docker easy UI";

    // Configure each possible route
    $routeProvider

        // Home screen
        .when('/', {
            redirectTo: '/overview'
        })

        // Redirect to home screen if page not found
        .otherwise('/overview');

}]);
