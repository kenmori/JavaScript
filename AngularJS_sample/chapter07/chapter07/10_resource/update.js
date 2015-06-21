var app = angular.module('app', ['ngResource']);
app.controller('UserCtrl', ['$resource', '$scope',
  function($resource, $scope){
    var User = $resource('api/users/:userId', {userId: '@id'}, {
      update: {method: 'PUT'}
    });
  }
]);
