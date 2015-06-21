angular.module('app')
  .service('serviceService', function () {
    this.message = 'This is my service!';
    this.value = {
      value1: 33333,
      value2: 55555
    };
    this.add = function (a, b) {
      return a + b;
    };
  });