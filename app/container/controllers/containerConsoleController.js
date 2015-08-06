angular.module('container').controller('containerConsoleController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get container service.
    var $routeParams     = $injector.get("$routeParams");
    var containerService = $injector.get("containerService");
    var toastr           = $injector.get("toastr");

    // Get container by id.
    containerService.console().success(function(data) {
      $scope.containerConsole = {
        host: data.host,
        port: data.port,
        id: $routeParams['id'],
        logs: 1,
        stdin: 1,
        stdout: 1,
        stderr: 1,
        stream: 1
      };
    }).error(function() {
    });
}]);
