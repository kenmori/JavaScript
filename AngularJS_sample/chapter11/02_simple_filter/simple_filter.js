angular.module('app', [])
  .filter('upperFilter', function () {
    return function (input) {
      return angular.uppercase(input);
    };
  });