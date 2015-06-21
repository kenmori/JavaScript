angular.module('app', [])
  .directive('transcludeFn', function () {
    return {
      restrict: 'E',
      transclude: true,
      link: function (scope, iElement, iAttrs, controller, iTransclude) {
        var isolatedScope = scope.$new(true);
        var elem = iTransclude(isolatedScope, function (clonedElement, transcluededScope) {
          transcluededScope.newMessage = '新しいメッセージ';
        });
        iElement.append(elem);
      }
    }
  });
