angular.module('overview').controller('overviewController', ['$scope', '$injector',
        function indexController($scope, $injector) {
          var infoService = $injector.get('infoService');

          infoService.show().success(function (info) {
            $scope.info = info;
          });
}]);
