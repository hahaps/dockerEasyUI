angular.module('rest').factory('imageService', ['$injector',
        function imageService($injector) {

    // Required services
    var $http                 = $injector.get('$http');

    // Get required types
    var service = {};

    /**
     * Makes a request to the REST API to get the list of images,
     * returning a promise that provides an array of @link{ImageSample} objects if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ImageSample[]>}
     *     A promise which will resolve with an array of @link{ImageSample} objects
     *     upon success.
     */
    service.index = function index(queryOps) {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/images/json',
            params  : queryOps
        });

    };

    /**
     * Makes a request to the REST API to get image by id,
     * returning a promise that provides an @link{ImageSample} object if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ImageSample>}
     *     A promise which will resolve with an @link{ImageSample} object
     *     upon success.
     */
    service.show = function show(queryOps) {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/images/' + queryOps.id + '/json'
        });

    };

    /**
     * Makes a request to the REST API to get image by id,
     * returning a promise that provides an @link{ImageSample} object if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ImageSample>}
     *     A promise which will resolve with an @link{ImageSample} object
     *     upon success.
     */
    service.search = function search(searchVal) {

        // Retrieve Servers
        return $http({
            method  : 'GET',
            url     : '/images/search?term=' + searchVal
        });

    };

    /**
     * Makes a request to the REST API to get image by id,
     * returning a promise that provides an @link{ImageSample} object if
     * successful.
     *
     * @param {Object.<Stirng, String>} queryOps
     *     The set of query options to filter with.
     *
     * @returns {Promise.<ImageSample>}
     *     A promise which will resolve with an @link{ImageSample} object
     *     upon success.
     */
    service.create = function create(filter, onData, done) {

      var Create = function(url) {
        var xhr = typeof XMLHttpRequest != 'undefined'
          ? new XMLHttpRequest()
          : new ActiveXObject('Microsoft.XMLHTTP'),
          responseTextLen = 0;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Registy-Auth', 'base64_encoded_authconfig_object');
        xhr.onreadystatechange = function() {
          var responseText = xhr.response || '',
              textJson     = responseText.split('\n'),
              newLen       = textJson.length;
          for(var index = responseTextLen; index < newLen; index ++) {
            if(!textJson[index]) continue;
            onData(JSON.parse(textJson[index]));
          }
          responseTextLen = newLen;
          if (xhr.readyState == 4) { // `DONE`
            done(xhr.responseText, xhr.status);
          }
        };
        xhr.send();
      };

      return Create("/images/create?fromImage=" + filter.fromImage + "&tag=" + filter.tag);

    };

    /**
     * Makes a request to the REST API to delete a image,
     * returning a promise that provides an Object.<String, String>
     * if successful.
     *
     * @param {String} id
     *     The id of image.
     *
     * @returns {Promise.<Object>}
     *     A promise which will resolve with an object upon success.
     */
    service.del = function del(id) {

        var url = '/images/' + id;

        // Retrieve Servers
        return $http({
            method  : 'DELETE',
            url     : url
        });

    };

    return service;
}]);
