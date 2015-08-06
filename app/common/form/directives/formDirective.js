angular.module('form').directive('commonForm', function commonTable(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            formData : '='
        },
        templateUrl: 'common/form/templates/form.html',
        controller: ['$scope', '$element', function commonTableController($scope, $element) {
          $scope.$watch('formData', function initialForm(formData) {
            var formData = $scope.formData || {},
                invalid = {},
                form = {},
                restrict = {};
            formData.stepIndex = 0;
            angular.forEach(formData.panelGroups || [], function(ele, index) {
              invalid[ele.slug] = {};
              form[ele.slug] = {};
              restrict[ele.slug] = {};
              angular.forEach(ele.fields, function(e, ind) {
                invalid[ele.slug][e.slug] = false;
                if(e.type === 'select' && e.default.length) {
                  form[ele.slug][e.slug] = e.default[0].value;
                } else {
                  form[ele.slug][e.slug] = e.default;
                }
                restrict[ele.slug][e.slug] = e.restrictions;
              });
            });
            $scope.invalid = invalid;
            $scope.form = form;
            $scope.restrict = restrict;
          });

          // Validate when change event triggered.
          $scope.validate = function validate (pg, field) {
          };

          // For close action.
          $scope.close = function close () {
            $scope.$parent.$close();
          };

          // For click step action.
          $scope.stepJump = function stepJump(index) {
            $scope.formData.stepIndex = index;
          }

          // Submit action.
          $scope.Submit = function Submit() {
            $scope.formData.handle($scope.form);
          }
        }]
    };
});
