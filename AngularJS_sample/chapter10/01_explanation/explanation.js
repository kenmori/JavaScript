angular.module('app')
  .directive('myDirective', function () {
    return {
      compile: function compile(tElement, tAttrs, tTransclude) {
        // コンパイル処理: preタグ内のテキストを設定する
        tElement.text('This is my favorite directive!');

        return function link(scope, iElement, iAttrs, controller, iTransclude) {
          // リンク処理: スコープ内の変数が変化したら、preタグ内のテキストを変更する
          scope.$watch('message', function (newVal) {
            tElement.text(newVal);
          });
        }
      }
    }
  });