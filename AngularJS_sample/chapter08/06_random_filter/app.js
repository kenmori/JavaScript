angular.module('app', [])
  .filter('random', function () {
    return function (value) {
      if (angular.isUndefined(value)) {
        return value;
      }
      return value + Math.random().toString();
    };
  });