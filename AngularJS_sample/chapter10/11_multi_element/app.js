angular.module('app', [])
  .directive('myDirective', function () {
    return {
      multiElement: true,
      link: function (scope, iElement, iAttrs, controller, iTransclude) {
        angular.forEach(iElement, function (el) {
          angular.element(el).addClass('directive-rect');
        });
      }
    }
  });