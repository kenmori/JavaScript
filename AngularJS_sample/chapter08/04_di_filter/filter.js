angular.module('app')
  .filter('fizzbuzz', ['fizzDivisor', 'buzzDivisor',
    function createFizzBuzzFilter(fizzDivisor, buzzDivisor) {
      return function fizzBuzzFilter(value) {
        if (!angular.isNumber(value)) {
          return value;
        }
        if (value % (fizzDivisor * buzzDivisor) === 0) {
          return 'Fizz Buzz';
        }
        if (value % fizzDivisor == 0) {
          return 'Fizz';
        }
        if (value % buzzDivisor == 0) {
          return 'Buzz';
        }
        return value;
      };
    }]);