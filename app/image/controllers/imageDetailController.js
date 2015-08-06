angular.module('image').controller('imageDetailController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get image service.
    var imageService = $injector.get("imageService");
    var $routeParams = $injector.get("$routeParams");

    // Get image by id.
    imageService.show({id: $routeParams.id})
    .success(function(image) {
      $scope.image = image;
    });
}]);
