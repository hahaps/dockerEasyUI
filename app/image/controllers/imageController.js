angular.module('image').controller('imageController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get image service.
    var imageService = $injector.get("imageService");
    var $dialog      = $injector.get("$dialog");
    var $route       = $injector.get("$route");
    var toastr       = $injector.get("toastr");

    // Define image table columns.
    $scope.imageTableData = {
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
        title: 'Repostry Tags',
        align: 'left',
        valign: 'middle',
        sortable: true
      }, {
        field: 'Size',
        title: 'Size',
        align: 'right',
        valign: 'middle',
        sortable: true
      }, {
        field: 'VirtualSize',
        title: 'Virtual Size',
        align: 'right',
        valign: 'middle',
        sortable: true
      }, {
        field: 'ParentId',
        title: 'Parent',
        align: 'left',
        valign: 'middle'
      }, {
        field: 'Created',
        title: 'Created',
        align: 'left',
        valign: 'middle',
        sortable: true
      }],
      data: []
    };
    // Get image list.
    imageService.index({all: 0})
    .success(function(images) {
      angular.forEach(images, function(ele, index) {
        images[index].NamesLink = "<a class='' href='#/image/" +
          images[index].Id + "'>" + images[index].RepoTags + "</a>";
      });
      $scope.imageTableData.data = images;
    });

    // Set image create event.
    $scope.AddImage = function AddImage() {
      $dialog.open({
        templateUrl: 'image/templates/create.html',
        controller: 'imageAddController'
      });
    };

    // Handle image delete action.
    $scope.Del = function Del(mode) {
      if(!$scope.selectedItem) return;
      var selectedItem = $scope.selectedItem;
      //angular.forEach($scope.selectedItems || [], function(ele) {
      imageService.del(selectedItem.Id).success(function (){
        $route.reload();
        toastr.success("Successfully delete image " + selectedItem.RepoTags);
      });
      //});
    }
}]);
