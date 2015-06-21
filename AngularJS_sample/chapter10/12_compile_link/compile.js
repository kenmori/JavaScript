app.directive('myDirectiveCompile', function () {
  return {
    restrict: 'E',
    compile: function (tElement, tAttrs, tTransclude) {
      if (angular.isDefined(tAttrs.readonly)) {
        // readonly属性が定義されている場合はmessageをそのまま表示する
        tElement.append('{{message}}');
      } else {
        // readonly属性がない場合はinputタグとして表示する
        tElement.append('<input type="text" ng-model="message">');
      }
    }
  }
});
