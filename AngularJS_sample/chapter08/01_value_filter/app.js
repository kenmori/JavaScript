angular.module('app', [])
  .filter('fizzbuzz', function createFizzBuzzFilter() {
    return function fizzBuzzFilter(value) {
      if (!angular.isNumber(value)) {
        return value;
      }
      if (value % 15 == 0) {
        return 'Fizz Buzz';
      }
      if (value % 3 == 0) {
        return 'Fizz';
      }
      if (value % 5 == 0) {
        return 'Buzz';
      }
      return value;
    };
  });