angular.module('app', [])
  .controller('graphSampleController', ['$scope', function ($scope) {
    $scope.data = [
      {month: '1月', count: 6},
      {month: '2月', count: 1},
      {month: '3月', count: 2},
      {month: '4月', count: 6},
      {month: '5月', count: 5},
      {month: '6月', count: 3},
      {month: '7月', count: 12},
      {month: '8月', count: 2},
      {month: '9月', count: 8},
      {month: '10月', count: 2},
      {month: '11月', count: 1},
      {month: '12月', count: 2},
    ];
  }]);
