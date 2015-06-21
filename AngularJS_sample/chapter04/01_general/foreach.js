// (1) オブジェクトの全要素を処理します
var user = { name: 'taro', age: 17, weight: 80 };
angular.forEach(user, function (value, key) {
  console.log(key + ': ' + value);
});

// (2) 配列の全要素を処理します
var values = ['apple', 'orange', 'banana'];
angular.forEach(values, function (value, i) {
  console.log('values[' + i + ']: ' + value);
});

// (3) iterator関数のthisを指定することができます。
var ret = [];
angular.forEach(values, function (value, key) {
  this.push(key + ': ' + value);
}, ret);
console.log(ret);