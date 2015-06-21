function add(a, b) {
  return a + b;
}

// add関数に引数5を束縛する。thisは束縛不要なのでnullを指定。
var add5 = angular.bind(null, add, 5);

console.log('add5(8): ' + add5(8));
