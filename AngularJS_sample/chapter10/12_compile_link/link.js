app.directive('myDirectiveLink', function () {
  return {
    restrict: 'E',
    link: {
      pre: function preLink(scope, iElement, iAttrs, controller, iTransclude) {
        // 子要素のリンク処理が実行される前に呼び出される
      },
      post: function postLink(scope, iElement, iAttrs, controller, iTransclude) {
        // 子要素のリンク処理が実行される後に呼び出される
      }
    }
  };
});
