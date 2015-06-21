angular.module('app', [])
  .directive('myDirective', function () {
    return {
      templateUrl: 'my_template.html'
    }
  });