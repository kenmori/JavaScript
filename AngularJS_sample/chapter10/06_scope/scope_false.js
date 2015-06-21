angular.module('app')
  .directive('scopeFalse', function () {
    return {
      scope: false,
      template: '<pre>{{greeting}}</pre>'
    }
  });
