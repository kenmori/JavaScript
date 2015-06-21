angular.module('app', ['ngGrid'])
  .controller('gridController', ['$scope', function ($scope) {
    $scope.users = [
      {name: "かない", twitter: 'can_i_do_web'},
      {name: "いけぞえ", twitter: 'zoetro'},
      {name: "よしだ", twitter: 'teyosh'}
    ];
    $scope.gridOptions = { data: 'users' };
  }]);