angular.module('app', [])
  .controller('EscapeController', ['$scope', function ($scope) {
    $scope.dangerousHtml = '<button onclick="alert(\'danger & danger!\')">push</button>';
    $scope.dangerousAttr = '"+onmouseover%3d"alert(\'danger & danger!\')';
    $scope.dangerousLink = 'javascript:alert("danger & danger!")';
  }]);
