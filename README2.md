
**問184**

第一引数にaddress,第二引数にtyoume、第三引数にbanchをとりそれらの渡ってきた値をそれぞれ要素とする1つの配列として返すだけの関数createAddressに
defaultPrameterとして第二引数に「address + -1」、第三引数に「tyoume + "-10"」として設定してください。

```js
function createAddress(address, tyoume = address +  "-1", banch = tyoume + "-10"){
 return [address, tyoume , banch];
}
createAddress("meguro")
//["meguro", "meguro-1", "meguro-1-10"]
```


**問185**

f()を実行すると6が返ってくる関数を実装してください。
但しfは引数にx,y,zを持ち、xはデフォルトで1、yは2で、zはObjectDestructuringとしてkeyとvalueにzにを持ちデフォルトでzの値は3とする

```js
function f([x, y] = [1,2], {z: z} = {z: 3}){
 return x + y + z;
}
f()
//6
```

**問186**

こちらを使って
```js
var people = [
{ name: "ken",
  family: {
   mother: "jone Smith"
  },
 age: 24
},
{ name: "jun",
  family: {
   mother: "jone jun"
  },
 age: 27
}];
```
下記のような
。
```js
//Name ken, Mother: jone Smith
//Name jun, Mother: jone jun
```
出力になるように実装してください。

```js
var people = [
{ name: "ken",
  family: {
   mother: "jone Smith"
  },
 age: 24
},
{ name: "jun",
  family: {
   mother: "jone jun"
  },
 age: 27
}];
for (var {name: n, family: {mother : f}} of people){
 console.log("Name " + n + ", Mother: " + f);
}
//Name ken, Mother: jone Smith
//Name jun, Mother: jone jun

```

**問187**

こちら
```js
var metadata = {
 title: "Scratchpad",
 translations: [
  {
    locale: "de",
    localization_tags: [],
    last_edit: "2016-07-18",
    url: "kenjimorita.jp",
    title: "JavaScript"
   }
 ],
  url: "kenjimorita.jp/JavaScript"
};
```
のtitleをenglishTitleとして、translationsの中のtitleをlocalTitleとしてそれぞれ変数に代入してconsole.log出力してください

```js
var metadata = {
 title: "Scratchpad",
 translations: [
  {
    locale: "de",
    localization_tags: [],
    last_edit: "2016-07-18",
    url: "kenjimorita.jp",
    title: "JavaScript"
   }
 ],
  url: "kenjimorita.jp/JavaScript"
};
var {title: englishTitle, translations: [{title: localeTitle}]} = metadata;
console.log(englishTitle, localeTitle);
//"Scratchpad"
//"JavaScript"

```

**問188**

こちらの渡ってきたoptionの値をデフォルト設定している書き方

```js
function drawES5Chart(options) {
  options = options === undefined ? {} : options;
  var size = options.size === undefined ? 'big' : options.size;
  var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
  var radius = options.radius === undefined ? 25 : options.radius;
  console.log(size, cords, radius);
}
drawES5Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});
```
をECMAScript2015の書き方に修正してください

```js
function drawES6Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
  console.log(size, cords, radius);
}
drawES6Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});

// In Firefox, default values for destructuring assignments are not yet implemented (as described below).
// The workaround is to write the parameters in the following way:
// ({size: size = 'big', cords: cords = { x: 0, y: 0 }, radius: radius = 25} = {})

```


**問189**

```js

function Human (name){
 this.name = name;
}
function Megurokumin(number, name){
 this.ID = number;
 Human.call(this, name);
}
Megurokumin.prototype = new Human();
var ii = new Megurokumin('090', 'morita');
ii.name;
ii.ID
fafa = new Megurokumin('778', 'oosato');
fafa.name

ii instanceof Megurokumin
//true
```



**問190**
このような```function add (){console.log(this.x) };```関数ある。新たに変数名objのプロパティとしてx、値5で定義した後、addが参照するthisがobjにbindするように呼び出してください。
```js

function add (){console.log(this.x) };
var obj = {x: 5};
add.apply(obj)
//5
```

**問191**
このような```function add (y, z){console.log(this.x, y + z ) };```関数がある。この関数に{x:3}にbindさせて、yは5,zは6となるように実行してください。

```js
//apply
function add (y, z){console.log(this.x, y + z ) };
add.apply({x: 3}, [5, 6])

//call
function add (y, z){console.log(this.x, y + z ) };
add.call({x: 3}, 5, 6)
```


**問192**

下のような記述がある。
```js
var int = 8;
var module = {
 int: 4,
 fn : function(){return this.int;}
}
```
module.fnを別の変数にbindして呼び出し、4を出力してください。

```js
var int = 8;
var module = {
 int: 4,
 fn : function(){return this.int;}
}
module.fn()
//4
var fnn = module.fn
fnn()
//8

//bindして呼び出し
var fnn = module.fn.bind(module)
fnn()
//生成する関数にもともとのthis参照しているオブジェクトを束縛させる必要がある
```

**問193**
したのような記述がある
```js
function list (){
 return Array.prototype.slice.call(arguments);
}
list(2,3,4);
```
このままだと返り値が[2,3,4]になるが、インデックス0番目はかならず数値1がsetされ、その後は呼び出し元の値が続く配列を返す関数にしてください。

```
function list (){
 return Array.prototype.slice.call(arguments);
}
var bindedList = list.bind(null, 1);
bindedList(3,4,5)
//[1, 3, 4, 5]
```

**問194**
```<ul id="list"></ul>```がある。
document.createFragmentをつかって```var array = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];```
がliのtextContentとなるようなDOMを作成してください。

```js
var list = document.getElementById('list');
var fragment = document.createDocumentFragment();
var array = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];
var newnode = array.forEach(function(elem){
    var li = document.createElement("li");
    li.textContent = elem;
    fragment.appendChild(li);
})
list.appendChild(fragment);
//全てのブラウザで利用可能
//返り値はDocumentFragmentへの参照。メモリ上に存在
//DOMツリーに追加するのではないのでリフローが行われない
```


**問WIP-195**
```js
var {c:foo, d} = {
  c:"foo",
  d:"bar"
};
```

**WIP**
```js
const {g,h} = {g:3, h:4};
console.log(g,h)
//3, 4
```

**問197**
ローカルストレージとセッションストレージの違いを教えてください.


```js
データの保存のされ方が違う
ローカルストレージ
同じオリジン間で共有されるストレージ。
ブラウザに保存される
localstrageは他のタブ間でもデータが共有される
あるタブで保存されたデータは即座に違うタブで参照できる
ページを更新して残っている

セッションストレージ
ブラウジングコンテキスト(タブ)に保存される
異なるタブなら異なるsessionストレージ
同一タブ内なら保存は維持される


ストレージ内のデータは文字列
ストレージにオブジェクトは渡せない(JSONを使ってください)

```

**問198**
ローカルストレージのkeyとしてfooを値を"fafa"と設定、取得、削除、全てをクリアーにしてください

```js
localStrage.foo = "fafa";
localStrage.setItem("foo","fafa");
localStrage.getItem("foo");
localStorage.removeItem("foo")
localStorage.clear();
var key = localStorage.key(0)
console.log(key + "のストレージは" + localStorage[key]);
```



**WIP**

```js
//storageの値が変わったら全てのタブで発火する
window.addEventListener("storage",function(e){
},false);
//storage値が変わったタブでは発火されない

//StorageEvent
//key
//oldVAlue
//newValue
//url(ストレージが変わったページのurl)
//storageArea(変更が起こったエリアlocalStorageがSesstionStorage)
```

**WIP**
Web Messaging
```js
win=window.open("/");
win.document.body.textContent="書き換えました";

外から送るのは指示だけで実際の実装は内部でやる方がいい
(実際の開かれたページで開かれた分だけ読み込む必要があるから)

指示を与える方法がWeb Messaging
postMessage("メッセージ","/"); //他のオリジンでもメッセージを送ることができる

ある別ブラウジングコンテキストからメッセージが送られてきた場合発火
window.addEventListener("message",function(e){
    console.log("送られてきたメッセージは",e.data);
    e.source.postMessage("返信",e.origin);//返信できる
});

```


**WIP**
```js
ボイラープレートコード（似ているのに省略できないお決まりのコード断片）
```

**WIP**
```js
function CreateId(id){
 this.id = id;
}
CreateId.prototype.get = function(){
 console.log(this.id);
}
var create = new CreateId(10);
create.get()//10

//setTimeoutはthisがwindow設定なのでうまくいかない
//オブジェクトのメソッドはオブジェクトに束縛されているものではなく、その時々の実行コンテキスト(呼び出し部分)において実行される
setTimeout(create.get, 1000);
//こうする
setTimeout(create.get.bind(create), 1000);
```


**WIP**
```js
{
const B = 5;
    B = 10; // TypeError: Assignment to constant variable

    const ARR = [5, 6];
    ARR.push(7);
    console.log(ARR); // [5,6,7]
    ARR = 10; // TypeError: Assignment to constant variable
    ARR[0] = 3; // value is mutable
    console.log(ARR); // [3,6,7]
}
```

**WIP**
```js
function Person() {
    var self = this;
    self.age = 0;

    setInterval(function growUp() {
        // The callback refers to the `self` variable of which
        // the value is the expected object.
        self.age++;
    }, 1000);
}

```

```js
function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++; // `this` properly refers to the person object
    }, 1000);
}

var p = new Person();
```


**問205**
RestOperatorを使って渡した実引数を要素にする1つの配列で出力してください。
```js
function foo(...args) {
    console.log(args);
}
foo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

**WIP**

```js
function getGame(make, model, value) {
 return {
  make,
  model,
  value,
  ['make' + make] : true,
  depreciate() {
   this.value -= 2000;
  }
 }
}
let game = getGame('nintendo', 'pokemonGo', 3000);
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
VM9460:3 hello from the parent
VM9460:9 hello from the child
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

**WIP**
```js
SomeClass.prototype.someMethod = function (arg1, arg2) {
    ···
};
SomeClass.prototype.anotherMethod = function () {
    ···
};
```
とはちがう別の方法でメソッドを定義してください

```js
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
        ···
    },
    anotherMethod() {
        ···
    }
});
```
**問000**

こちらは値を割り当てられません。
```js
const proto = Object.defineProperty({}, 'prop', {
    writable: false,
    configurable: true,
    value: 123,
});
const obj = Object.create(proto);
obj.prop = 456;
    // TypeError: Cannot assign to read-only property
```

valueを書き換えてください

```js
const proto = Object.defineProperty({}, 'prop', {
    writable: false,
    configurable: true,
    value: 123,
});
const obj = Object.create(proto);
Object.defineProperty(obj, 'prop', {value: 456});
console.log(obj.prop); // 456
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

**問000**

これは期待する値が出力されない。

```js
const arr = [];
for (var i=0; i < 3; i++) {
    arr.push(() => i);
}
arr.map(x => x()); // [3,3,3]
```
```js
Every i in the bodies of the three arrow functions refers to the same binding, 
which is why they all return the same value.
If you let-declare a variable, a new binding is created for each loop iteration:

const arr = [];
for (let i=0; i < 3; i++) {
    arr.push(() => i);
}
arr.map(x => x()); // [0,1,2]
```



**問000**

```html
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <div id="content"></div>
    <script>
        const entries = [
            ['yes', 'ja'],
            ['no', 'nein'],
            ['perhaps', 'vielleicht'],
        ];
        const content = document.getElementById('content');
        for (let [source, target] of entries) { // (A)
            content.insertAdjacentHTML('beforeend',
                `<div><a id="${source}" href="">${source}</a></div>`);
            document.getElementById(source).addEventListener(
                'click', (event) => {
                    event.preventDefault();
                    alert(target); // (B)
                });
        }
    </script>
</body>
</html>

```

**問000**

下記consoleは

```js
const foo = 'outer';
function bar(func = x => foo) {
    const foo = 'inner';
    console.log(func());
}
bar();
```
何を出力するか。またその理由を答えてください。


```js
//outer

The scope of parameter default values is separate from the scope of the body (the former surrounds the latter).
That means that methods or functions defined “inside” parameter default values don’t see the local variables of the body:
```


**問000**
Destructuring helps with processing return values:

```js
const obj = { foo: 123 };

const {writable, configurable} =
    Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(writable, configurable); // true true
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
スーパークラスのメソッドspeakをサブクラスgetSpeakからcallしてください
```js
class Faa {
 constructor(name){
  this.name = name;
 }
 speak(){
   console.log(this.name);
 }
}

class Faaaa extends Faa {
  constructor(name){
    super();
    this.name = name;
  }
 getName(){
   super.speak();
 }
}

var eee = new Faa("kenji");
eee.speak();
var iii = new Faaaa("morita");
iii.getName();
eee.speak();
```


**問000**

こ方法はorigのプロパティ属性を守らない
```
function clone(orig) {
    return Object.assign({}, orig);
}
```

propety descriptorsを使ってorig属性をもつ「クローンを作る関数」にしてください

```js
//Cloning objects

function clone(orig) {
    const origProto = Object.getPrototypeOf(orig);
    return Object.assign(Object.create(origProto), orig);
}

```


**問000**

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

Generator methodsをつくってください(仮)

```js

//If you prefix a method definition with an asterisk (*), it becomes a generator method. Among other things, a generator is useful for defining the method whose key is Symbol.iterator. The following code demonstrates how that works.


class IterableArguments {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (const arg of this.args) {
            yield arg;
        }
    }
}

for (const x of new IterableArguments('hello', 'world')) {
    console.log(x);
}

// Output:
// hello
// world
```



**問000**

```js
Math.abs(-10)
//10
```



**問000**

定義と同時に実行する関数を作ってください

```js
var dimension = function(radius, height){
 var dimension = radius * radius * Math.PI;
 return dimension * height / 3;
}(10,20);
console.log(dimension);

//(10,20)を取り除くと関数リテラルになることに注意
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
オブジェクトのプロパティが存在するかどうか
```js
var obj = {
 width: 20
}
if(!!obj.height){
 console.log(obj.height)
} else {
 console.log("heightが定義されていません")
}
console.log(!!obj.height)
//false
//"heightが定義されていません"
```


**問000**
``
﻿
function add(x, y){
 return x + y;
}
function multiply(x, y){
 return x * y;
}
function withLogging(wrappedFunction){
 return function(x, y){
  var result = wrappedFunction(x, y);
    console.log('result', result);
    return result;
  };
 }
 
var addAndLog = withLogging(add);
addAndLog(1, 2)
//result 3
//3

var multiplyAndLog = withLogging(multiply)
multiplyAndLog(40,4)
//result 160

```


**問000**
先頭からN個を削除
```js

var hoge = document.querySelectorAll("h1");
var newHoge = Array.prototype.slice.call(hoge, 1);

```

**問000**
```var a = 'aabbccdde1e23ffgg'; ```と```var a = 'aabbccdde1e23ffgg';```のどちらがさきに数値が現れるか比較してください

```js
var a = 'aabbccdde1e23ffgg';
var b = 'aabbccddee123ffgg';

a.search(/\d/) > b.search(/\d/);
//false
```

**問000**
```<div>abuout me</div>```divタグに囲まれた文字列を配列divArrayに格納しなさい

```js
var div = "<div>about me</div>";
var divarray=[];
divarray.push(/\<div\>(.+)\<\/div\>/.exec(div)[1])
divarray
//["about me"]

```


**問000**
```js

var i = 0;
var array = [];
do {
array.push(Math.pow(2,i));
i += 1;

} while(i < 10);

```


**問000**
1980年8月1日を表すDateオブジェクトを生成してください

```js
var d = new Date('1980/8/1 5:55');
//Fri Aug 01 1980 05:55:00 GMT+0900 (JST)

```



**問000**

上で作成した日時を現地フォーマットで出力してください

```js
var d = new Date('1980/8/1 5:55');
d.toLocaleString();
//"2008/7/1 5:55:00"


//標準フォーマット
d.toStoring();
//"Tue Jul 01 2008 05:55:00 GMT+0900 (JST)"
```

**問000**

上で作成した時間を現地フォーマットで出力してください

```js
var d = new Date('1980/8/1 5:55');
d.toLocaleTimeString();
//"5:55:00"

//標準フォーマット
//"05:55:00 GMT+0900 (JST)"

```


**問000**
var ary = ['aaa', 'bbb', 'ccc'];に文字列'eee'を先頭に追加してください
```js
var ary = ['aaa', 'bbb', 'ccc'];
ary.unshift('eee');
//4
ary
//["eee", "aaa", "bbb", "ccc"]

```

**問000**
こちらの変数を使って
var ary = [0, 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10];
2でも3でも割り切れない数を抽出した配列を生成してください

```js
var ary = [0, 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10];
var newAry = ary.filter(function(elem){
    if (elem % 3 !== 0 && elem % 2 !== 0){
         return elem
     }
});
newAry
//[1, 5, 7]
```

**問000**
ビルドインプロパティを3つ答えなさい

```js

Infinity
NaN
undefined

//グローバルオブジェクトに定義されているプロパティ
//ビルドインオブジェクトとは異なり、参照する際にオブジェクトを指定せずにプロパティ名を記述するだけ
```



**問000**
ビルドイン関数を9つ挙げてください

```js
decodeURL(str)
decodeURIComponent(str)
encodeURI(str)
encodeURIComponent(str)
eval(codeStr)
isFinite(num)
isNaN(value)
parseFloat(str)
parseInt(str,[radix])


```


**問000**
こちら
encodeURIComponenとencodeURIの違いを教えてください

```js

const url = "https://tools.ietf.org/html/rfc2822#page-14";
encodeURIComponent(url)
//"https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc2822%23page-14"

(;、 :、 /、 @、？、 &、 %、 $、 #、 =、 + 、 ,)はエンコードしない
encodeURI(url)
//"https://tools.ietf.org/html/rfc2822#page-14"

```


**問000**

fromChraCode()
charCodeAt
charAt
localCompare(target)
toLowerCase
toLocalLowerCase

```js

```


**問000**

```var s = 'aaa,bbb,ccc,ddd';```
を使って、,を/に置換した文字列```aaa/bbb/ccc/ddd```を出力してください。ただしreplaceメソッドは使用しないこととする

```js
while (s.indexOf(",") >= 0){
  s = s.replace(',','/');
}
s
//"aaa/bbb/ccc/ddd"

※splitとjoinを使って生成する方法もあります

```

**問000**
下の変数sにある
```var s = 'aaa<div>bbb</div>ccc<div>ddd</div>eee';```
divの中にあるtextを全て出力してください


```js
var s = 'aaa<div>bbb</div>ccc<div>ddd</div>eee';
var divStringAry = [];
var regexp = /<div>.*?<\/div>/g;
var result = regexp.exec(s);
while(result != null){
 var divStr = result[0]
 divStr = divStr.substring('<div>'.length,
          divStr.length - '</div>'.length);
divStringAry.push(divStr);
result = regexp.exec(s);
}

divStringAry
//["bbb", "ddd"]
divStringAry.join('\n')
//"bbb
//ddd"

```

**問000**
2の0乗〜10乗までを格納した配列を作成してください。インデックスはそれぞれ指数(0〜10)となるようにしてください

```js

var ary = [];
var i = 0;
do {
   ary[i] = Math.pow(2, i);
   i += 1;
} while(i <= 10);
ary
//[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

//別解
var ary = [];
for(var n = 0; n <= 10; n++){
 ary[n] = Math.pow(2, n);
}
```


**問000**

今年の各月の最終日を配列に格納してくださいｌ。インデックスは各月と一致する数値とする。

```js
var ary = [];
var temp = new Date();
for (var i = 1; i <= 12; i++){
 var d = 28;
 temp.setMonth(i - 1, d);
 while(temp.getMonth() == i - 1){//次の月になるまでroop
   d++;
   temp.setDate(d);
 }
 ary[i] = d -1; //次の付きになる直前の日付を配列に設定
}
ary
//[undefined × 1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//DateオブジェクトのsetDate()に日付を設定したさい、実際の日付より大きい数値を設定した場合は自動的に繰り上げられる
例えば1月のDateオブジェクトに対してsetDate(32)とすると自動的に2月1になる。その性質を利用する

```


**問000**

同一制限ポリシー(Same-Origin-Policy)の制限を受けるものを4つ答えてください。オリジンを調べるためのlocationプロパティを答えてください
```js
see : https://tools.ietf.org/html/rfc6454

・XMLHttpRwquest
・Canvas
・WebStorage
・X-Frame-Options

location.origin
document.origin

//制限を受けないものには
//Cookie
//HTTP認証
//document.domainを書き換えてのinnerHTMLの読み書き

//以下はlocationプロパティ
//例: http://www.google.com:80/search?q=devmo#test
host - www.google.com:80
hostname - www.google.com
href - http://www.google.com:80/search?q=devmo#test
pathname - /search (ホストからの相対)
protocol - http:
search = ?q=devmo
hash - #test

//用語
スキーム : http,https
同一オリジン : スキーム,ホスト,ポートが同じこと
クロスオリジン : 上記がいずれか一つでも違うこと
セッションハイジャック :
 

```

**問000**
location.assignとlocation.replaceの違いを教えてください
```js
//replaceは画面遷移をWebブラウザの履歴に残さ図遷移する

```

**問000**

Object.creteを使ってPersonのにthis.nameとthis.jobを参照して「"my name is" + this.name + "。" + "職業は" + this.job + "です"」を出力するインスタンスメソッド「say」のみを持ち、それを継承してnameを自身のプロパティとして持つkenjiと、
kenjiを継承しjobを自身のプロパティとしてもつcompKenjiを作成して
```my name is けんじ。職業は芸人です``を出力してください、

```js

var Person = {
 say: function(){
   console.log("my name is" + this.name + "。" + "職業は" + this.job + "です");
 }
}

var kenji = Object.create(Person, {name :{value: "けんじ" }});
var compKenji  = Object.create(kenji, {job: {value: "芸人"}});
compKenji.say()
"my name is けんじ。職業は芸人です"

//Object.crete()
第一引数・・・プロトタイプとなるべきobject
第二引数・・・省略可能。列挙可能なown property(プロパティ記述子を指定。あらたなobjectのプロパティに追加される。Object.definePropertyesの第二引数に対応するところ)

第一引数で渡されるObjetcが、内部で生成されるF.prototypeに割り当てられてnew F()とされた新たなinstanceが返される
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
```


**問000**
以下と同じ記述をしてください。
```
function Constructor(){}
o = new Constructor();
```

```js
o = Object.create(Constructor.prototype);
```

**問000**
```var o = Object.create({},{p: {value: 32}});```
を書き換えtrue、列挙true、変更trueとして新たにオブジェクトを生成してください。

```js
o2 = Object.create({},{p: {value: 32, writable: true, enumerable: true, configurable: true}});

書き換え
o2.p = 54;
//54

列挙
for (var prop in o2){
 console.log(prop)
}
//p

変更
delete o2.p
//true

```

**問000**

Object.createとObject.definePropertyesとObject.definePropertyの違いを教えてください。

```js
//Object.create
//第一引数に任意のオブジェクトのprototypeを渡し、第二引数に自身がもつプロパティディスクリプタを定義し、それを継承したインスタンスを返す.

//Object.defineProperty
Object.defineProperty(プロパティをsetする対象オブジェクト, プロパティ/関数名, {パラメータ, ...});
「一度作ったオブジェクト」に特別な内部属性をもったプロパティを1つ定義する//返り値は第一引数で渡ってきて再定義されたオブ稀有と
第二引数はpropety名、第三引数は定義したいディスクリプタをハッシュオブジェクトとして渡す
既存のプロパティは上書き
各種設定のdefaultはfalse


//Object.definePropertes
Object.defineProperty(プロパティをsetする対象オブジェクト,{プロパティ/関数名{パラメータ, ...}});
「一度作ったオブジェクト」に新たなプロパティを複数の定義できる
第二引数はpropertyeのキーとしてディスクリプタを持つオブジェクト
既存のプロパティは上書き

※プロパティの内容＝デスクリプタ


```


**問000**
let n = "124";を数値に変換してください。 
```js
let n = "124";
+n
//124

let n = "";
n
//0
//parseInt(n, 10)はから文字だとNaNが返るがこちらの方法は必ず数値が返る

```


**問000**
```js

var n = {value: 0};
if(n.value != null){
 console.log("property exists");
} else {
 console.log("null or undefined ??");
}   
```

**問000**
こちらの評価は
```var n = {value: 0};
if(n.value){//something}
```
value値が0にもかかわらずfalseが返ります。(valueが""空文字でもfalse)
nullやundefinedの場合のみfalseが返るような条件式にしてください

```js
if(n.value != null){//something}

```

**問000**
オブジェクトの存在チェックをしてあったら実行している。
```js
var o = {f: function(){console.log("JS")}};
if(o){
 if(o.f){
   o.f();
 }
}
```
より端的な記述をしてください。

```js
var o = {f: function(){console.log("JS")}};
o && o.f && o.f();

//同じ様なイデオムで代入の際に括弧でくくらないとエラーが起きることに注意してください
//o && o.options && o.options.players > 50 && (flag = true);
```


**問000**
```var v```の値を確実に数値にしたい。
"a"が入ってきた場合NaNではなく0を代入するようにしてください。
 
```js
var n = +v || 0;
```

**問000**
```var v ```を整数化してください

```js
var i = v | 0;

```

**問000**
下の様な場合、
```js
var insEmp1 = new Emp();
var insEmp2= new Emp();
insEmp2.name = "kenji";
insEmp2.name;
//"kenji"


insEmp1.name;
//undefined;
//更新されない
```

Empがnameを持っていない場合Emp1は即座に更新されない。
プロトタイプからプロパティを継承する全オブジェクトにそのプロパティ(name)を値("kenji")を追加してください。

```js
function Emp(){};
var insEmp1 = new Emp();
var insEmp2 = new Emp();
Emp.prototype.name = "kenji";

insEmp1.name
//"kenji";
insEmp2.name
//"kenji"
```


**問000**
ObjectとMapの違いを教えてください

```js
・Objectのkeyはstring型、Mapは任意の型を指定できる
・Objectのsizeは手動で調べる必要がある、MapはMap.size()
・Objectの反復は順番を保証しない,Mapの反復は要素の挿入順
・Objectはデフォルトでプロパティを持つ(var map = Object.create(null)で回避できる)


//ObjectかMapか、使うべきところ
//Mapを使う
・実行時までキーが不明な時、全てのkeyが同じ型の時、全ての値が同じ型の時、

//Objectを使う
・個々の要素に操作できるロジックがある時、

参照
http://programmers.stackexchange.com/questions/285881/any-point-in-using-es6-map-when-keys-are-all-strings
http://stackoverflow.com/questions/18541940/map-vs-object-in-javascript

    Object:
        var o = {};
        var o = Object.create(null);
        o.key = 1;
        o.key += 10;
        for(let k in o) o[k]++;
        var sum = 0;
        if('key' in o);
        if(o.hasOwnProperty('key'));
        delete(o.key);
        Object.keys(o).length
    Map:
        var m = new Map();
        m.set('key', 1);
        m.set('key', m.get('key') + 10);
        m.foreach((k, v) => m.set(k, m.get(k) + 1));
        for(let k of m.keys()) m.set(k, m.get(k) + 1);
        var sum = 0;
        for(let v of m.values()) sum += v;
        if(m.has('key'));
        m.delete('key');
        m.size();
```


**問000**
破壊的なメソッドをあげてください
```js
pop、push、reverse、shift、sort、splice、unshilft
```

**問000**
```var arr = ['one', 'two', 'three']```においてarrを非破壊メソッドに変更してください。

```js
var arr = ['one', 'two', 'three']
Object.freeze(arr);
arr.sort();
//TypeError: arr.sort() is read-only
```

**問000**
```js

```

**問000**
this呼び出しを4つとそれぞれのthis参照の参照先オブジェクトを答えてください
```js
・コンストラクタ呼び出し・・・コンストラクタが生成したオブジェクト
・メソッド呼び出し・・・レシーバオブジェクト(ドット演算子、ブラケット演算子でオブジェクトのメソッドを読んだとき、演算子の左辺に指定したオブジェクト)
e.g  const obj = {add : function(){some}};
メソッドの呼び出し対象のオブジェクトがレシーバオブジェクト、この場合obj、addがメソッド
・apply,call呼び出し・・・apply、callの引数で指定したオブジェクト
・それ以外の呼び出し ・・・グローバルオブジェクト

//this参照はコードのコンテキストに応じて自動的に参照先オブジェクトが変わる特別なもの


```

**問000**
var obj = { foo: "bar", baz: 42 }; をMapオブジェクトに変換してください

```js
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }

```

**問000**
```js
var Emiiter = {
 callbacks : [],
 register : function(fn){
   this.callbacks.push(fn);
 },
 onOpen : function(){
    this.callbacks.forEach(function(fn){
          fn();
      })
 },
}
Emiiter.register(function(){console.log("1")});
Emiiter.register(function(){console.log("2")});

```

**問000**
Promiseオブジェクトを使ってこちら
```js
function say(callback, msg) {
  setTimeout(callback, msg);
}
say(function(){
  console.log('ken!!')
}, 1000);
```
と同じことをしてください

```js
function say(msg){
 return new Promise(function(resolve, reject){
   setTimeout(resolve, msg);
  });
}

say(1000).then(function(){
 console.log('ken!');
})
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


参照

http://exploringjs.com/es6/
https://leanpub.com/understandinges6/read
https://github.com/airbnb/javascript
http://uhyohyo.net/javascript/
https://developer.mozilla.org/ja/docs/Web/API/document
http://foreignkey.toyao.net/archives/763
https://github.com/metagrover/ES6-for-humans
https://www.amazon.co.jp/%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88JavaScript-%E4%BA%95%E4%B8%8A%E8%AA%A0%E4%B8%80%E9%83%8E-ebook/dp/B00P2EG5LC
https://www.oreilly.co.jp/books/9784873115733/
https://www.oreilly.co.jp/books/9784873116211/
http://gihyo.jp/magazine/wdpress/archive/2015/vol87
https://www.amazon.co.jp/%E7%8B%AC%E7%BF%92JavaScript-%E7%AC%AC2%E7%89%88-%E9%AB%98%E6%A9%8B-%E5%92%8C%E4%B9%9F/dp/4798130842
http://nodejs.jp/nodejs.org_ja/
http://d.hatena.ne.jp/hasegawayosuke/20130330/p1
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
http://azu.github.io/promises-book/
