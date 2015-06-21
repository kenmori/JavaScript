angular.module('app')
  .service('serviceServiceWithPrivateMember', function () {
    var privateValue = 123;
    var privateMethod = function (a, b) {
      return a * b;
    };
    this.message = 'This is my service!';
    this.value = {
      value1: 33333,
      value2: 55555
    };
    this.add = function (a, b) {
      return a + b;
    };
  });