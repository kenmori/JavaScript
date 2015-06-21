angular.module('app', ['ngSanitize'])
  .controller('LinkyController', ['$scope', function ($scope) {
    $scope.link1 = 'http://example.com';
    $scope.link2 = 'normal text http://example.com';
    $scope.link3 = 'mailto:hoge@sample.com';
    $scope.link4 = 'hoge@sample.com';
    $scope.link5 = 'https://localhost.com';
    $scope.link6 = 'ftp://foobar.co.jp';
    $scope.link7 = 'file:///home/username/file.txt';
    $scope.link8 = 'http://日本語ドメイン.com';
  }]);
