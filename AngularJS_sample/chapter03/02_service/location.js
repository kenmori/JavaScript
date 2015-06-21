var app = angular.module('app', []);
app.controller('location', ['$location', '$scope', function ($location, $scope) {
  $scope.absUrl = function () {
    console.log($location.absUrl());
  }
  $scope.protocol = function () {
    console.log($location.protocol());
  }
  $scope.port = function () {
    console.log($location.port());
  }
  $scope.host = function () {
    console.log($location.host());
  }
  $scope.path = function () {
    console.log($location.path());
  }
  $scope.search = function () {
    console.log($location.search());
  }
  $scope.hash = function () {
    console.log($location.hash());
  }
  $scope.url = function () {
    console.log($location.url());
  }

  $scope.setPath = function () {
    $location.path('/new');
  }
  $scope.setUrl = function () {
    $location.url('/url?search=new#new');
  }


}]);
