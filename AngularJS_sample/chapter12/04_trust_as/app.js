angular.module('app', [])
  .controller('TrustedController', ['$scope', '$sce', function ($scope, $sce) {
    $scope.dangerousHtml = '<button onclick="alert(\'danger & danger!\')">push</button>';
    $scope.trustedDangerousHtml = $sce.trustAs($sce.HTML, $scope.dangerousHtml);
  }]);
