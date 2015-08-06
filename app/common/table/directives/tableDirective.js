angular.module('table').directive('commonTable', function commonTable(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            tableData : '='
        },
        templateUrl: 'common/table/templates/table.html',
        controller: ['$scope', '$element', function commonTableController($scope, $element) {
          var tableData    = null;
          var TABLE_HEIGHT = 500;
          var isInitial    = false;
          //$scope.$parent.selectedItems = [];
          $scope.$parent.selectedItem = null;
          $scope.$watch('tableData.data', function initialTable(tableData) {
            tableData = $scope.tableData || {};
            if(isInitial) {
              $element.bootstrapTable('load', tableData.data);
              return;
            }
            $element.bootstrapTable({
              singleSelect: tableData.singleSelect || false,
              sortName: tableData.sortName,
              sortOrder: tableData.sortOrder || 'asc',
              height: tableData.height,
              cache: tableData.cache || false,
              striped: tableData.cache === undefined ? true : tableData.cache,
              pagination: true,
              pageSize: 10,
              pageList: [10, 20, 30],
              search: tableData.search === undefined ? true : tableData.search,
              showColumns: true,
              clickToSelect: false,
              checkboxHeader: tableData.checkboxHeader === undefined ? true : tableData.checkboxHeader,
              data: tableData.data || [],
              columns: tableData.columns || [],
              onCheck: function(raw) {
                //$scope.$parent.selectedItems.push(raw);
                $scope.$parent.selectedItem = raw;
                if(!$scope.$parent.$$phase) {
                  $scope.$parent.$apply();
                }
              },
              onUncheck: function(raw) {
                /*var ind = -1;
                angular.forEach($scope.$parent.selectedItems, function(ele, index) {
                  if(ele.Id === raw.Id) {
                    ind = index;
                    return false;
                  }
                });
                if(ind != -1) {
                  $scope.$parent.selectedItems.splice(ind, 1);
                  if(!$scope.$parent.$$phase) {
                    $scope.$parent.$apply();
                  }
                }*/
               $scope.$parent.selectedItem = null;
               if(!$scope.$parent.$$phase) {
                 $scope.$parent.$apply();
               }
              },
              onCheckAll: function(raw) {
                /*$scope.$parent.selectedItems = raw || [];
                if(!$scope.$parent.$$phase) {
                  $scope.$parent.$apply();
                }*/
              },
              onUncheckAll: function(raw) {
                /*$scope.$parent.selectedItems = [];
                if(!$scope.$parent.$$phase) {
                  $scope.$parent.$apply();
                }*/
              }
            });
            isInitial = true;
          });
        }]
    };
});
