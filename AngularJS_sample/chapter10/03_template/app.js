angular.module('app', [])
  .directive('myDirective', [function () {
    return {
      template: '<pre>This is my first directive!</pre>'
    }
  }]);
