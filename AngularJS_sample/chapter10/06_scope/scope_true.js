angular.module('app')
  .directive('scopeTrue', function () {
    return {
      scope: true,
      template: '<pre>{{greeting}}</pre>'
    }
  });
