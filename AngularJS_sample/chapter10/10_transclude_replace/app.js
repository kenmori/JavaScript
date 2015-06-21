angular.module('app', [])
  .directive('transcludeTrueReplaceFalse', function () {
    return {
      transclude: true,
      replace: false,
      templateUrl: 'template.html'
    }
  })
  .directive('transcludeTrueReplaceTrue', function () {
    return {
      transclude: true,
      replace: true,
      templateUrl: 'template.html'
    }
  })
  .directive('transcludeElementReplaceFalse', function () {
    return {
      transclude: 'element',
      replace: false,
      templateUrl: 'template.html'
    }
  })
  .directive('transcludeElementReplaceTrue', function () {
    return {
      transclude: 'element',
      replace: true,
      templateUrl: 'template.html'
    }
  });
