angular.module('container').controller('containerDetailController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get container service.
    var containerService = $injector.get("containerService");
    var $routeParams = $injector.get("$routeParams");

    // Get container by id.
    containerService.show({id: $routeParams.id})
    .success(function(container) {
      $scope.container = container;
    });
}]);
