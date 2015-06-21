angular.module('app', [])
  .directive('myDirective', function () {
    return {
      templateUrl: 'template.html',
      controller: ['$scope', '$element', '$attrs', '$transclude',
        function ($scope, $element, $attrs, $transclude) {
          this.add = function (a, b) {
            return a + b;
          }
        }],
      link: function (scope, iElement, iAttrs, controller, iTransclude) {
        scope.click = function () {
          scope.x = controller.add(scope.a, scope.b);
        }
      }
    }
  });

