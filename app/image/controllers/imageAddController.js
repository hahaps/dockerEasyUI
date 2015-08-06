angular.module('image').controller('imageAddController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get container service.
    var containerService = $injector.get("containerService");
    // Get image service.
    var imageService     = $injector.get("imageService");
    var $route           = $injector.get("$route");
    var toastr           = $injector.get("toastr");
    var $timeout         = $injector.get('$timeout');

    $scope.imageSearchTableData = {
      data: [],
      search: false,
      checkboxHeader: false,
      height: 400,
      sortName: 'star_count',
      sortOrder: 'desc',
      singleSelect: true,
      columns: [{
        field: 'state',
        checkbox: true
      }, {
        field: 'name',
        title: 'Name',
        sortable: true
      }, {
        field: 'is_automated',
        title: 'Automated'
      }, {
        field: 'is_trusted',
        title: 'Trusted'
      }, {
        field: 'is_official',
        title: 'Official'
      }, {
        field: 'star_count',
        title: 'Stars',
        align: 'right',
        sortable: true
      }, {
        field: 'description',
        title: 'Description'
      }]
    }
    $scope.searchVal = '';
    $scope.tag = 'latest';
    $scope.forSearch = false;
    $scope.titles = {
      fromImage: 'A string of image name to pull, click the search icon to search from dock hub.',
      tag: 'A string of image tag name, default is latest.'
    };
    // Search action
    $scope.Search = function Search() {
      if($scope.searchVal === '') {
        $scope.imageSearchTableData.data = [];
        return;
      }
      imageService.search($scope.searchVal).success(function (images) {
        var imgs = [];
        angular.forEach(images, function(img, index) {
          img.is_automated = '<span class="glyphicon glyphicon-' + (img.is_automated ? 'ok' : 'remove') + '"></span>';
          img.is_trusted = '<span class="glyphicon glyphicon-' + (img.is_trusted ? 'ok' : 'remove') + '"></span>';
          img.is_official = '<span class="glyphicon glyphicon-' + (img.is_official ? 'ok' : 'remove') + '"></span>';
          if(img.description && img.description.length > 10) {
            img.description = '<span>' + img.description.substr(1, 10) + '...</span>';
          }
          imgs.push(img);
        });
        $scope.imageSearchTableData.data = imgs;
      });
    };

    $scope.$watch('selectedItem', function() {
      if($scope.selectedItem) {
        $scope.fromImage = $scope.selectedItem.name;
      }
    });

    // Add image
    $scope.Add = function Add() {
      if(!$scope.fromImage) {
        toastr.warning("Repostory cannot be empty.");
        return;
      }
      var loading = toastr.info('', 'Pulling image, please wait ...', {
            timeOut      : 60000000,
            tapToDismiss : false,
            positionClass: 'toast-top-center'
          }),
          message = '';
      imageService.create({
        fromImage: $scope.fromImage,
        tag: $scope.tag
      }, function onData(data) {
        if(data && data['status']) {
          if(data['id']) {
            message = "image " + data['id'] + "is " + data['status'];
          } else {
            message = data['status'];
          }
        } else if (data && data['error']) {
          message = data['error'];
        }
        loading.el.find('.toast-message').append('<div>' + message + '</div>');
      }, function done(res, status) {
        $route.reload();
        $scope.$close();
        $timeout(function() {
          toastr.remove(loading.toastId);
        }, 5000);
      });
    };

    // Close action.
    $scope.close = function () {
      $scope.$close();
    }
}]);
