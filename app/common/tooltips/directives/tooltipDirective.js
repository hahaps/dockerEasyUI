angular.module('tooltip').directive('tooltips', function tooltips(){
    return {
        restrict: 'C',
        scope: {
            originalTitle : '='
        },
        link: function tooltipLink($scope, $element, $attrs) {
          $scope.$watch('originalTitle', function () {
            if(!$scope.originalTitle) return;
            var ops = {
              title: $scope.originalTitle || ''
            };
            if($attrs['data-placement']) {
              ops.placement = $attrs['data-placement']
            }
            $element.tooltip(ops);
          })
        }
    };
});
