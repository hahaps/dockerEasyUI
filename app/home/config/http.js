/**
 * The config block for setting up the HTTP PATCH method.
 */
angular.module('dockerEasyUiApp').config(['$httpProvider',
        function httpCommonConfig($httpProvider) {

    $httpProvider.defaults.headers.common = {
        'Content-Type': 'application/json'
    }

}]);
