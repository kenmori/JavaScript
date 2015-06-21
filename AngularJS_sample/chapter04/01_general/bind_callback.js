function MyClass() {
  this.message = 'Hello, World!';
}

// (1) MyClassのインスタンス変数が表示される？
MyClass.prototype.getMessage = function () {
  console.log(this.message);
};

MyClass.prototype.setCallback = function () {
  // (2) コールバックとして呼び出されたときのthisがMyClassのインスタンスではないため、undefinedが表示される
  $timeout(this.getMessage, 1000);

  // (3) bindするとthisの値が束縛されるので、'Hello, World!'が表示されます
  $timeout(angular.bind(this, this.getMessage), 2000);
};

var c = new MyClass();
c.setCallback();