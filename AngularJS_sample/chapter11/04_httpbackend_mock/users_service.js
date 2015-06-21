angular.module('app', ['ngResource'])
  .factory('usersService', function ($resource) {
    return function () {
      return $resource('/api/users').query();
    }
  });