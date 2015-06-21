angular.module('app', ['ngSanitize', 'ui.highlight'])
  .controller('hightlightController', ['$scope', function ($scope) {
    $scope.message = '指定した文字列をハイライト表示します';
  }]);