var app = angular.module('app', []);

app.controller('bookShelfController', ['$scope', function ($scope) {
  $scope.books = [
    {title: 'こころ', author: '夏目 漱石', status: '未所有', rate: 0, readDate: null},
    {title: '走れメロス', author: '太宰 治', status: '未読', rate: 0, readDate: null},
    {title: '羅生門', author: '芥川 竜之介', status: '読中', rate: 0, readDate: null},
    {title: '銀河鉄道の夜', author: '宮沢 賢治', status: '読了', rate: 5, readDate: new Date('2014/06/20')}
  ];
  $scope.enableMessage = false;
  $scope.$on('cannot-edit', function (event, message) {
    $scope.message = message;
    $scope.enableMessage = true;
  });
  $scope.statuses = ['未所有', '未読', '読中', '読了'];
}]);
