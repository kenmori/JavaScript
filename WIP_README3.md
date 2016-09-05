
**問000**
<a href="javascript:void(document.body.style.backgroundColor='green');">
クリックで背景色を緑色に
</a>


**問000**
Destructuring helps with processing return values:

```js
const obj = { foo: 123 };

const {writable, configurable} =
    Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(writable, configurable); // true true
```
**問**

fromChraCode()
charCodeAt
charAt
localCompare(target)
toLowerCase
toLocalLowerCase

```js

```


**問000**
```js
Destructuring helps with processing return values:

const [all, year, month, day] =　/^(\d\d\d\d)-(\d\d)-(\d\d)$/
.exec('2999-12-31');

```

**問000**
```js
const arr2 = [
    {name: 'Jane', age: 41},
    {name: 'John', age: 40},
];
for (const {name, age} of arr2) {
    console.log(name, age);
}
// Output:
// Jane 41
// John 40
```

**問000**

```js
function getURL(URL){
 return new Promise(function(resolve, reject){
   var req = new XMLHttpRequest();
   req.open('GET', URL, true);
   req.onload = function(){
    if(req.status === 200) {
      resolve(req.responseText);
    } else {
      reject(new Error(req.statusText));
    }
   };
   req.onerror = function(){
      reject(new Error(req.statusText));
   };
   req.send();
 });
}
var URL = "http://httpbin.org/get";
getURL(URL).then(function onFullfilled(value){
 console.log(value);
}).catch(function onRejected(error){
 console.error(error);
});

```



**問000**
```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
}
> const cp = new ColorPoint(25, 8, 'green');

> cp.toString();
//'(25, 8) in green'

> cp instanceof ColorPoint
//true
> cp instanceof Point
//true

> typeof Point
//'function'
//In fact, the result of a class definition is a function:


```

**問000**
```js
var domLinks = document.querySelectorAll('a[href]');
var links = Array.prototype.slice.call(domLinks);
links.forEach(function (link) {
    console.log(link);
});

const domLinks = document.querySelectorAll('a[href]');
const links = Array.from(domLinks);
links.forEach(function (link) {
    console.log(link);
});
```


**問000**
```js
const bar = function baz() {};
console.log(bar.name); // baz

Because it comes first, 
the function expression’s name baz takes precedence over other names (e.g. the name bar provided via the variable declaration):
```

**問000**
```js
var arr = ['a','b'];
for(let [index, elem] of arr.entries()){
 console.log(`${index}:${elem}`)
}
//0:a
//1:b
```


**問000**
```js
let arryLike = {length:2,0:'a', 1: 'b'};
for(let x of Array.from(arryLike)){
 console.log(x)
}
```

**WIP**


```
```

**WIP**

```js
var parent = {
 foo() {
  console.log("hello from the parent");
 }
}
var child = {
 foo() {
  super.foo();
  console.log("hello from the child");
 }
}
Object.setPrototypeOf(child, parent);
child.foo()
//hello from the parent
//hello from the child
```

**WIP**
http://exploringjs.com/es6/ch_oop-besides-classes.html#Object_assign

```js
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options); // (A)
    ···
}

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```


**問000**
```js

```


**問000**
```js

```


**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```


**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```
**問000**
参照渡し
```js
var obj = {a: "初期値", p: 10};
var num = 1;
function fun(num2, obj){
 obj.a = "変更後";
 num = num2;
}
fun(2,obj);
num
//2
obj.a
//"変更後"

```


```js
var obj = {a: "初期値", p: 10};
var num = 1;
function fun(num2, obj){
 obj2 = {a : "変更後"};
 num = num2;
}
fun(2,obj);
//num
2
obj.a
//"初期値"
obj2.a
//"変更後"
```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**

```js
Math.abs(-10)
//10
```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```


**問**

```js
class MyClass {
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: '+value);
    }
}

```


**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```

**問000**
```js

```







### Node.JS

**問000**
node server.jsとコマンドを打つと
http://127.0.0.1:8124で
画面に'Hello word'が出力、
consoleに
`Server running at http://127.0.0.1:8124/`
と出力されるserver.jsを作成してください。
Cntent-typeはtext/plainとする

```js
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');

```

