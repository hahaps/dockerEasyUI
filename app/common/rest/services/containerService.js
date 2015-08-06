angular.module('rest').factory('containerService', ['$injector',
        function containerService($injector) {

    // Required services
    var $http                 = $injector.get('$http');

    // Get required types
    var service = {};

    /**
     * Makes a request to the REST API to get the list of containers,
     * returning a promise that provides an array of @link{ContainerSample} objects if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ContainerSample[]>}
     *     A promise which will resolve with an array of @link{ContainerSample} objects
     *     upon success.
     */
    service.index = function index(queryOps) {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/containers/json',
            params  : queryOps
        });

    };

    /**
     * Makes a request to the REST API to get container by id,
     * returning a promise that provides an @link{ContainerSample} object if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ContainerSample>}
     *     A promise which will resolve with an @link{ContainerSample} object
     *     upon success.
     */
    service.show = function show(queryOps) {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/containers/' + queryOps.id + '/json'
        });

    };

    /**
     * Makes a request to the REST API to create a new container,
     * returning a promise that provides an Object.<String, String>
     * if successful.
     *
     * @param {Object.<Stirng, Object>} data
     *     The set of options to create a new container.
     *
     * @param {Object.<Stirng, String>} query
     *     The set of options for create a new container.
     *
     * @returns {Promise.<Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.create = function create(data, query) {

        // Retrieve Servers
        return $http({
            method  : 'POST',
            data:   data,
            params: query,
            url     : '/containers/create'
        });

    };

    /**
     * Makes a request to the REST API to handle a specific container,
     * returning a promise that provides an Object.<String, String>
     * if successful.
     *
     * @param {String} mode
     *     The action mode of container.
     *
     * @param {String} id
     *     The id of container.
     *
     * @returns {Promise.<Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.action = function action(mode, id, data) {

        var url  = '/containers/' + id + '/' + mode;
        var data = data;
        // Retrieve Servers
        return $http({
            method  : 'POST',
            data    : data,
            url     : url
        });

    };

    /**
     * Makes a request to the REST API to delete a container,
     * returning a promise that provides an Object.<String, String>
     * if successful.
     *
     * @param {String} id
     *     The id of container.
     *
     * @returns {Promise.<Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.del = function del(id) {

        var url = '/containers/' + id;

        // Retrieve Servers
        return $http({
            method  : 'DELETE',
            url     : url
        });

    };

    /**
     * Makes a request to the REST API to delete a container,
     * returning a promise that provides an Object.<String, String>
     * if successful.
     *
     * @param {String} id
     *     The id of container.
     *
     * @returns {Promise.<Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.console = function console(id) {

        var url = '/console';

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : url
        });

    };

    return service;
}]);
