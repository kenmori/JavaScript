angular.module('app', [])
  .directive('myDirectiveA', function () {
    return {
      restrict: 'A',
      template: '<pre>This is my Directive type A.</pre>'
    }
  })
  .directive('myDirectiveE', function () {
    return {
      restrict: 'E',
      template: '<pre>This is my Directive type E.</pre>'
    }
  })
  .directive('myDirectiveC', function () {
    return {
      restrict: 'C',
      template: '<pre>This is my Directive type C.</pre>'
    }
  })
  .directive('myDirectiveM', function () {
    return {
      restrict: 'M',
      replace: true,
      template: '<pre>This is my Directive type M.</pre>'
    }
  });