var app = angular.module('app');
// 文字列をサービスに登録
app.constant('ConstMessage', 'This is my constant!');

// オブジェクトをサービスに登録
app.constant('ConstValue', {
  value1: 12345,
  value2: 12345
});

// 関数をサービスに登録
app.constant('ConstFunc', function (a, b) {
  return a + b;
});

