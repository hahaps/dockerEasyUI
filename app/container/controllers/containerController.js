angular.module('container').controller('containerController', ['$scope', '$injector',
        function indexController($scope, $injector) {
    // Get container service.
    var containerService = $injector.get("containerService");
    var $dialog          = $injector.get("$dialog");
    var $route           = $injector.get("$route");
    var $location        = $injector.get("$location");
    var toastr           = $injector.get("toastr");

    // Define image table columns.
    $scope.containerTableData = {
      checkboxHeader: false,
      singleSelect: true,
      columns: [{
        field: 'isSelected',
        checkbox: true
      }, {
        field: 'Id',
        title: 'ID',
        visible: false
      }, {
        field: 'NamesLink',
        title: 'Name',
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'Image',
        title: 'Image',
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'Port',
        title: 'Port',
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'Command',
        title: 'Command',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'Created',
        title: 'Created',
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'Status',
        title: 'Status',
        align: 'left',
        valign: 'middle'
      }],
      data: []
    };
    // Get image list.
    containerService.index({all: 1})
    .success(function(containers) {
      angular.forEach(containers, function(ele, index) {
        containers[index].Ports = containers[index].Ports || [];
        containers[index].Port = '';
        for(var i in containers[index].Ports) {
          var port = containers[index].Ports[i];
          containers[index].Port += port['IP'] + ":" +
            port['PublicPort'] + '(' + port['PrivatePort'] +
            '/' + port['Type'] + ') ';
        }
        var pain = containers[index].Status || '';
        pain = pain.toLowerCase();
        if(pain.indexOf('up') != -1) {
          if(pain.indexOf('paused')) {
            containers[index].state = 'pause';
          } else {
            containers[index].state = 'up';
          }
        } else if (pain.indexOf('dead') != -1) {
          containers[index].state = 'dead';
        } else {
          containers[index].state = 'down';
        }
        containers[index].NamesLink = "<a class='' href='#/container/" +
          containers[index].Id + "'>" + containers[index].Names + "</a>";
      });
      $scope.containerTableData.data = containers;
    }).error(function(err, status) {
      toastr.error("Failed to get container list as: " + err);
    });

    // Set container create event.
    $scope.CreateContainer = function CreateContainer() {
      $dialog.open({
        templateUrl: 'container/templates/create.html',
        controller: 'containerCreateController'
      });
    };

    // Handle container action.
    $scope.Action = function Action(mode) {
      if(!$scope.selectedItem) return;
      var selectedItem = $scope.selectedItem;
      if(mode === 'start') {
        //angular.forEach($scope.selectedItems || [], function(ele) {
        containerService.show({id: selectedItem.Id}).success(function(container) {
          containerService.action(mode, container.Id, container.HostConfig).success(function (){
            $route.reload();
            toastr.success("Successfully start container " + container.Names);
          });
        }).error(function(err) {
          toastr.error("Failed to get container detail as: " + err);
        });
        //});
        return;
      }
      //angular.forEach($scope.selectedItems || [], function(ele) {
      containerService.action(mode, selectedItem.Id).success(function (){
        $route.reload();
        toastr.success("Successfully " + mode + " container " + selectedItem.Names);
      }).error(function (err) {
        toastr.error("Failed to " + mode + " container as: " + err);
      });
      //});
    }

    // Handle container delete action.
    $scope.Del = function Del(mode) {
      if(!$scope.selectedItem) return;
      var selectedItem = $scope.selectedItem;
      //angular.forEach($scope.selectedItems || [], function(ele) {
      containerService.del(selectedItem.Id).success(function (){
        $route.reload();
        toastr.success("Successfully delete container " + selectedItem.Names);
      }).error(function (err) {
        toastr.error("Failed to delete container as: " + err);
      });
      //});
    }

    // Handle console action.
    $scope.Console = function Console() {
      if($scope.selectedItem) {
        $location.path('/container/' + $scope.selectedItem.Id + '/console');
      }
    };
}]);
