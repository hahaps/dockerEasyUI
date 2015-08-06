angular.module('rest').factory('infoService', ['$injector',
        function containerService($injector) {

    // Required services
    var $http                 = $injector.get('$http');

    // Get required types
    var service = {};

    /**
     * Makes a request to the REST API to get info of connected docker,
     * returning a promise that provides an object if successful.
     *
     * @returns {Promise.<String, Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.show = function show() {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/info'
        });

    };

    return service;
}]);
