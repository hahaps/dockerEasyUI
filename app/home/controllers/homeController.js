angular.module('dockerEasyUiApp').controller('homeController', ['$scope', '$injector',
        function indexController($scope, $injector) {

          // Handle nav active.
          $scope.$on('$routeChangeSuccess', function($event, current) {
            var originalPath = current.$$route.originalPath,
                listOrigin = originalPath.split('/');
            if(listOrigin.length >= 2) {
              $scope.selectedNav = listOrigin[1];
            }
          });
}]);
