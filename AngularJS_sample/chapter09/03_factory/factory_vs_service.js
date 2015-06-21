var app = angular.module('app');

// サービスの定義
var myService = function () {
  this.message = 'This is my service.';
  this.value = {
    value1: 5555,
    value2: 3333
  };
  this.add = function (a, b) {
    return a + b;
  };
};

// コンストラクタ関数を登録
app.service('MyServiceByService', myService);

// インスタンスを生成して返す関数を登録
app.factory('MyServiceByFactory', function () {
  return new myService();
});

