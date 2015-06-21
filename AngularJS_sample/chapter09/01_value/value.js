var app = angular.module('app');
// 文字列をサービスに登録
app.value('MyMessage', 'This is my value!');

// オブジェクトをサービスに登録
app.value('MyValue', {
  value1: 12345,
  value2: 12345
});

// 関数をサービスに登録
app.value('MyFunc', function (a, b) {
  return a + b;
});
