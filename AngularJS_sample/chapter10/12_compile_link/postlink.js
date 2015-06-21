app.directive('myDirectivePostLink', function () {
  return {
    restrict: 'E',
    link: function (scope, iElement, iAttrs, controller, iTransclude) {
      scope.$watch('message', function (val) {
        iElement.text(val);
      })
    }
  };
});
