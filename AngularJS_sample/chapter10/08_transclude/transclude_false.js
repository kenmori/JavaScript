angular.module('app')
  .directive('transcludeFalse', function () {
    return {
      restrict: 'E',
      transclude: false,
      template: '<div></div>'
    }
  });
