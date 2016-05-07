## javascriptの基礎的な所は知っているけど自分がどのくらい理解しているのか確認したい。実務で使わないメソッドの扱いが不安。何かを参照しながら書くことはできるけどさささっと書きたい。

```var afa = {a: 'a'}```と```var ee = {b: 'b'}```をmergeした```m```を出力してください
e.g```{a:'a',b:'b'}```

```js
var afa = {a: 'a'};
var ee = {b:'b'};
var m = Object.assign(afa, ee);
m //
```

配列

```var uu = ['oo','pp','ll','jj','hh','kk','mm'];```
の要素jj,hh,kkを要素、型を配列で返す記述をしてください


```js
var yy = uu.slice(-4,-1);
//or
var yy = uu.slice(3,-1);
```

```var arry = ['eee','ccc’]```の要素を抜き取ってください e.g ```'eee'``` と ```'ccc'```

```js
var arry = ['aa','ccc'];
arry.map(function(key,i){
 console.log(key)
})
//"aa"
//"ccc"
```

var arry = [‘eee’, ‘ccc’]を要素にindexを足された文字列を出力してください e.g “eee0” と “ccc1"

```js
var arry = ['aa','ccc'];
arry.forEach(function(key,i){
 console.log(key + i)
})
//"aa0"
//"ccc1"
```

var ee = [1,2]は配列かどうか検査したbloolean値(true)ください
e.g true

```js
Array.isArray(ee) //true
```

var aa = "fafa"を出力した後完全に削除し、削除されたことを出力してくださいe.g
"aa is not defined"

```js

var aa = "fee";
aa
//"fee"
delete aa
//true
aa
//"aa is not defined"

```
 ee(2,4,5)を実行したら引数が全て配列で返る関数eeを定義しなさい
[参照](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

```js
function ee(){
 return Array.from(arguments)
}
ee(2,4,5)//[2.4,5]
```


var obj2 = {
key: "eee",
key2:"ccc"
};の中のkeyとvalueを全て出力しなさい

```js
var obj2 = {
  key: "eee",
  key2:"ccc"
};
for( key in obj2){
 console.log(key);
 console.log(obj2[key])
}
```

var array3 = ['fafa','eee','ccc']配列の中の全ての要素を結合し、1つの文字列として出力してください。但し、array3.lengthはif文の外でcountとして定義すること

```js

var array3 = ['fafa','eee','ccc'];
var ee = "";
var count = array3.length;
for(var i= 0; i < count; i++){
  ee += array3[i];
}
ee
//"fafaeeeccc"

```

Array.isArrayが実行できない環境を想定してvar ee = [1,2]が配列であることを検査できる拡張された関数を定義してください
ヒント
if分岐、Object.prototype、返り値 [object Array]

//51P

```js
if(typeof Array.isArray === "undefined"){
 Array.isArray = function(arg){
  return Object.prototype.toString.call(arg) === "[object Array]";
 };
}

```
var arry4 =[{id:34343,name:'morita'},{id:89,name:'kenji'},{id:7827,name:'uro'},{id:2739,name:'kenji'}]
をid番号が若い順にソートしたオブジェクトを含む配列を出力してね

```js

var arry4 = [
  {id:34343,name:'morita'},
  {id:89,name:'kenji'},
  {id:7827,name:'uro'},
  {id:2739,name:'kenji'}
]
arry4.sort(function(a,b){
 if(a.id > b.id) return 1;
 if(a.id < b.id) return -1;
});
/*
[[object Object] {
  id: 89,
  name: "kenji"
}, [object Object] {
  id: 2739,
  name: "kenji"
}, [object Object] {
  id: 7827,
  name: "uro"
}, [object Object] {
  id: 34343,
  name: "morita"
}]
*/
```
fetchSomething1に代入されたpromise型を返す無名関数のresolve時とfall時の実装をthenメソッドでしてください。promiseのコールバック関数の中でdoAjaxStuffを実施。[参照](https://html5experts.jp/takazudo/17107/)

```js

```

next()を実行しただけ返り値が1増える関数を定義してね
P70

```js
var setUp = function(){
  var count = 0;
  return function(){
    return (count += 1);
  }
};
var next = setUp();
next();//1
next();//2
next();//3
```

class Fafaf {}を作成した際の内部の動きを教えてください。

```js

```

12/15
配列```myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"]```の1〜3番目の要素をそれぞれred,green,yellowに置き換えてください。また実行した際の返り値を教えてください

```js
var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];
myArray.splice(0,2,"green","red","yellow");//インデックス0から2つの要素を削除。
//返り値:["kkk1", "kkk2"]
//myArray:["green", "red", "yellow", "kkk3", "kkk4", "kkk5"]

```

```myArray= ["kkk1","kkk2","kkk3","kkk4","kkk5"];```
の2つ目〜4つ目の要素を取り出し配列とし出力しなさい。実行された後のMyarrayの要素を教えてください

```js
var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];
var fafa = myArray.slice(1,4);
console.log(fafa);//["kkk2", "kkk3","kkk4"]
//Myarrayは["kkk1","kkk2","kkk3","kkk4","kkk5"]で変わらず
```

```var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];```の全ての要素を```/```で結合した文字列の返り値を出力し、元の配列と同じ配列を表示してください

```js
var myArray =  ["kkk1","kkk2","kkk3","kkk4","kkk5"];
myArray.join("/").split("/");

```

```
var gArray =  ["おはよう","こんにちは","おやすみなさい"];
```
配列の要素がランダムに出力される関数を書いてください。(配列に要素が追加される事を仮定してたものにしてください)

```js
var gArray =  ["おはよう","こんにちは","おやすみなさい"];
var g = gArray[Math.floor(Math.random() * 3)];
g//おはよう or こんにちは or おやすみなさい
```


Objectオブジェクトで空のオブジェクトを作成し、値が42のプロパティpを持ちなさい

```js
var o = Object.create({}, { p: { value : 42 }})
o.p //42
```

オブジェクトWhoを作成し、初期化時に"morita"(String)を渡しnameプロパティに代入、インスタンス「o」のメソッドを使いWho.prototype.name値が返ってくるいわゆる「classのようなもの」を作成してください
※インスタンスメソッドはprototype継承で代入してください

```js
function Who(name){
 this.name = name;
};
Who.prototype.getName = function(){
 console.log('Myname is ' + this.name);
};
var o = new Who("morita");
o.getName()
```

浅いコピー(shallow copy)と深いコピー(deep copy)の違いを説明してください。

```js
//**shallow copy**
//プロパティ値や要素値だけのコピーでその先の参照まではコピーしない
//例
var arr = [{x : 2}];//オブジェクト参照をもつ配列
var arr2 = [].concat(arr);//要素をコピー
arr2[0].x = 123;//変数arr2から見える要素の参照先オブジェクトを変更。
arr[0].x//変数arrから変更が見える(shallowだから)
//123

//**deep copy**
//コピー元とコピー先が別のオブジェクトを参照していること。プロパティが別のオブジェクトを参照していれば参照崎のオブジェクトも含めてコピーします。deepcopyが必要な場面はない。自分で実装する必要がある。パーフェクトP199

```

var array = ["e","a","k","B","c"];
array.sort();
を実行した結果を答えてください

```js
["B", "a", "c", "e", "k"]

//note 順番は文字エンコーディングによって決まる
//要素に数値が会った場合文字列に置き換えられる

```
期待する大文字小文字区別なく順番通りにするようにしてください。
期待する結果
[a","B","c", "e", "k"]

```js
var array = ["e","a","k","B","c"];
array.sort(function(a,b){
 return a.toUpperCase() > b.toUpperCase() ? 1 : -1 ;
});

//["a", "B", "c", "e", "k"]

```

このような```[20,100,3,35,0]```
比較する配列の要素が数値の場合、「降順」にsortしてください
期待する結果
```[100, 35, 20, 3, 0]```

```js
var numArray = [20,100,3,35,0];
numArray.sort(function(a,b){
 return b - a;
});
[100, 35, 20, 3, 0]

//昇順の場合
return a - b
```



文字列```"10"```をNumber型にし、型判定し、数値かどうか評価後、文字列に変換してください

```js

var a = parseInt("10");
typeof a
isNaN(e);
a.toString();
//"10"

```

カーリー化されたadd(1)(2)もしくはadd(1,2)
を実行した際両方とも返り値3になる関数を定義しなさい。p85

```js
function add(x, y){
 if(typeof y == "undefined"){//部分適用
  return function(y){
    return x + y
  }
 }
 //完全適用
 return x + y
}
add(1)(2) //3
add(1,2) //3
```


クロージャーを使ったファクトリー関数。下記のような実行をしたら渡したname(ここではmorita)が表示されるメソッドintroduceを持つファクトリー関数を定義しなさい。

```js
var fafa = Factory("morita");
fafa.introduce()
"morita"
```
```js
function Factory(name){
 function getName(){
  return name;
 };
 return {
  introduce : function(){
    console.log(getName());
   }
 }
};
var fafa = Factory("morita");
fafa.introduce()
//morita
```

bind、call、apply

```js

```
関数```sayHi```に自分の名前を引数で渡した際に```hello!yourname```、何も渡さない場合```hello!```
と返す関数を作成し、それをapplyで実行してください。また
applyの第一引数にnullを渡す場合とオブジェクトを渡す場合のそれぞれのthisは何を指しますか答えてください
p83

```js
var sayHi = function(name){
 return "hello!" + (name ? name : "");
};
sayHi("kenji");
sayHi();
sayHi.apply(null,["kenji"]);//関数呼び出し
var greeting = {
  sayHi: function(name){
    return "hello!" + (name ? name : "");
  }
};
//メソッド呼び出し
greeting.sayHi.apply(greeting,["kenji"]);//渡す
greeting.sayHi.apply(greeting);//渡さない


//関数呼び出しの場合thisはwindowを指し、nullを渡す、
//メソッド呼び出しの場合thisはオブジェクトを指しオブジェクトの参照を渡す
```

ECMAScript5

```var obj = {x : 2, y: 3};```このobjをプロパティ追加不可、削除変更は可能にし、プロパティ追加不可か否かの判定メソッドでtrueが返る事を確認した後、objのkeyを列挙してください。

```js
var obj = {x : 2, y: 3};
Object.preventExtensions(obj);
Objcet.isExtensible(obj);//true
Object.key(obj);
//["x", "y"]
```

```var obj = {}```と等価をObjctメソッドで生成してください
  パーフェクトP148

```js
var obj = Object.create(Object.prototype);

```
```var obj = {x : 2, y: 3}```と等価をObjectメソッドで生成してください

```js
var obj = Object.create(Object.prototype, {
   x : {value: 2, writable: true, enumerable: true, configurable: true},
   y : {value: 3, writable: true, enumerable: true, configurable: true}
})

```

```var obj = { x : 2}```の属性を出力してください

```js
Object.getOwnPropertyDescriptor(obj, 'x');
// {
//  configurable: false,
//  enumerable: false,
//  value: 2,
//  writable: false
//.fseventsd/}
```

```var obj2 = {x : 2};```
にObjectメソッドを用いてプロパティ```y```、値```2```、```プロパティ追加可能```を定義して、Objectメソッドで情報(値と属性)を返してくださいP149

```js
var obj2 = {x : 2};
Object.defineProperty(obj2, 'y', {value: 3, enumerable: true});
//[object Object] {
//  x: 2,
//  y: 3
//}

Object.getOwnPropertyDescriptor(obj2, 'y')
// {
//  configurable: false,
//  enumerable: true,
//  value: 3,
//  writable: false
//}
```

実引数の数を出力、第一引数を出力する関数fを実行してください

```js
function f(){
 console.log(arguments.length)
 console.log(arguments[0])
}
f(2)
//1
//2

```
```var arr = ["2","23","0","16"];```
を小さい順にソードしてください。
その後ソートをできないようにread-onlyにしてください

```js
var arr = ["2","23","0","16"];
arr.sort(function(a,b){ return a - b ;});
//["0", "2", "16", "23"]
Object.freeze(arr);
//["0", "2", "16", "23"]
arr.sort();
//.fseventsd/"Cannot assign to read only property '1' of [object Array]"
```

```var arr = [3,4,5];```をconcat以外で```arr2```にコピーしてください。
その後```arr2[0] = 123```を代入すると```arr```は何を出力するか答えなさい

```js

var arr = [3,4,5];
var arr2 = arr.slice(0, arr.length);
arr2
//[3, 4, 5]
arr2[0] = 123;
arr
//[3, 4, 5]//変数arrから変更は見えない(要素をコピーしているから)
arr2
//[123, 4, 5]
```
JSON文字列```{"x" : 1, "y": 2}```
をオブジェクトに変換してJSON文字列に変換してください。またなぜ下記の2つはエラーになるか答えてください。

```js
var s = JSON.parse("'foo'");
var arr = JSON.parse("{x : 1}");
```

```js
var s = '{"x" : 1, "y": 2}';
var obj = JSON.parse(s);
JSON.stringify(obj);
//"{\"x\":1,\"y\":2}"
//**下記はなぜエラーになるか**
var s = JSON.parse("'foo'");
//シングルクォーテーションの文字列はエラー-
var arr = JSON.parse("{x : 1}");
//プロパティ名が文字列でないとエラー

```
strict modeの代表的な制約を9つ挙げなさい
P222 パーフェクト

```
- 暗黙のグローバル変数の禁止
- 関数内でthis参照がグローバルオブジェクトを参照しない
- NaN、Infinity、undefinedのグローバル変数を読み込み専用
- 同名のプロパティ名を禁止
- 同名の仮引数名を禁止
- arguments.calleeアクセスの禁止
- Functionオブジェクトのcallerプロパティのアクセス禁止
- with文の禁止
- evalが新しいシンボルを作らない

```

for in文に関する注意点を3つ挙げてください
p89 パーフェクト

```
- プロパティを列挙する順序がオブジェクトリテラルと配列リテラルで違う
- 列挙できないプロパティがある(Array.lengthなど)
- プロトタイプ継承したプロパティも列挙するところ
```
これは2秒後に```"hello!kenji!"```とconsole.logに出力されることを期待していますが動きません。正しく修正してください。なぜそうなるか理由もください。

```js

var Person = function (name) {
    this.name = name;
}
Person.prototype.sayHello = function() {
    console.log('hello!' + this.name + '!');
}

var morita = new Person('kenji');
morita.sayHello()

```

配列```var arr = ['f','o', 'x', 'k'];```
を要素順に出力させなさい

```js
var arr = ['f','o', 'x', 'k'];
for(var letter of arr){
 console.log(letter)
}

```
またイテレーターを使い順番にす出力しなさい

```js
var arr = ["f", "o", "x", "k"];
var eArr = arr[Symbol.iterator]();
eArr.next().value //f
eArr.next().value //o
eArr.next().value //x
eArr.next().value //k

```

配列```["angel", "clown", "drum", "mandarin", "surgeon"]```
のインデックス2に"morita"という要素を加えなさい。```["angel", "clown", "morita", "drum", "mandarin", "surgeon"]```

```js
var myFish = ["angel", "clown", "drum", "mandarin", "surgeon"];
myFish.splice(2, 0 , "morita");
myFish//["angel", "clown", "morita", "drum", "mandarin", "surgeon"]
```

これ```var o = {};```と同じ意味を持つコードをObjectを使って生成しなさい


```js
var o = Object.create(Object.prototype);
```

{p: 42}となるようなオブジェクトをObjectメンバを使って生成しなさい

```js
o = Object.create({}, {p: {value : 42}});
```

```1234```という数字を文字列に変更後、1文字ずつ配列の要素として取り出しなさい

```js
var count = 1234;
var ee = count.toString();
var arr = [];
for(var i = 0; i < ee.length; i++){
 arr[i] = ee.charAt(i);
}
console.log(arr)//["1","2","3","4"];

```

## lodash.js

0~9までの要素を持つ配列を返しなさい

```js
_.range(10);
//[0,1,2,3,4,5,6,7,8,9]

```
[こちら](http://jsbin.com/wacumupuqo/1/edit?js,console,output)を実行するとundefinedが返ってきます。nameが返るように修正してください。またそうなる理由を述べてください

理由thisの実行コンテキストがPersonを差していないから。
[答え1](http://jsbin.com/gikakeyepu/1/edit?js,console,output)

```js
var Speaker = {
 say : function(wordsGetter){
  var words = wordsGetter();
   alert(words);
 }
};
function Person(nickname){
 this.nickname = nickname;
}

Person.prototype.sayName = function(){
    self = this;
    Speaker.say(function(){
      return self.nickname;
    });
};
var person = new Person('moriken');

person.sayName();
```

[答え2](http://jsbin.com/wacumupuqo/edit?js,console,output)

```js
var Speaker = {
 say : function(wordsGetter){
  var words = wordsGetter();
   alert(words);
 }
};
function Person(nickname){
 this.nickname = nickname;
}

Person.prototype.sayName = function(){
    Speaker.say(function(){
      return this.nickname;
    }.bind(this));
};
var person = new Person('moriken');

person.sayName();

```
こちらの関数のaを2としてbindした後に
```
var mul = function(a,  b) {
     alert(a * b);
};
```

下記のような配列内にある連想配列のkey、mail値を配列に格納して返せ

```
array = [
{name: "kenji", mail:"fafa@eee.com"},
{name: "morita", mail: "kkk@faf.com"}
]
```
答え

```js

array = [
{name: "kenji", mail:"fafa@eee.com"},
{name: "morita", mail: "kkk@faf.com"}
];
var array2 = [];
array.forEach(function(Element, ind, array){
   for(var key in Element){
    if(key == "mail"){

  array2.push(Element[key])
  }
 }
})
console.log(array2);
```

配列```var passed = [12, 5, 8, 130, 44]```
の要素全てが10以上かどうかを評価してtrueかfalseを返しなさい。また10以上のものが一つでもあった場合trueを返しなさい。

```js

function isBigEnough(ele, ind, arry){
 return (ele >= 10);
};
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
passed //false

```

二次元配列
```
[["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
```

の"two"の値を取得してください

```js

var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
var map = new Map(fafa);
map.get("two");
//"send@fafa"

```

先の変数fafaにインデックス3番目の要素として["four",fafa@eee]の配列を追加しなさい

```js
var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
map.set("four", "fafa@eee");

```

<!-- 変数fafaに内にある要素を全て取得しなさい

```js
var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]];
var entries = map.entries();
for (var entry of entries){
 console.log(entry);
} -->

## 正規表現

文字列
```"morita kenji"```をRegExpオブジェクトを使って配列["morita kenji"]が返るようにしてください。(空白スペースにマッチする正規表現を使うこととする)

```js

//正解例
/\w+\s\w+/.exec("morita kenji")

```
下のようなstrとstr2がある。
```var str = "It is an important problem";```

```var str2 = "The import duty is not cheap";```
str,str2の正規表現を使い、```import```英単単語にマッチした際にそれぞれfalse,trueを返す記述をしくださいてださい

参照(正規表現書き方ドリル/技術評論社)

```js

var str = "It is an important problem";
var str2 = "The import duty is not cheap";
var ii = /.*\bimport\b.*/.test(str);//false
var ii = /.*\bimport\b.*/.test(str2);//true

```

ひらがな全てにマッチ、半角カタカナ全てにマッチ、カタカナ全てにマッチする正規表現を記述しなさい

```js
//ひらがな
[ぁ-ん]
//カタカナ
[ァ-ヶ]
//半角カタカナ
[ｦ-゜]

```

「ヤッホー」の後に続く1文字が英単語を構成する文字以外の文字列が1回以上繰り返される場合にマッチする正規表現を記述しなさい
(正規表現書き方ドリル/技術評論社)

```js

```

```x = new Boolean(false)```。if文の式として渡すと実行されるか答えなさい

[参照](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

```js

x = new Boolean(false);
if (x) {
 //実行される
}
//undefinedやnull以外のオブジェクトは実行されます
```
以下のコードは何をtrueかfalseか
```
myFalse = new Boolean(false);
g = new Boolean(myFalse);
```

```js
myFalse = new Boolean(false);
g = new Boolean(myFalse);
g//true

//Boolean オブジェクトの初期値としてオブジェクトを指定した場合、それが値が false の Boolean オブジェクトであっても、新しい Boolean オブジェクトは true の値を持ちます
```


```
undefined == null
```
の真偽値は何か

```js

if (undefined == null){
  //run
}
//実行されます
```
なんでもいいのでクロージャーを作りなさい

```js
var ii = function(){
  var pp = "oo";
  return function(value){
    console.log(pp + value);
  }
}
var kk = ii();
kk("jj");
//oojj

```

今の時間、何時何分何秒を表しなさい

```js
var now = new Date();
var nowtime = "今" + now.getHours() + "時" +  now.getMinutes() + "分" + now.getSeconds() + "秒";
nowtime
//"今23時49分56秒"

```

年月日曜日
```js

```

```

セッション


```js

```

cookeiee
```js

```

userAgent


```js

```

要素の位置情報

```js

```

正規表現


```js

```


```js

```


```js

```


```js

```


```js

```



ES6

もじれつ```foo```をイテレーターを使った反復処理で配列```["f","o","o"]```を出力しなさい。
こちらでやるとさくっと試せるよ
[http://jsbin.com/?js,console](http://jsbin.com/?js,console)


```js
//ES6,Babel

var chars = [];
for (let n of "foo"){
 chars.push(n);
}
console.log(chars);//["f","o","o"]

```

IteratableからIteratorを取得、要素を出力していきして「要素がもうない意」の```{value: undefined, done: true}```を出力しなさい

```js

var arr = ["ooo", "eee"];

var Iterator = arr[Symbol.iterator]();
console.log(Iterator.next()); // { done: false, value: "ooo"}
console.log(Iterator.next()); // { done: false, value: "eee" }
console.log(Iterator.next()); //{ done: true, value: undefined }

```
文字列"foo"を```["f","o","o"]```と出力してください

```js
//スプレッドオペレータ
var arr = [..."foo"];
console.log(arr);
```

文字列```morita```の1文字目```m```を変数```index0```に代入、2文字目```o```を```index1```に代入、残りを配列```rest```の各要素として出力してください

```js
//分割代入
var [index0, index1, ...rest] = "morita";
console.log(index0,index1, rest);
//"m"
//"o"
//["r", "i", "t", "a"]

```

```add()```を実行した際```3```、add(2)としたら```4```add(2,3)を実行したら5が帰ってくる関数addを定義してください

```js
//デフォルトパラメータ
function add(a = 1, b = 2){
 return a + b;
}
add();// 3
add(2);//4
add(2,3)//5


```

```foo(1, 2, 3, 4, 5, 6)```

を実行したら1がfirst、2がsecond、残りが配列の要素になるような ```foo```
を定義しなさい


```js
//レストパラメータ

function foo(first, second, ...rest){
 console.log("first", first);
 console.log("second", second);
 console.log("rest", rest);
}

foo(1,2,3,4,5,6);

```


配列```arr = [1, 2, 3]```
にArray#concatを使わずに
```arr2 = [4, 5, 6]```を結合させ```[1, 2, 3, 4, 5, 6]```となるようにしてください

```js

//スプレッドオペレータ

var arr2 = [4, 5, 6];
var arr = [1, 2, 3, ...arr2];
console.log(arr);//[1, 2, 3, 4, 5, 6]


```
あるファイル(module.js)で記述した```var foo = "foo"```、```function bar(){}```、```class Baz{
  baz(){}
}```を別のファイル(import.js)にexport、個別のメンバとして読み込む記述を示しなさい。また「module」という別名で全てのメンバを取得する記述も示しなさい
※module.jsとimport.jsは同階層にあるものとする

```js
//読み込まれる側
var foo = "foo";
function bar(){};
class Baz{
  baz(){}
}
export {foo, bar, Baz};

//読み込む側
//メンバ毎にインポート
import {foo, bar, Baz} from "./module";
//console.log(foo);
//bar();
//new Baz();

//インポートする変数名の指定
import {foo as poo} from "./module";
console.log(poo)

//モジュールまとめてインポート
import * as from "./module";
//console.log(module.foo)

```

```var obj = {foo: foo, bar: bar}```
オブジェクトのkeyとvalueが等しい場合の記述せよ

```js
var obj = {foo: foo, bar: bar};
var obj = {foo, bar};


```



コンピューテッドプロパティ

```js
var key = "foo";

//es5
var obj = {};
obj[key] = 0;
obj[key + "_bar"] = 1;

//es6
var obj = {
  [key] : 0,
  [key + "_bar"] : 1
}

//common
console.log(obj.foo, obj.foo_bar);
//0, 1

```

```
function ff(){
  return "kenji";
}
```
このような関数をconsole.log内からテンプレートリテラルを使って出力してください

期待する出力

```
my name is kenji
```

[参照](https://gist.github.com/kuu/b7eb679a3ad48d980ed3)

```js
function ff(){
  return "kenji";
}

console.log(`my name is ${ff()}`);
//my name is kenji
```

Destructuring assignment

変数a,bにそれぞれ1,2を代入してください

```

let [a, b] = [1, 2];

```


文字列 ```line1```と```line2```を改行てconsole.log出力しなさい

```js
console.log(`line1
line2
`);

```

Tagged template strings


```js
var long = '30px';
var weight = '40px';

function tag(strings, ...values){
  //console.log(strings);["身長","で、体重は","です"]
  return `m:${values[0]}、p:${values[1]}`; };

var str1 = tag`身長${long}で、体重は${weight}です`; console.log(str1);
```


```

ユーザー定義関数funを作り、実行時の引数として、オブジェクトkeyにa,b。値をそれぞれ1,4として加算して返してください
```js
function fun({a, b}){
  return a + b;
}
fun({a: 1, b: 4});//5

```

```var aa = [["morita", "kenji", "keiko"],["morita", "kenji", "keiko"]```

全てのaaにある多次元配列の全ての要素に文字列"san"を付け加えて一つの配列として出力してください

```js

```

mapとforEachの違いは何か

```
The main difference between the two methods is conceptual and stylistic: You use forEach when you want to do something to or with each element of an array (doing "with" is what the post you cite meant by "side-effects", I think), whereas you use map when you want to copy and transform each element of an array (without changing the original).
```

[http://stackoverflow.com/questions/3034392/what-use-does-the-javascript-foreach-method-have-that-map-cant-do](http://stackoverflow.com/questions/3034392/what-use-does-the-javascript-foreach-method-have-that-map-cant-do)


```js

//map
//新しいarrayを返す

var a = [{ val: 1 }, { val: 2 }, { val: 3 }];
var uu = a.map(function(el) {
    el.val++;
    return el.val
});
a//[{ val: 2 }, { val: 3 }, { val: 4 }]
uu//[2, 3, 4]

//forEach
var a = [{ val: 1 }, { val: 2 }, { val: 3 }];
a.forEach(function(el) {
    el.val++;
    console.log(el.val);
});
//2
//3
//4

//実行するだけ
//forEachならこんなことも

//forEachが配列の要素を編集して配列で返すには
//
var a = [1,2,3],
    b = [];
a.forEach(function(el) {
    b.push(el+1);
});

// b is now [2,3,4], a is unchanged [1, 2, 3]

var a = [1, 2, 3];
var b = a.map(function(elem){
  return  elem + 1;
});
b// [2, 3, 4]
a// [1, 2, 3]


//メソッドを実行
cats.forEach(function(cat) {
    cat.meow(); // nicer than cats[x].meow()
});


var oo = [2,3,4,5,6];
var aa = oo.map(function(x){
    return x + 1;
});
aa //[3, 4, 5, 6, 7]

//forEach
それぞれの配列の要素に対して何かしたいとき
var oo = [2,3,4,5,6];
var aa = oo.forEach(function(x){
    return x + 1;
});
aa// undefined

//forEachは元の配列を変更できる

//map
元の配列を変更せず変換やcopyをしたいとき

```

配列
```[{name: "kenji"},{name: "morita"}]```の要素のvalueを次のように書き出しなさい
(文字列"san"を付けています)
e.g
``` ["kenjisan", "moritasan"]```

```js

var aa = [{name: "kenji"},{name: "morita"}];
var result = aa.map(function(ele, i){
   return ele.name + "san";
});
result//["kenjisan", "moritasan"]

```

同じ事をforEachでしてください

```js
var aa = [{name: "kenji"},{name: "morita"}];
var arry = [];
aa.forEach(function(ele, i){
      for (var key in ele){
           arry.push(ele[key] + "san")
      }
});
arry//["kenjisan", "moritasan"]
```

Objects

object-shorthandを使って書き換えてください

```js
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};

```js

//ok
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```






こちらのobjをkey内でメソッド呼び出しされているのをコンピューティッドプロパティを使って書き換えてください

```js
function getKey(k) {
  return `a key named ${k}`;
}

const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

//ok
function getKey(k) {
  return `a key named ${k}`;
}
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
下記のようなURLのファイルパスごとに配列に格納してください
```https://github.com/kenmori/Angular2_TypeScript/tree/master/angular2-quickstart```
p347 ぱーふぇくとjavascript


```js
var filepath = location.pathname.substring(1).split('/');
filepath;

//["kenmori", "Angular2_TypeScript", "tree", "master", "angular2-quickstart"]

```


下記のようなobj内のkeyと値が一緒の際できるshorthandで記述してください

```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};


//ok
const obj = {
  lukeSkywalker,
};


```

cacheマニフェスト


```

spread Array

下記のようなある配列itemsの要素をコピーしている記述をspreadArrayを使って簡潔に記述してください

```js
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}



const itemCopy = [...items];

```


windowオブジェクトを7つ答えてください

navigator
location
history
screen
frames
document
parent, top, self


Destructuring

下のようにuserというnameとidをプロパティで持ったオブジェクトを再割り当てやマルチプルなobjectを扱う際に簡潔な書き方にしてください

```js
function add (user){
  const name = user.name;
  const id = user.id;
  return `${name} ${id}`;
}

```
答え

```js
//ベター
function add (user) {
  const { name, id } = user;
  return `${name} ${id}`;
}

//best
function add ({name, id}){
  return `${name} ${id}`;
}

```

```var aaa = [["oo","oo1"], ["ll","ll2"]];```
このような
多次元配列のインデックス0番目だけを出力しなさい

```js

var aaa = [["oo","oo1"], ["ll","ll2"]];
aaa.forEach(function(ee){
  ee.filter(function(eee, i){
  if(i == 0){
      console.log(eee);
    }
  });
});
//oo ll
```

Array destructuringとして簡潔に記述しなさい


シャローコピーとディープコピーの違いを教えてください。また
```var aa = ["oo", "ll"];```
aaをbbにシャローコピーしてbb[0]に任意の文字列を代入し、aa[0]の参照する値が変わらないことを確認してください


```js
//concat
var aa = ["oo", "ll"];
var arry = [];
var bb = arry.concat(aa);//shallow copy
bb[0] = "kk";
aa//["oo", "ll"]
bb//["kk", "ll"]

//slice
var aa = ["oo", "ll"];
var bb = aa.slice(0, aa.length);
bb[0] = "kk";
aa//["oo", "ll"]
bb//["kk", "ll"]

//bad
//spliceは破壊的メソッド(元参照を変える)
var aa = ["oo", "ll"];
var bb = aa.splice(0, aa.length);
bb//["oo", "ll"]
aa//[]




```

```var aa = ["oo", "ll"];```
をbbにコピーしてaaは["kk", "jj"];
が挿入されるようにしなさい。期待する結果
bb//["oo", "ll"];
aa//["kk", "jj"];

```js
var aa = ["oo", "ll"];
var bb = aa.splice(0, aa.length, ["kk","jj"])
bb//["oo", "ll"];
aa//["kk", "jj"];


```

このような配列
```var aa = ["ii", "jj", "kk"];```
がある。
"jj"要素を削除するために
deleteを使った場合とspliceを使った場合の違いは何か。それがわかるコードを書いてください

```js

deleteは削除されたインデックスを残す。spliseは間を詰める。
var aa = ["ii", "jj", "kk"];
delete aa[1];
aa//["ii", undefined, "kk"]
var aa = ["ii", "jj", "kk"];
aa.splice(1,1);
aa//["ii", "kk"]

```js


```

```var text = "key and value";```

このような文字列を単語毎に配列の要素として格納してください
//期待する結果
//["key","and","value"]


```js
var text = "key and value";
var arraytext = ii.match(/\w+/g);
arraytext
["text", "and", "value"]


```


```var text = 'abc def ghi jkl';```
の空白の直前の文字をグループ化してカンマ文字の後ろに移動させなさい。
期待する文字列
"ab,cde,fgh,ijkl"

```js


var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,',$1');
"ab,cde,fgh,ijkl"

//or

var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,function(m0, m1){
   return "," + m1
});
"ab,cde,fgh,ijkl"

```

```
var array = ["aa","bb","cc","dd","ff"];
```
このような配列の要素"bb"の前に"ff"を移動させて

```
["aa","ff","bb","cc","dd"]
```
このような配列を完成させてください

```js
array.splice(1,0,array.splice(4,1)[0])
//array
//["aa","ff","bb","cc","dd"]

```

nullの比較についてそれぞれtureかfalseか答えてください

```js
null < 1
null > 1
null < -1
null > -1

null < 0
null <= 0
null >= 0
null > 0
null == 0
null === 0

//Anserw
null < 1 //ture
null > 1 //false
null < -1 //false
null > -1 //true
//数値コンテキストではnullは0と解釈されるため、1より小さく、-1より大きい。
null < 0 //false
null <= 0 //true
null >= 0 //true
null > 0 //false
null == 0 //false
null === 0 //false
//0以下であるが0より小さくはない。
//0以上であっても0より大きくはない。
```
こちらの2つのif分の条件式の違いを教えてください

```js
if('a' in obj)
if(obj.a)
```

**in演算子の場合**
objにキーaが存在する場合(undefinedでも)trueを返す
if('a' in obj)は実行される

**obj.aの場合**
undefinedの場合falseを返す
if(obj.a)が存在しても未定義だと実行されない


```var arr = [ 10, 20 ];```
においてarr[2]が存在しないことを確認してください

```js
2 in arry;
```

文字列

```var string = "-9";```
を数値に変換してください

```js
string - 0
//-9
```

sliceとsubstringの違いを教えてください

```js
//引数に-を与えた際に違いが出ます

var str = "あいうえお";
str.length
str.slice(0,-2)
//"あいう"
//0からインデックス最後の文字を-1とし後ろから数える

var str = "あいうえお";
str.substring(0, -2);
//""
//負の数字は0とみなす。
//0から0を取得するので空文字を返す

//sliceは開始位置が終了位置以上だと空文字を返す
```

```js
var str = "あいうえお";
str.slice(1,1)
//""

//「い」を取得したい場合
var str = "あいうえお";
str.slice(1,2)
"い"

//substringの場合
//開始位置が終了位置より大きいと交換されて解釈される

var str = "あいうえお";
str.substring(1,-3);
//substring(-3,1)と解釈され負の数は0と見なされ
//substring(0,1)と同等の処理をする

//"あ"
```

次のような文字列```abcdefg```のcとeそれぞれを大文字にしてください

```js
var str = "abcdefg";
var replaced = str.replace(/[ce]/g,function(str){
 return str.toUpperCase();
});
//replaced "abCdEfg"
```

次のような文字列をvar str = "こんにちは";
var name = "もりたさん";
連結し"いい天気ですね"を付け足した新しい文字列を生成してください

期待する結果

```
"こんにちはもりたさんいい天気ですね"```

連結してもstrは元の文字列のママなことを確認
str
//こんにちは

```js
var str = "こんにちは";
var name = "もりたさん";
var newstr = str.concat(name, "いい天気ですね");
newstr
"こんにちはもりたさんいい天気ですね"

str //こんにちは

//String.concatのパフォーマンスについて
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/concat
```


引数targetがnullかundefinedのときのみの判定をしてください

```js

target == null

```

こちら
```
var value = 0;
var target  = value || 10
target
//10
```
はvalueが0の時falseになり10が返る。0の際も代入されるようにしてください

```js

var value = 0;
var target = (value !== undefined) ? value : 10;
value
//0
```

配列arrayが空ならfalseが返るようにしてください

```js

var array = [];
array.length !== 0
//false

```

下のような
var obj = {};
obj ? true : false;
の場合falseが返るようにしてください

```js
var obj = {};
Object.keys(obj).length != 0 ? true : false;
//false

```


forでループさせるのとforEachで処理する際の違いを教えてください

```js
//forは構文
//returnで返り値を返し、その関数処理を終える

//forEachはメソッド。受け取った関数を全ての要素に処理するまで終えない。returnしても次の要素に処理が移るのみ

//配列のどれか一つが条件を満たす評価をしたい場合Array.someがある
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough);
// passed は false
passed = [12, 5, 8, 1, 4].some(isBigEnough);
// passed は true

[参照](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```

この

```
const arry = ['a','b','c'];
```
の列挙可能なプロパティと不可能なプロパティを出力してください
期待する結果
```
["0","1","2","length"]
```

```js
const arr = ['a','b','c'];
console.log(Object.getOwnPropertyNames(arr));
//["0","1","2","length"]
```


オブジェクトoに対してaという値が'morita'、列挙可能、削除可能、書き換え可能なプロパティを作成してください

[参照](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
let o = {};
Object.definedProperty(o,"a",{
  value: 'morita',
  writable: true,
  configurable: true,
  enumerable: true,
});
```


下記のようなthisへの参照をsaveせずに書き換えなさい

```js

```


下のlib/math.jsに入っている1と2を別のファイルで使えるようにして
受け取る方app.jsも記述しなさい
```js
//lib/math.js
//1
function sum(x, y) {
  return x + y;
}
//2
var pi = 3.141593;
```


```js
//lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;

//app.js
import * as math from 'lib/math';
import {sum, pi} from 'lib/math';
//e.g.
math.sum(x, y){
    console.log(math.pi);
    return x + y;
}
sum(1, 3)

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```




```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```

```js

```


```js

```


```js

```




```js

```



```js

```




```js

```




```js

```




```js

```




```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```




```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```



```js

```
