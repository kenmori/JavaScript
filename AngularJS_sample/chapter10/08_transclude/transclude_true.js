angular.module('app', [])
  .directive('transcludeTrue', function () {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div><span ng-transclude/></div>'
    }
  });
