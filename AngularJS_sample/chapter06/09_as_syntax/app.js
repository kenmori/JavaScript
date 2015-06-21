angular.module('app', [])
  .controller('AsSyntaxController', function () {
    this.value = 'Hello, World!';
    this.getUpperValue = function () {
      return angular.uppercase(this.value);
    }
  });
