angular.module('app.filter', [])
  .filter('upperFilter', function () {
    return function (input) {
      if (angular.isDefined(input) && !angular.isString(input)) {
        throw Error('input type is not String.')
      }
      return angular.uppercase(input);
    };
  });