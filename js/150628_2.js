function MyClass = {};
var Proto = {x:2,x:3};

MyClass.prototype = Proto;
var obj = new MyClass();

//上と等価
var Proto = {x:2,x:3};
var obj = Object.create(Proto);
