angular.module('app')
  .directive('scopeIsolated', function () {
    return {
      restrict: 'E',
      scope: {
        message: '=myMessage',
        name: '@myName',
        action: '&myAction'
      },
      template: '<pre title="{{name}}">{{message}}</pre><button ng-click="action()">push</button>'
    }
  });
