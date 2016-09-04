<h3>【JavaScript】JavaScript中級者の為の練習問題集256問(脱初心者した方へ)2016/09/03更新</h3>
[caption id="attachment_11770" align="alignnone" width="474"]<a href="http://kenjimorita.jp/wp-content/uploads/2016/09/image.jpeg"><img class="size-large wp-image-11770" src="http://kenjimorita.jp/wp-content/uploads/2016/09/image-1024x767.jpeg" alt="【JavaScript】JavaScript中級者の為の練習問題集256問(脱初心者した方へ)2016/09/01更新" width="474" height="355" /></a> 【JavaScript】JavaScript中級者の為の練習問題集256問(脱初心者した方へ)2016/09/01更新[/caption]

もともと私自身が「もうちょっとJavaScirpt使いこなしたい。

もうちょっとレベルあげたい。

後で本当に自分のものになったかテストしよう」という想いから半年以上書きためた練習問題。

【JavaScript】JavaScript中級者の為の練習問題集256問(脱初心者した方へ)2016/09/03更新です。

順次更新していきます。
<a href="https://github.com/kenmori/javascript/blob/master/README.md" target="_blank">こちら</a>リプレイスして見やすくしました。
現在のページより上のリンク先をご覧になることを強くおすすめします。
(問題数が多い、見やすい、ここの問題文をわかりやすく改善、修正されている。のがその理由です)
<!--more-->

問題にはECMAScript2015のメソッドもあります。
まだブラウザによっては未実装のメソッドがありますので
<a href="https://www.google.co.jp/chrome/browser/canary.html">chrome canary</a>のコンソールでお試しになるか
babelでトランスパイルができる環境<a href="http://jsbin.com/?js,console,output">jsbin</a>で設定して臨むのがおすすめです。

<span style="color: #2e2e2e;">※これを作るにあたり参照した多くの書籍やドキュメントがありました。ありがとうございました</span>

古い記事の一部。135問。

みなさまのJS力が今よりほんの少し上がれば幸いです
<h4>問1</h4>
var afa = {a: 'a'}とvar ee = {b: 'b'}をmergeしたmを出力してください
e.g{a:'a',b:'b'}
<h4>A</h4>
[code language="javascript"]
var afa = {a: 'a'};
var ee = {b:'b'};
var m = Object.assign(afa, ee);
m //{a: "a", b: "b"}
[/code]

<hr />

<h4>問2</h4>
var uu = ['oo','pp','ll','jj','hh','kk','mm'];
の要素jj,hh,kkを要素、型を配列で返す記述をしてください
<h4>A</h4>
[code language="javascript"]var yy = uu.slice(-4,-1);
//or
var yy = uu.slice(3,-1);[/code]

<hr />

<h4>問3</h4>
var arry = ['eee','ccc’]の各要素を順番に出力してください e.g //'eee'//'ccc'
<h4>A</h4>
[code language="javascript"]var arry = ['aa','ccc'];
arry.map(function(ele,i){
console.log(ele);
})
//'eee'
//'ccc'
※いろいろな方法があります[/code]

<hr />

<h4>問4</h4>
var arry = [‘eee’, ‘ccc’]を要素にindexを足した文字列を出力してください e.g “eee0”と“ccc1"
<h4>A</h4>
[code language="javascript"]var arry = ['aa','ccc'];
arry.forEach(function(key,i){
console.log(key + i)
})
//"aa0"
//"ccc1"[/code]

<hr />

<h4>問5</h4>
var ee = [1,2]は配列かどうか評価したbloolean値(true)ください
e.g true
<h4>A</h4>
[code language="javascript"]Array.isArray(ee) //true//ee instanceof Array //true
//instanceof比較は継承しているオブジェクトのインスタンス比較なので
// ee instanceof Objectでもtrueが返ってく る[/code]

<hr />

<h4>問7</h4>
ee(2,4,5)を実行したら引数が全て配列で返る関数eeを定義しなさい
<h4>A</h4>
[code language="javascript"]function ee(){
return Array.from(arguments)
}
var i = ee(2,4,5);
i
//[2,4,5]
//配列という確認
i instanceof Array //true[/code]

<hr />

<h4>問8</h4>
下記

var obj2 = {
key: "eee",
key2:"ccc"
};

の中のkeyとvalueを全て出力しなさい
<h4>A</h4>
[code language="javascript"]var obj2 = {
key: "eee",
key2:"ccc"
};
for( key in obj2){
console.log(key);
console.log(obj2[key])
}[/code]

<hr />

<h4>問9</h4>
var array3 = ["fafa","eee","ccc"]配列の中の全ての要素を結合し、1つの文字列として出力してください。

もしfor文の場合但し、array3.lengthはif文の外でcountとして定義すること


<h4>A</h4>
[code language="javascript"]
var array3 = ['fafa','eee','ccc'];//1
array3.join("")//2
var ee = "";
var count = array3.length;
for(var i= 0; i < count; i++){ ee += array3[i]; } ee
//"fafaeeeccc"[/code]

<hr />

<h4>問10</h4>
Array.isArrayが実行できない環境を想定してvar ee = [1,2]が配列であることを検査できる拡張された関数を定義してください

ヒント if分岐、Object.prototype、返り値 [object Array]
<h4>A</h4>
[code language="javascript"]//if(typeof Array.isArray === "undefined"){
Array.isArray = function(arg){
return Object.prototype.toString.call(arg) === "[object Array]";
};
}

[/code]

<hr />

<h4>問11</h4>
var arry4 =[
{id:34343,name:'morita'},
{id:89,name:'kenji'},
{id:7827,name:'uro'},
{id:2739,name:'kenji'}
] をid番号が若い順にソートしたオブジェクトを含む配列を出力してください
<h4>A</h4>
[code language="javascript"]

var arry4 = [ {id:34343,name:'morita'}, {id:89,name:'kenji'}, {id:7827,name:'uro'}, {id:2739,name:'kenji'} ]arry4.sort(function(a,b){

if(a.id > b.id) return 1;
if(a.id < b.id) return -1;

});

[
{id: 89, name: "kenji" }, 
{ id: 2739, name: "kenji" }
{ id: 7827, name: "uro" },
{ id: 34343, name: "morita" }
]

[/code]

<hr />

<h4>問12</h4>
fetchSomething1に代入されたpromise型を返す無名関数のresolve時とfall時の実装をthenメソッドでしてください。

promiseのコールバック関数の中でdoAjaxStuffを実施。
<h4>A</h4>
[code language="javascript"]

[参照](https://html5experts.jp/takazudo/17107/) WIP

[/code]

<hr />

<h4>問13</h4>
next()を実行しただけ返り値が1増える関数を定義してください
<h4>A</h4>
[code language="javascript"]var setUp = function(){
var count = 0;
return function(){
return (count += 1);
}
};
var next = setUp();
next();//1

next();//2

next();//3
[/code]

<h4>問15</h4>
配列myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"]の 1〜3番目の要素をそれぞれred,green,yellowに置き換えてください。

また実行した際の返り値を教えてください
<h4>A</h4>
[code language="javascript"]
var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];
myArray.splice(0,2,"green","red","yellow");

//インデックス0から2つの要素を削除。

//返り値:["kkk1", "kkk2"]

//myArray:["green", "red", "yellow", "kkk3", "kkk4", "kkk5"]
[/code]
<hr />

<h4>問16</h4>
myArray= ["kkk1","kkk2","kkk3","kkk4","kkk5"]; の2つ目〜4つ目の要素を取り出し配列とし出力しなさい。

実行された後のMyarrayの要素を教えてください
<h4>A</h4>
[code language="javascript"]var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];
var fafa = myArray.slice(1,4);

console.log(fafa);//["kkk2", "kkk3","kkk4"]

//Myarrayは["kkk1","kkk2","kkk3","kkk4","kkk5"]で変わらず
[/code]
<hr />

<h4>問17</h4>
var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"];の全ての要素を/で結合した文字列の返り値を出力し、

元の配列と同じ配列を表示してください
<h4>A</h4>
[code language="javascript"]
var myArray = ["kkk1","kkk2","kkk3","kkk4","kkk5"]; myArray.join("/").split("/");
[/code]
<hr />

<h4>問18</h4>
配列var gArray = ["おはよう","こんにちは","おやすみなさい"];の要素がランダムに出力される関数を書いてください。

(配列に要素が追加される事を仮定してたものにしてください)
<h4>A</h4>
[code language="javascript"]
var gArray = ["おはよう","こんにちは","おやすみなさい"];
var g = gArray[Math.floor(Math.random() * 3)];

g//おはよう or こんにちは or おやすみなさい
[/code]
<hr />

<h4>問19</h4>
オブジェクトを作成し、
値が42のプロパティpを持ちなさい
<h4>A</h4>
[code language="javascript"]

var o = Object.create({}, { p: { value : 42 }}) o.p //42

[/code]

<hr />

<h4>問20</h4>
オブジェクトWhoを作成し、初期化時に"morita"(String)を渡しnameプロパティに代入、 インスタンス「o」のメソッドを使いWho.prototype.name値が返ってくるいわゆる「classのようなもの」を作成してください

※インスタンスメソッドはprototype継承で代入してください
<h4>A</h4>
[code language="javascript"]function Who(name){ this.name = name; };
Who.prototype.getName = function(){ console.log('Myname is ' + this.name); };

var o = new Who("morita"); o.getName()
[/code]
<hr />

<h4>問21</h4>
浅いコピー(shallow copy)と深いコピー(deep copy)の違いを説明してください。
<h4>A</h4>
[code language="javascript"]
//**shallow copy** //プロパティ値や要素値だけのコピーでその先の参照まではコピーしない
//例 var arr = [{x : 2}];

//オブジェクト参照をもつ配列

var arr2 = [].concat(arr);//要素をコピー arr2[0].x = 123;//変数arr2から見える要素の参照先オブジェクトを変更。

arr[0].x//変数arrから変更が見える(shallowだから) //123 //

**deep copy**

//コピー元とコピー先が別のオブジェクトを参照していること。 プロパティが別のオブジェクトを 参照していれば参照崎のオブジェクトも含めてコピーします。

deepcopyが必要な場面はない。自分で実装する必要がある。
[/code]
<hr />

<h4>問21</h4>
下記 var array = ["e","a","k","B","c"]; array.sort(); を実行した結果を答えてください
<h4>A</h4>
[code language="javascript"]
["B", "a", "c", "e", "k"] //note 順番は文字エンコーディングによって決まる
//要素に数値が会った場合文字列に置き換えられる
[/code]

<hr />

<h4>問22</h4>
期待する大文字小文字区別なく順番通りにするようにしてください。 期待する結果 [a","B","c", "e", "k"]
<h4>A</h4>
[code language="javascript"]
var array = ["e","a","k","B","c"];
array.sort(function(a,b){ return a.toUpperCase() > b.toUpperCase() ? 1 : -1 ;});

//["a", "B", "c", "e", "k"]
[/code]
<hr />

<h4>問23</h4>
このような[20,100,3,35,0]
比較する配列の要素が数値の場合、「降順」にsortしてください

期待する結果

[100, 35, 20, 3, 0]
<h4>A</h4>
[code language="javascript"]
var numArray = [20,100,3,35,0];
numArray.sort(function(a,b){

return b - a;

});
[100, 35, 20, 3, 0]

//昇順の場合
return a - b
[/code]
<hr />

<h4>問24</h4>
文字列"10"をNumber型にし、型判定し、数値かどうか評価後、文字列に変換してください
<h4>A</h4>
[code language="javascript"]

var a = parseInt("10");
typeof a
//"number"
isNaN(a);//false
a.toString();
//"10"

[/code]

<hr />

<h4>問25</h4>
カーリー化されたadd(1)(2)もしくはadd(1,2)

を実行した際両方とも返り値3になる実装がされているadd関数を定義しなさい。
<h4>A</h4>
[code language="javascript"]
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
add(1,2) //3[/code]

<hr />

<h4>問26</h4>
クロージャーを使ったファクトリー関数。

var fafa = Factory("morita");
fafa.introduce()
//"morita"

上記のような実行をしたら渡したname(ここではmorita)が表示されるメソッドintroduceを持つファクトリー関数を定義しなさい。
<h4>A</h4>
[code language="javascript"]

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

//別解

var Factory = function(name){
return {
introduce(){
return name;
}
}
}
var fafa = Factory("morita");
fafa.introduce()
//"morita"

[/code]

<hr />

<h4>問27</h4>
関数sayHiに自分の名前を引数で渡した際にhello!yourname、何も渡さない場合hello!
と返す関数を作成し、それをapplyで実行してください。また
applyの第一引数にnullを渡す場合とオブジェクトを渡す場合のそれぞれのthisは何を指しますか答えてください
<h4>A</h4>
[code language="javascript"]var sayHi = function(name){
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
greeting.sayHi.apply(greeting);//渡さない[/code]
//関数呼び出しの場合thisはwindowを指し、nullを渡す、
//メソッド呼び出しの場合thisはオブジェクトを指しオブジェクトの参照を渡す

<hr />

<h3>ECMAScript5</h3>
<h4>問28</h4>
var obj = {x : 2, y: 3};このobjをプロパティ追加不可、削除変更は可能にし、プロパティ追加不可か否かの判定メソッドでfalseが返る事を確認した後、objのkeyを列挙してください。
<h4>A</h4>
[code language="javascript"]var obj = {x : 2, y: 3};
Object.preventExtensions(obj);
Objcet.isExtensible(obj);//true
Object.keys(obj);
//["x", "y"][/code]

<hr />

<h4>問29</h4>
var obj = {}と等価をObjctメソッドで生成してください
<h4>A</h4>
[code language="javascript"]var obj = Object.create(Object.prototype);[/code]

<hr />

<h4>問30</h4>
var obj = {x : 2, y: 3}と等価をObjectメソッドで生成してください
<h4>A</h4>
[code language="javascript"]var obj = Object.create(Object.prototype, {
x : {value: 2, writable: true, enumerable: true, configurable: true},
y : {value: 3, writable: true, enumerable: true, configurable: true}
})[/code]

<hr />

<h4>問31</h4>
var obj = { x : 2}の属性を出力してください
<h4>A</h4>
[code language="javascript"]Object.getOwnPropertyDescriptor(obj, 'x');
// {
// configurable: false,
// enumerable: false,
// value: 2,
// writable: false
//.fseventsd/}[/code]

<hr />

<h4>問31</h4>
var obj2 = {x : 2};
にObjectメソッドを用いてプロパティy、値2、プロパティ追加可能を定義して、Objectメソッドで情報(値と属性)を返してください
<h4>A</h4>
[code language="javascript"]

var obj2 = {x : 2};
Object.defineProperty(obj2, 'y', {value: 3, enumerable: true});
//[object Object] {
// x: 2,
// y: 3
//}

Object.getOwnPropertyDescriptor(obj2, 'y')
// {
// configurable: false,
// enumerable: true,
// value: 3,
// writable: false
//}

[/code]

<hr />

<h4>問32</h4>
実引数の数を出力、第一引数を出力する関数fを実行してください
<h4>A</h4>
[code language="javascript"]function f(){
console.log(arguments.length)
console.log(arguments[0])
}
f(2)
//1
//2[/code]

<hr />

<h4>問33</h4>
var arr = ["2","23","0","16"];
を小さい順にソートしてください。
その後ソートをできないようにread-onlyにしてください
<h4>A</h4>
[code language="javascript"]var arr = ["2","23","0","16"];
arr.sort(function(a,b){ return a - b ;});
//["0", "2", "16", "23"]
Object.freeze(arr);
//["0", "2", "16", "23"]
arr.sort();
//.fseventsd/"Cannot assign to read only property '1' of [object Array]"[/code]

<hr />

<h4>問34</h4>
var arr = [3,4,5];をconcat以外で新たな配列としてarr2にコピーしてください。
その後arr2[0] = 123を代入するとarrは何を出力するか答えなさい
<h4>A</h4>
[code language="javascript"]var arr = [3,4,5];
var arr2 = arr.slice(0, arr.length);
arr2
//[3, 4, 5]
arr2[0] = 123;
arr
//[3, 4, 5]//変数arrから変更は見えない(要素をコピーしているから)
arr2
//[123, 4, 5][/code]
//別解

var arr2 = arr.map(ele => ele);
arr2
//[3, 4, 5]

<hr />

<h4>問35</h4>
JSON文字列{"x" : 1, "y": 2}
をオブジェクトに変換してJSON文字列に変換してください。またなぜ下記の2つはエラーになるか答えてください。
<h4>A</h4>
[code language="javascript"]

var s = JSON.parse("'foo'");
var arr = JSON.parse("{x : 1}");

var s = '{"x" : 1, "y": 2}';
var obj = JSON.parse(s);
JSON.stringify(obj);
//"{\"x\":1,\"y\":2}"
//**下記はなぜエラーになるか**
var s = JSON.parse("'foo'");
//シングルクォーテーションの文字列はエラー-
var arr = JSON.parse("{x : 1}");
//プロパティ名が文字列でないとエラー

[/code]

<hr />

<h4>問36</h4>
strict modeの代表的な制約を挙げて説明してください。
<h4>A</h4>
[code language="javascript"]

- 暗黙のグローバル変数の禁止
(標準モードではvarを伴わす変数に値を割り当てると現在のスコープに関係なくグローバルオブジェクトにその名前のプロパティを追加してしまう。strictモードでは明示的にエラーになる)
- 関数内でthis参照がグローバルオブジェクトを参照しない

- NaN、Infinity、undefinedのグローバル変数を読み込み専用

- 重複のプロパティ名とパラメータ名を禁止

リテラルでのオブジェクト生成時同じ名前を持つプロパティを複数定義する場合や、関数に同じ名前を持つパラメータを複数与える場合標準モードでは後に定義されたものが優先されますがstrictモードではこのようなコードを実行する際にエラーが発生します。
"use strict";

//オブジェクト生成時にエラー//標準モードで実行する場合は後に定義されたものが反映される

var object = {
prop1 : 100,
prop1 : 200
}

//関数定義字にエラー発生

function func(val, val){
console.log(val);
}
func(1, 2);
//2

パラメータとargumentsがそれぞれ独立
。
標準モードでは関数にパラメータを設定している場合、関数本体におけるパラメータの名前を持つ変数はパラメータの一にあるargumentsオブジェクトの要素のエイリアスとして定義されていました
。つまり最初のパラメータとargument[0]は、名前は異なるものの、その実体は同じものでした。
strictモードではこれが変更されパラメータとargumentsは独立した存在として扱われるようになり、それぞれ個別の引数が割り当てられます。
(function (param){
"use strict";
//引数がプリミティブ型の場合はStrictモードと標準モードで動作がことなる。

pram = "param";
console.log(param, arguments[0]);
//"param"
//(標準モードの場合)
"param" "param"

arguments[0] = "arg";
console.log(param, arguments[0]);
//"param" "arg";
//標準モードの場合 "arg" "arg"
})("引数") //関数に文字列を渡して実行

但し、引数がオブジェクトの場合はパラメータとargumentsに同じオブジェクトへの参照が格納されるためプロパティへのアクセスは事実上同じものへのアクセスとなります。

arguments オブジェクトへの値の割り当ての禁止

関数実行時に与えられた引数はarguments変数に格納されます。Strictモードではこのargumentsオブジェクトに別の新たなオブジェクトを割り当てることができません。
"use strict";

//arguments変数を別の値で置き換えることができない

(function(){
//SyntaxErrorが発生

arguments = [100, 200, 300];//別の値でまるまる置き換えている。。

})();

//argumentsへの要素の追加や変更は可能

(function(){
//要素の置き換え
arguments[0] = 200;
要素の追加
arguments[1] = 300;
console.log(arguments[0], arguments[1]);
//200, 300
})()

- arguments.calleeアクセスの禁止

再帰などの目的で関数内でその関数自身にアクセスする必要がある場合にはarguments.calleeではなく、関数名を使って呼び出します。関数式を使用する場合は無名関数にするのではなく、その関数に名前を与えておく必要があります。
8進数リテラルの禁止

"use strict";
//8進数リテラルを使用するとsyntaxError
//標準モードで実行する場合はあoctに数値8が割り当てられる。
var oct = 010;

- Functionオブジェクトのcallerプロパティのアクセス禁止

ブロック内の関数分の禁止

"use strict";
//ブロック内部の関数宣言はsyntaxError
if(true) {
function func(val){return val;}
}

//ブロック内部での関数式の定義は問題なし

if(true){
val fun = function(val) {return val};
}

delateによる変数や関数の削除の禁止

標準モードでは演算対象が削除できない変数や関数であっても暗黙的に失敗していた。strictモードではエラーを発生させる。Configurable属性にfalseが設定されている再設定不可プロパティの削除時もエラーが発生します。

- with文の禁止
使用するとSyntaxErrorが発生する

- evalが新しいシンボルを作らない
-
evalコードが独自のスコープで動作する。標準モードでevalに文字列を渡してコードを実行するとそのコードは呼び出しているスコープ上で動作する。

つまりevalの実行中に宣言された変数は呼び出したスコープに定義される。

strictモードではevalで実行されるコードが自身のスコープを持ちます。

このスコープから外側のスコープにある変数にはアクセスできますが外側のスコープに変数を定義することはできません。関数スコープと同じです。

//"use strict"は複数のstrictモード記述のあるjsファイルの結合されて本番のファイルを構成している場合先頭のファイルの先頭部に置いた"use strict"文によって結合されたスクリプト全体がstrictモードになりその結果コードが誤作動するという事例があった。
ある関数がstrictモードで動作するかの判定は呼び出し時のスコープではなく、定義されたスコープで行われる。

Strictモードのコード内で呼び出しても標準モードで定義された関数は標準モードで実行される。

argumentsとevalを使っているか？使っていたらそこがstrictモードかどうかを確認しましょう。

※scriptタグはタグ単位でスクリプトの実行環境を生成する。そのため

[/code]

<hr />

<h4>問37</h4>
for in文に関する注意点を3つ挙げてください
<h4>A</h4>
[code language="javascript"]- プロパティを列挙する順序がオブジェクトリテラルと配列リテラルで違う
- 列挙できないプロパティがある(Array.lengthなど)
- プロトタイプ継承したプロパティも列挙する[/code]

<hr />

<h4>問38</h4>
これは2秒後に"hello!kenji!"とconsole.logに出力されることを期待していますが動きません。正しく修正してください。なぜそうなるか理由もください。
<h4>A</h4>
WIP

<hr />

<h4>問39</h4>
var arr = ["f","o","x","k"];
を要素順に出力させなさい
<h4>A</h4>
[code language="javascript"]var arr = ["f","o","x","k"];
for(var j of arr){
console.log(j)
}[/code]
//別解

var arr = ["f","o","x","k"];
arr.forEach(function(ele){
console.log(ele);
}
)

<hr />

<h4>問40</h4>
またイテレーターを使い順番にす出力しなさい
<h4>A</h4>
[code language="javascript"]var arr = ["f", "o", "x", "k"];
var eArr = arr[Symbol.iterator]();
eArr.next().value //f
eArr.next().value //o
eArr.next().value //x
eArr.next().value //k[/code]

<hr />

<h4>問41</h4>
配列["angel", "clown", "drum", "mandarin", "surgeon"]
のインデックス2に"morita"という要素を加えなさい。e.g.["angel", "clown", "morita", "drum", "mandarin", "surgeon"]
<h4>A</h4>
[code language="javascript"]var myFish = ["angel", "clown", "drum", "mandarin", "surgeon"];
myFish.splice(2, 0 , "morita");
myFish//["angel", "clown", "morita", "drum", "mandarin", "surgeon"][/code]

<hr />

<h4>問42</h4>
これvar o = {};と同じ意味を持つコードをObjectを使って生成しなさい
<h4>A</h4>
[code language="javascript"]var o = Object.create(Object.prototype);[/code]

<hr />

<h4>問43</h4>
{p: 42}となるようなオブジェクトをObjectメンバを使って生成しなさい
[code language="javascript"]o = Object.create({}, {p: {value : 42}});[/code]

<hr />

<h4>問44</h4>
1234という数字を文字列に変更後、1文字ずつ配列の要素として取り出しなさい
<h4>A</h4>
[code language="javascript"]var count = 1234;
var ee = count.toString();
var arr = [];
for(var i = 0; i < ee.length; i++){
arr[i] = ee.charAt(i);
}
console.log(arr)//["1","2","3","4"];[/code]

<hr />

<h4>問45</h4>
[こちら](http://jsbin.com/wacumupuqo/1/edit?js,console,output)を実行するとundefinedが返ってきます。nameが返るように修正してください。またそうなる理由を述べてください
<h4>A</h4>
[code language="javascript"]理由thisの実行コンテキストがPersonを差していないから。
[答え1](http://jsbin.com/gikakeyepu/1/edit?js,console,output)[/code]

<hr />

<h4>問46</h4>
<h3>WIP</h3>
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
[答え2](http://jsbin.com/wacumupuqo/edit?js,console,output)

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

<hr />

<h4>問47</h4>
こちらの関数のaを2としてbindした後に
var mul = function(a, b) {
alert(a * b);
};
下記のような配列内にある連想配列のkey、mail値を配列に格納して返せ

array = [
{name: "kenji", mail:"fafa@eee.com"},
{name: "morita", mail: "kkk@faf.com"}
]
<h4>A</h4>
[code language="javascript"]array = [
{name: "kenji", mail:"fafa@eee.com"},
{name: "morita", mail: "kkk@faf.com"}
];
var array2 = [];
array.forEach(function(Element, ind, array){
for(var key in Element){
if(key == "mail"){[/code]
array2.push(Element[key])
}
}
})
console.log(array2);

<hr />

<h4>問48</h4>
配列var passed = [12, 5, 8, 130, 44]
の要素全てが10以上かどうかを評価してtrueかfalseを返しなさい。また10以上のものが一つでもあった場合trueを返しなさい。
<h4>A</h4>
[code language="javascript"]function isBigEnough(ele, ind, arry){
return (ele >= 10);
};
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
passed //false[/code]

<hr />

<h4>問49</h4>
二次元配列

[["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
の"two"の値を取得してください
<h4>A</h4>
[code language="javascript"]var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
var map = new Map(fafa);
map.get("two");
//"send@fafa"[/code]

<hr />

<h4>問50</h4>
先程の変数fafaにインデックス3番目の要素として["four",fafa@eee]の配列を追加しなさい
<h4>A</h4>
[code language="javascript"]

var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]
];
map.set("four", "fafa@eee");

[/code]

<hr />

<h4>問51</h4>
問先程の50の変数fafaに内にある要素を全て取得しなさい
<h4>A</h4>
[code language="javascript"]

var fafa = [["one", "info@fa"],["two", "send@fafa"],["three", "hoso@fafa"]];
var entries = map.entries();
for (var entry of entries){
console.log(entry);
}

[/code]

<hr />

<h4>問52</h4>
"morita kenji"をRegExpオブジェクトを使って配列["morita kenji"]が返るようにしてください。(空白スペースにマッチする正規表現を使うこととする)
<h4>A</h4>
[code language="javascript"]/\w+\s\w+/.exec("morita kenji")[/code]

<hr />

問53

このようなstrとstr2がある var str = "It is an important problem"; var str2 = "The import duty is not cheap"; str,str2の正規表現を使い、import英単単語にマッチした際にそれぞれfalse,trueを返す記述をしくださいてださい

参照(正規表現書き方ドリル/技術評論社)
<h4>A</h4>
[code language="javascript"]var str = "It is an important problem";
var str2 = "The import duty is not cheap";
var ii = /.*\bimport\b.*/.test(str);//false
var ii = /.*\bimport\b.*/.test(str2);//true[/code]

<hr />

<h4>問54</h4>
ひらがな全てにマッチ、半角カタカナ全てにマッチ、カタカナ全てにマッチする正規表現を記述しなさい
<h4>A</h4>
[code language="javascript"]//ひらがな
[ぁ-ん]
//カタカナ
[ァ-ヶ]
//半角カタカナ
[ｦ-゜][/code]

<hr />

<h4>問55</h4>
「」の中に「ヤッホー!」の文字列が1回以上続く場合にのみマッチする正規表現を書いてください。(！が英単語を構成する文字以外の場合はどうか、また「ヤッホー！」が2回以上3回以下にマッチにはどう書きますか)
<h4>A</h4>
[code language="javascript"]var str = "「ヤッホー！ヤッホー！」"; /「(ヤッホー！)+」/.exec(str); //["「ヤッホー！ヤッホー！」", "ヤッホー！"][/code]
//メタ文字

var str = "「ヤッホー?ヤッホー@」";
/「(ヤッホー\W)+」/.exec(str);
["「ヤッホー?ヤッホー@」", "ヤッホー@"]

<hr />

<h4>問56</h4>
(ありがとう|こんにちは｜さようなら) とありがとう|こんにちは｜さようならの違いを教えてください。それぞれexecメソッドを使用した際の返り値を教えてください
<h4>A</h4>
[code language="javascript"]//文中に使えるかどうか
//
var str = "彼はありがとうと言った";
/彼は(ありがとう|こんにちは｜さようなら)と言った/.exec(str);
//["彼はありがとうと言った", "ありがとう"][/code]
//
var str = "彼はありがとうと言った";
/彼はありがとう|こんにちは｜さようならと言った/.exec(str);
//["彼はありがとう"]

<hr />

<h4>問57</h4>
「When」、「Where」、「Who」、「What」、「Why」、「How」の単語のみにマッチする正規表現を書きなさい
<h4>A</h4>
[code language="javascript"]var str = "How";
/Wh(en|ere|o|at|y|)|How/.exec(str);[/code]

<hr />

<h4>問58</h4>
こちらが

x = new Boolean(false)

if文の式として渡すと実行されるか答えなさい
<h4>A</h4>
[code language="javascript"]
x = new Boolean(false);
if (x) {
//実行される
}
//undefinedやnull以外のオブジェクトは実行されます
//真偽値オブジェクトは格納されている値がfalseであってもtrueと評価される。
var falseValue = new Boolean(false);
console.log(falseValue)//false,真偽値オブジェクトが出力される
if(falseValue){//真偽値オブジェクトの内容がfalseでもオブジェクト自体は常にtrue値をみなされる
//run
}
//もし真偽値でない値を真偽値に変換したいのであればnew演算子を使用せずBoolean()に値を渡してください。Boolean()はプリミティブ値のtrueもしくはfalseを返します。以下は全てfalse

console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(false));
console.log(Boolean(''));
console.log(Boolean(undefined));
console.log(Boolean(null));
//以下は全てtrue

console.log(Boolean(1789));
console.log(Boolean('false'));//'false'という文字列は真偽値プリミティブのfalseとは異なる

console.log(Boolean(Math);
console.log(Boolean(Array()));

//see: 開眼!Javascirpt(O'REILLY)
[/code]
<hr />

<h4>問59</h4>
myFalse = new Boolean(false);
g = new Boolean(myFalse);
上記のコードはtrueかfalseか
<h4>A</h4>
[code language="javascript"]
var myFalse = new Boolean(false);
g = new Boolean(myFalse);
g//true
//Boolean オブジェクトの初期値としてオブジェクトを指定した場合、それが値が false の Boolean オブジェクトであっても、新しい Boolean オブジェクトは true の値を持ちます
[/code]
<hr />

<h4>問60</h4>
undefined == null の真偽値は何か
<h4>A</h4>
[code language="javascript"]

if (undefined == null){
//run
}
//実行されます

[/code]

<hr />

<h4>問61</h4>
なんでもいいのでクロージャーを作りなさい(疲れた)
<h4>A</h4>
[code language="javascript"]
var ii = function(){
var pp = "oo";
return function(value){
console.log(pp + value);
}
}
var kk = ii();
kk("jj");
//oojj
[/code]

<hr />

<h4>問62</h4>
今の時間、何時何分何秒を表しなさい
<h4>A</h4>
[code language="javascript"]
var now = new Date();
var nowtime = "今" + now.getHours() + "時" + now.getMinutes() + "分" + now.getSeconds() + "秒";
nowtime
//"今23時49分56秒"
[/code]

<hr />

<h4>問63</h4>
Object matching shorthandを使い、こちら
function getSomething(){
return {
first: 1,
second: 2,
third: 3
}
}

の関数を
first,second,thirdにそれぞれ代入してください
<h4>A</h4>
[code language="javascript"]
function getSomething(){
return {
first: 1,
second: 2,
third: 3
}
}
var { first, second, third } = getSomething();
first
//1
second
//2
third
//3
[/code]

<hr />

<h4>問64</h4>
Parameter destructuringとして

function g({name: x}) {
console.log(x);
}
g({name: 5});

こちらが5を出力するトランスパイルされたjsを記述してください
<h4>A</h4>
[code language="javascript"]
function g(_ref) {
var x = _ref.name;
console.log(x);
}
g({ name: 5 });
[/code]

<hr />

<h4>問65</h4>
文字列"fafafakenjifafafa"
に"kenji"が含まれているかどうかの真偽値を出力しなさい
expect //true
<h4>A</h4>
[code language="javascript"]
console.log("fafaeeekenjifa".includes("kenji"));
//true
[/code]

<hr />

<h4>問66</h4>
文字列"repeat"を2回繰り返した結果を出力しなさい

expect //"repeatrepeat"
<h4>A</h4>
[code language="javascript"]
console.log("repeat".repeat(2));
//"repeatrepeat"
[/code]

<hr />

<h3>ES6</h3>
<h4>問67</h4>
文字列fooをイテレーターを使った反復処理で配列["f","o","o"]を出力しなさい。
<h4>A</h4>
[code language="javascript"]

var chars = [];
for (let n of "foo"){
chars.push(n);
}
console.log(chars);//["f","o","o"]

[/code]

<hr />

<h4>問68</h4>
IteratableからIteratorを取得、要素を出力していきして「要素がもうない意」の{value: undefined, done: true}を出力しなさい
<h4>A</h4>
[code language="javascript"]
var arr = ["ooo", "eee"];
var Iterator = arr[Symbol.iterator]();
console.log(Iterator.next()); // { done: false, value: "ooo"}
console.log(Iterator.next()); // { done: false, value: "eee" }
console.log(Iterator.next()); //{ done: true, value: undefined }
[/code]
<hr />

<h4>問69</h4>
文字列"foo"を["f","o","o"]と出力してください
<h4>A</h4>
[code language="javascript"]
//スプレッドオペレータ
var arr = [..."foo"];
console.log(arr);
[/code]

<hr />

<h4>問70</h4>
文字列moritaの1文字目mを変数index0に代入、2文字目oをindex1に代入、残りを配列restの各要素として出力してください
<h4>A</h4>
[code language="javascript"]
//分割代入
var [index0, index1, ...rest] = "morita";
console.log(index0,index1, rest);
//"m"
//"o"
//["r", "i", "t", "a"]
[/code]

<hr />

<h4>問71</h4>
add()を実行した際3、add(2)としたら4add(2,3)を実行したら5が帰ってくる関数addを定義してください
<h4>A</h4>
[code language="javascript"]
//デフォルトパラメータ
function add(a = 1, b = 2){
return a + b;
}
add();// 3
add(2);//4
add(2,3)//5
[/code]

<hr />

<h4>問71</h4>
foo(1, 2, 3, 4, 5, 6)を実行したら1がfirst、2がsecond、残りが配列の要素になるような fooを定義しなさい
<h4>A</h4>
[code language="javascript"]
//レストパラメータ
function foo(first, second, ...rest){
console.log("first", first);
console.log("second", second);
console.log("rest", rest);
}
foo(1,2,3,4,5,6);
[/code]
<hr />

<h4>問72</h4>
配列arr = [1, 2, 3]にArray#concatを使わずにarr2 = [4, 5, 6]を結合させ[1, 2, 3, 4, 5, 6]となるようにしてください
<h4>A</h4>
[code language="javascript"]
//スプレッドオペレータ
var arr2 = [4, 5, 6];
var arr = [1, 2, 3, ...arr2];
console.log(arr);//[1, 2, 3, 4, 5, 6]
[/code]
<hr />

<h4>問73</h4>
下記のようなあるファイル(module.js)で記述した

var foo = "foo";
function bar(){};
class Baz{
baz(){}
}

を別のファイル(import.js)にexport、個別のメンバとして読み込む記述を示しなさい。また「module」という別名で全てのメンバを取得する記述も示しなさい
※module.jsとimport.jsは同階層にあるものとする
<h4>A</h4>
[code language="javascript"]
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
[/code]
<hr />

<h4>問74</h4>
var obj = {foo: foo, bar: bar}
オブジェクトのkeyとvalueが等しい場合の記述せよ
<h4>A</h4>
[code language="javascript"]
var obj = {foo: foo, bar: bar};
var obj = {foo, bar};
[/code]

<hr />

<h3>コンピューテッドプロパティ</h3>
<h4>問75</h4>
WIP

<hr />

<h4>問76</h4>
下記

function ff(){
return "kenji";
}

のような関数をconsole.log内からテンプレートリテラルを使って出力してください

期待する出力

my name is kenji
[参照](https://gist.github.com/kuu/b7eb679a3ad48d980ed3)
<h4>A</h4>
[code language="javascript"]

function ff(){
return "kenji";
}
console.log(`my name is ${ff()}`);
//my name is kenji
[/code]

<hr />

<h4>問77</h4>
<h3>Destructuring assignment</h3>
変数a,bにそれぞれ1,2を代入してください
<h4>A</h4>
[code language="javascript"]
let [a, b] = [1, 2];
[/code]

<hr />

<h4>問78</h4>
文字列 line1とline2を改行てconsole.log出力しなさい
<h4>A</h4>
[code language="javascript"]
console.log(`line1
line2
`);
[/code]

<hr />


<h4>問80</h4>
ユーザー定義関数funを作り、実行時の引数として、オブジェクトkeyにa,b。値をそれぞれ1,4として加算して返してください
<h4>A</h4>
[code language="javascript"]

function fun({a, b}){
return a + b;
}
fun({a: 1, b: 4});//5

[/code]

<hr />

<h4>問82</h4>
mapとforEachの違いは何か答えてください
<h4>A</h4>
[code language="javascript"]

The main difference between the two methods is conceptual and stylistic: You use forEach when you want to do something to or with each element of an array (doing "with" is what the post you cite meant by "side-effects", I think), whereas you use map when you want to copy and transform each element of an array (without changing the original).

//ref
http://stackoverflow.com/questions/3034392/what-use-does-the-javascript-foreach-method-have-that-map-cant-do

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
return elem + 1;
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

[/code]

<hr />

<h3>配列</h3>
<h4>問83</h4>
[{name: "kenji"},{name: "morita"}]の要素のvalueを次のように書き出しなさい(文字列"san"を付けています)e.g ["kenjisan", "moritasan"]
<h4>A</h4>
[code language="javascript"]

var aa = [{name: "kenji"},{name: "morita"}];
var result = aa.map(function(ele, i){
return ele.name + "san";
});
result//["kenjisan", "moritasan"]

[/code]

<hr />

<h4>問84</h4>
同じ事をforEachでしてください
<h4>A</h4>
[code language="javascript"]
var aa = [{name: "kenji"},{name: "morita"}];
var arry = [];
aa.forEach(function(ele, i){
for (var key in ele){
arry.push(ele[key] + "san")
}
});
arry//["kenjisan", "moritasan"]
[/code]

<hr />

<h3>Objects</h3>
<h4>問85</h4>
const atom = {
value: 1,
addValue: function (value) {
return atom.value + value;
},
};
上記object-shorthandを使って書き換えてください
<h4>A</h4>
[code language="javascript"]
//ok
const atom = {
value: 1,
addValue(value) {
return atom.value + value;
},
};[/code]

<hr />

<h4>問86</h4>
こちらのobjをkey内でメソッド呼び出しされているのをコンピューティッドプロパティを使って書き換えてください
<h4>A</h4>
[code language="javascript"]
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
[/code]

<hr />

<h4>問87</h4>
下記のようなURLのファイルパスごとに配列に格納してください
<h4>A</h4>
[code language="javascript"]
https://github.com/kenmori/
Angular2_TypeScript/tree/master/angular2-quickstart
var filepath = location.pathname.substring(1).split('/');
filepath;

//["kenmori", "Angular2_TypeScript", "tree", "master", "angular2-quickstart"]
[/code]
<hr />

<h4>問88</h4>
下記のようなobj内のkeyと値が一緒の際できるshorthandで記述してください
<h4>A</h4>
[code language="javascript"]
const lukeSkywalker = 'Luke Skywalker';
// bad
const obj = {
lukeSkywalker: lukeSkywalker,
};

//ok
const obj = {
lukeSkywalker,
};
[/code]
<hr />

<h3>spread Array</h3>
<h4>問89</h4>
下記のようなある配列itemsの要素をコピーしている記述をspreadArrayを使って簡潔に記述してください
<h4>A</h4>
[code language="javascript"]

const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
itemsCopy[i] = items[i];
}
const itemCopy = [...items];

[/code]

<hr />

<h4>問90</h4>
windowオブジェクトを7つ答えてください
<h4>A</h4>
[code language="javascript"]
navigator
location
history
screen
frames
document
parent, top, self
[/code]

<hr />

<h3>Destructuring</h3>
<h4>問90</h4>
下のようにuserというnameとidをプロパティで持ったオブジェクトを再割り当てやマルチプルなobjectを扱う際に簡潔な書き方にしてください

function add (user){
const name = user.name;
const id = user.id;
return `${name} ${id}`;
}
<h4>A</h4>
[code language="javascript"]
//ベター
function add (user) {
const { name, id } = user;
return `${name} ${id}`;
}
//best
function add ({name, id}){
return `${name} ${id}`;
}
[/code]

<hr />

<h4>問91</h4>
var aaa = [["oo","oo1"], ["ll","ll2"]];このような多次元配列のインデックス0番目だけを出力しなさい
<h4>A</h4>
[code language="javascript"]
var aaa = [["oo","oo1"], ["ll","ll2"]];
aaa.forEach(function(ee){
ee.filter(function(eee, i){
if(i == 0){
console.log(eee);
}
});
});
//oo ll
[/code]

<hr />


<h4>問92</h4>
シャローコピーとディープコピーの違いを教えてください。また
var aa = ["oo", "ll"];
aaをbbにシャローコピーしてbb[0]に任意の文字列を代入し、aa[0]の参照する値が変わらないことを確認してください
<h4>A</h4>
[code language="javascript"]

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

[/code]

<hr />

<h4>問93</h4>
var aa = ["oo", "ll"];をbbにコピーしてaaは["kk", "jj"];が挿入されるようにしなさい。期待する結果
bb//["oo", "ll"];
aa//["kk", "jj"];
<h4>A</h4>
[code language="javascript"]
var aa = ["oo", "ll"];
var bb = aa.splice(0, aa.length, ["kk","jj"])
bb//["oo", "ll"];
aa//["kk", "jj"];
[/code]

<hr />

<h4>問94</h4>
このような配列
var aa = ["ii", "jj", "kk"];がある。"jj"要素を削除するために
deleteを使った場合とspliceを使った場合の違いは何か。それがわかるコードを書いてください
<h4>A</h4>
[code language="javascript"]
deleteは削除されたインデックスを残す。spliseは間を詰める。
var aa = ["ii", "jj", "kk"];
delete aa[1];
aa//["ii", undefined, "kk"]
var aa = ["ii", "jj", "kk"];
aa.splice(1,1);
aa//["ii", "kk"]
[/code]

<hr />

<h4>問95</h4>
var text = "key and value";このような文字列を単語毎に配列の要素として格納してください
//期待する結果
//["key","and","value"]
<h4>A</h4>
[code language="javascript"]
var text = "key and value";
var arraytext = ii.match(/\w+/g);
arraytext
["text", "and", "value"]
[/code]

<hr />

<h4>問96</h4>
var text = 'abc def ghi jkl';の空白の直前の文字をグループ化してカンマ文字の後ろに移動させなさい。

期待する文字列
"ab,cde,fgh,ijkl"
<h4>A</h4>
[code language="javascript"]
var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,',$1');
"ab,cde,fgh,ijkl"

//or

var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,function(m0, m1){
return "," + m1
});
"ab,cde,fgh,ijkl"
[/code]
<hr />

<h4>問97</h4>
var array = ["aa","bb","cc","dd","ff"]
; このような配列の要素"bb"の前に"ff"を移動させて ["aa","ff","bb","cc","dd"] このような配列を完成させてください
<h4>A</h4>
[code language="javascript"]
array.splice(1,0,array.splice(4,1)[0])
//array
//["aa","ff","bb","cc","dd"]
[/code]

<hr />

<h4>問98</h4>
nullの比較についてそれぞれtureかfalseか答えてください
<h4>A</h4>
[code language="javascript"]
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
[/code]
<hr />

<h4>問99</h4>
こちらの2つのif分の条件式の違いを教えてください
<h4>A</h4>
[code language="javascript"]
if('a' in obj)
if(obj.a)
**in演算子の場合**
objにキーaが存在する場合(undefinedでも)trueを返す
if('a' in obj)は実行される
**obj.aの場合**
undefinedの場合falseを返す
if(obj.a)が存在しても未定義だと実行されない
[/code]
<hr />

<h4>問100</h4>
var arr = [ 10, 20 ];
においてarr[2]が存在しないことを確認してください
<h4>A</h4>
[code language="javascript"]
2 in arry;
[/code]

<hr />

<h3>文字列</h3>
<h4>問101</h4>
var string = "-9";を数値に変換してください
<h4>A</h4>
[code language="javascript"]
string - 0
//-9
[/code]

<hr />

<h4>問102</h4>
sliceとsubstringの違いを教えてください
<h4>A</h4>
[code language="javascript"]

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

[/code]

<hr />

<h4>問103</h4>
次のような文字列abcdefgのcとeそれぞれを大文字にしてください
<h4>A</h4>
[code language="javascript"]

var str = "abcdefg";
var replaced = str.replace(/[ce]/g,function(str){
return str.toUpperCase();
});
//replaced "abCdEfg"

[/code]

<hr />

<h4>問104</h4>
次のような文字列をvar str = "こんにちは";
var name = "もりたさん";
連結し"いい天気ですね"を付け足した新しい文字列を生成してください

期待する結果"こんにちはもりたさんいい天気ですね"

連結してもstrは元の文字列のママなことを確認
str
//こんにちは
<h4>A</h4>
[code language="javascript"]

var str = "こんにちは";
var name = "もりたさん";
var newstr = str.concat(name, "いい天気ですね");
newstr
"こんにちはもりたさんいい天気ですね"

str //こんにちは

//String.concatのパフォーマンスについて
//https://developer.mozilla.org/
ja/docs/Web/JavaScript/Reference/Global_Objects/
String/concat

[/code]

<hr />

<h4>問105</h4>
if文での評価で渡ってきた引数targetがnullかundefinedのときのみtrueとなる評価をしてください
<h4>A</h4>
[code language="javascript"]

target == null

[/code]

<hr />

<h4>問106</h4>
こちら
var value = 0;
var target = value || 10
target
//10

はvalueが0の時falseになり10が返る。0の際も代入されるようにしてください
<h4>A</h4>
[code language="javascript"]
var value = 0;
var target = (value !== undefined) ? value : 10;
value
//0
[/code]

<hr />

<h4>問107</h4>
配列arrayが空ならfalseが返るようにしてください
<h4>A</h4>
[code language="javascript"]
var array = [];
array.length !== 0
//false
[/code]

<hr />

<h4>問108</h4>
下のような
var obj = {};
obj ? true : false;
を評価した結果trueが返る。keyがない場合falseが返るようにしてください
<h4>A</h4>
[code language="javascript"]
var obj = {};
Object.keys(obj).length != 0 ? true : false;
//false
[/code]

<hr />

<h4>問109</h4>
forでループさせるのとforEachで処理する際の違いを教えてください
<h4>A</h4>
[code language="javascript"]
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
[/code]
<hr />

<h4>問110</h4>
この const arry = ["a","b","c"]; の列挙可能なプロパティと不可能なプロパティを出力してください

期待する結果
["0","1","2","length"]
<h4>A</h4>
[code language="javascript"]
const arr = ['a','b','c'];
console.log(Object.getOwnPropertyNames(arr));
//["0","1","2","length"]
[/code]

<hr />

<h4>問111</h4>
オブジェクトoに対してaという値が"morita"、列挙可能、削除可能、書き換え可能なプロパティを作成してください
<h4>A</h4>
[code language="javascript"]
let o = {};
Object.definedProperty(o,"a",{
value: 'morita',
writable: true,
configurable: true,
enumerable: true,
});
[/code]

<hr />

<h4>問112</h4>
下のlib/math.jsに入っている1と2を別のファイルで使えるようにして
受け取る方app.jsも記述しなさい
<h4>A</h4>
[code language="javascript"]
//lib/math.js
//1
function sum(x, y) {
return x + y;
}
//2
var pi = 3.141593;
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
[/code]
<hr />

<h3>配列</h3>
<h4>問113</h4>
["morita","kenji","fafafa"]の要素 "fafafa"
のインデックスを返してください

期待する値 2
<h4>A</h4>
[code language="javascript"]
["morita","kenji","fafafa"].findIndex(x => x == "fafafa")
//2
[/code]

<hr />

<h4>問114</h4>
配列["A","B","C"]を配列の0番目のインデックス値になるようにしてください
<h4>A</h4>
[code language="javascript"]
expect [["A"],["B"],["C"]]
//better
["A","B","C"].map(x => Array.of(x));
//best
["A","B","C"].map(x => [x])

//http://www.2ality.com/2014/05/es6-array-methods.html
[/code]
<hr />

<h4>問115</h4>
配列['a', 'b', 'c']のインデックス1番だけを文字列"kenji"に変えてください
<h4>A</h4>
[code language="javascript"]
['a', 'b', 'c'].fill('kenji', 1, 2);
//["a","kenji","c"]
//http://www.2ality.com/2014/05/es6-array-methods.html
[/code]
<hr />

<h4>問116</h4>
配列 [6, -5, 8]を0未満の要素だけ出力しなさい
<h4>A</h4>
[code language="javascript"]
const i = [3, 0, 6, -1].find(x=> x < 0);
console.log(i)
//-1
[/code]

<hr />

<h4>問117</h4>
gen.next().valueを実行すると値が1づつ返ってくるようなGenerator関数を作り、1,2,3と出力しなさい
<h4>A</h4>
[code language="javascript"]
function* idMaker(){
var index = 0;
while(true)
yield index++;
}
var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
[/code]
<hr />

<h4>問118</h4>
ラッパーオブジェクトについて教えてください。
<h4>A</h4>
[code language="javascript"]
//解答は理解していてある程度どういうものか答えられればいいものとします
//trueなどのプリミティブ値のプロパティにアクセスするとjavascirptはプリミティブ値に対応するコンストラクタからラッパーオブジェクトを作り、そのラッパーオブジェクトのプロパティやメソッドにアクセスできるようになる。(「オブジェクトのように」あつかうことができる。)作られたラッパーオブジェクトはオブジェクトへのアクセスが終わると破棄されて元のプリミティブ値に戻します。
例えば下記は文字列オブジェクトから文字列を生成しています。
var string = new String('foo');
string.length;//3 オブジェクトがもつプロパティにアクセスできます。
var string = 'foo'//プリミティブ値として代入
string.length //3 文字列プリミティブをオブジェクトとしてアクセス。同じ3を出力していますが内部的に一時的にラッパーオブジェクトを呼び、オブジェクトにアクセス。その後破棄しています

よく「javascriptは全てがObjectである」と言われるのはこのため

//プリミティブ値・・・文字列,数値,真偽値などtypeofの評価でObjectを返さないそれら
[/code]
<hr />

<h4>問119</h4>
nullとundefinedの違いを教えてください
<h4>A</h4>
[code language="javascript"]
//nullはプロパティは設定しているものの、値の初期値としてなんらかの理由で値が入っていないことを明示する際にnullを入れる。変数やプロパティにがその時点で利用不可能にするためにnullを明示的に入れる

//undefinedは存在自体がない
[/code]
<hr />

<h4>問120</h4>
値がnullかどうかを確認してください
<h4>A</h4>
[code language="javascript"]
//var fafa = null;
console.log(typeof fafa)//Object
console.log(fafa == undefined)//等値演算子ではtrueになってしまう
console.log(fafa === null);//true //同値演算子を使う
//等値演算子ではnullとundefinedはtrueになってしまうことに注意してください。
[/code]
<hr />

<h4>問121</h4>
プリミティブ型と参照型の同値比較の違いを教えてください。
<h4>A</h4>
[code language="javascript"]
//プリミティブ型の同値比較は文字通り同じ値かどうかが評価される。
//参照型同士の同値比較は同じオブジェクトを参照しているかどうかが評価される。オブジェクトの代入は参照先の代入であることが理解できればok(参照渡し)
[/code]
<hr />

<h3>DOM操作</h3>
<h4>問122</h4>
div要素を10個作ってidがparentの子要素として追加してください
<h4>A</h4>
[code language="javascript"]
//bad
var parent = document.getElementById('parent');
for(var i = 0; i < 10; i++){
var child = document.createElement('div');
parent.appendChild(child);;
}
//good
var fragment = document.createDocumentFragment();
for(var i = 0; i < 10; i++){
var child = document.createElement('div');
fragment.appendChild('child');
}

document.getElementById('parent')
.appendChild(fragment);
[/code]
<hr />


<h4>問125</h4>
次の文章中の
My name is Taro Suzuki and I am a researcher at ABC. 小文字のaで始まる英単語にのみマッチする正規表現を書いてください。1文字の場合もマッチの対象です
<h4>A</h4>
[code language="javascript"]
const str7 = "My name is Taro Suzuki and I am a researcher at ABC.";
//str.match(/\ba.*\b/); これだと大文字と次の単語にmatchしてしまう
console.log(str7.match(/\ba\w*\b/g));
//["and","am","a","at"]

//\sa\w*\sだと\sは文字の先頭や末尾にはマッチしないので、文章の先頭や末尾にある英単語が対象から外れてしまうことに注意してください。
[/code]
<hr />

<h4>問126</h4>
下のこちらを使い

var myRe=/ken*/g; var str2 = "fafakenfafkenji";

文字列の中のkenだけをexecメソッドを使いマッチした文字を全て出力、マッチした文字列の後のインデックスを同時に出力してください
<h4>A</h4>
[code language="javascript"]
const myRe=/ken*/g;
const str2 = "fafakenfafkenji";
let array;
while ((array = myRe.exec(str2)) !== null) {
let msg = array[0] + " を見つけました。";
msg += "次のマッチは " + myRe.lastIndex + " からです。";
console.log(msg);
}
//https://developer.mozilla.org/ja/docs/Web/
JavaScript/Reference/Global_Objects/RegExp/exec

先読み
[/code]
<hr />

<h4>問127</h4>
次の
const string3 = "washable reasonable accessible assemble answerable";

こちらの文字列,
「able」で終わる英単語の前の部分([able]を除いた部分)にマッチする正規表現を書きなさい。期待する結果

["wash","reason","answer"]
<h4>A</h4>
[code language="javascript"]
const string3 = "washable reasonable accessible assemble answerable";
const reg5 = /\b\w+(?=able\b)/g;
console.log(string3.match(reg5));
//["wash","reason","answer"]
否定先読み
[/code]
<hr />

<h4>問128</h4>
こちらの文字列

const nen1 = "ケンジは昭和55年生まれの35歳であり、ケンジの母は昭和22年生まれの64歳である"

を使い、後ろに「年」および数字以外の文字が続く1桁以上の数字にマッチする正規表現を書いてください

期待する結果

["35","64"]
<h4>A</h4>
[code language="javascript"]
const nen1 = "ケンジは昭和55年生まれの35歳であり、ケンジの母は昭和22年生まれの64歳である"
const reg6 = /\d+(?![年\d])/g;
console.log(nen1.match(reg6));
//["35","64"]
//see:正規表現書き方ドリル(技術評論社)
//※ 一番最初に見つけたマッチだけが欲しい場合、execの方がいいかもしれません

最短マッチ
[/code]
<hr />

<h4>問129</h4>
下のような文字列

const str222 = "わたしの名前は「もりた」です。あだなは「もりけん」です";

のカギ括弧内とその文字列にマッチするような正規表現を書いてください

期待する結果
["「もりた」","「もりけん」"]
<h4>A</h4>
[code language="javascript"]
const str = "わたしの名前は「もりた」です。あだなは「もりけん」です";
const re = /「(.+?)」/ig;
const result = str.match(re);
console.log(result);
//["「もりた」","「もりけん」"]
[/code]
<hr />

<h4>問130</h4>
上記の文字列を使ってexecメソッドを使い文字列とし2つとも出力してください

期待する結果
//「もりた」「もりけん」
<h4>A</h4>
[code language="javascript"]
const str222 = "わたしの名前は「もりた」です。あだなは「もりけん」です";
const re222 = /「(.+?)」/ig;

let result;
while ((result = re222.exec(str222)) !== null){
console.log(result[0],"ここ")
}

キャプチャ
[/code]
<hr />

<h4>問131</h4>
下の文字列の「客」という文字の部分ともうひとつある同じ文字である場合のみマッチする正規表現を作成してください
○あの客はよく柿食う客だ
×あの客はよく柿食う人だ
○あの友達はよく柿食う友達だ
×あの親友はよく柿食う友達だ
<h4>A</h4>
[code language="javascript"]

const str5 = "あの客はよく柿食う客だ";
const res5 =str5.match(/あの(.+)はよく柿食う\1だ/);
console.log(res5[0]);
//あの客はよく柿食う客だ

//※[0]にはマッチした箇所が、この場合[1]にはキャプチャが入る

const str5 = "あの客はよく柿食う客だ";
const res5 =str5.match(/あの(.+)はよく柿食う\1だ/);
console.log(res5[0]);

[/code]

<hr />

<h4>問132</h4>
[2, 3,-1, -6, 0, -108, 42, 10].sort();

こちらのsortは正しくsortされない。コンパレータ関数を渡して正しい順序として出力してください。
<h4>A</h4>
[code language="javascript"]

[2, 3,-1, -6, 0, -108, 42, 10].sort(function(x, y){
if(x < y) return -1;
if(y < x) return 1;
return 0;
});
//[-108, -6, -1, 0, 2, 3, 10, 42]

[/code]

<hr />

<h4>問133</h4>
var i = document.getElementById();
i.parentNode.tagName

nodeType[1] = ElementNode;
nodeType[2] = AttributeNode;
nodeType[3] = TextNode;

i.childNodes; //子要素を返す

i.firstChild //最初の子要素

問題
上のようなnodeがある。#nested
要素を削除してください。
<h4>A</h4>
[code language="javascript"]
var i = document.getElementById('top');
var f = document.getElementById('nested');
i.removeChild(f);
[/code]

<hr />

<h4>問134</h4>
nestedの親要素が不明の場合の時nestedを削除してください
<h4>A</h4>
[code language="javascript"]
https://developer.mozilla.org/ja/
docs/Web/API/Node/removeChild
var node = document.getElementById("nested");

if (node.parentNode) {
node.parentNode.removeChild(node);
}
[/code]
<hr />

<h4>問135</h4>
topの子要素全て削除してください
<h4>A</h4>
[code language="javascript"]
var element = document.getElementById("top");
while (element.firstChild) {
element.removeChild(element.firstChild);
}
[/code]

--------------------

ブログではここまでです。

<a href="https://github.com/kenmori/javascript/blob/master/README.md" target="_blank">こちら</a>で続きやっております

【関連記事】
<div><a href="/category/webbibouroku/">Web記事</a>[/code]
<div><a href="/tag/front-end/">フロントエンド記事</a>[/code]
<div><a href="/tag/javascript/">他のJavaScript記事</a>[/code]
<div><a href="/javascript_study">JavaScript問題集</a>[/code]
<a href="/react-reactjs-sample/">【REACT】REACTの動きを理解したい人の為の最小サンプル</a>

<a href="/imadakarawakattareact/">【REACT入門】過去のREACT初心者の自分にREACTのPROPSとSTATEの違いを簡単に説明してあげたい</a>

<a href="/react-x-es6-x-flux/">【REACT × ES6 × FLUX】を手っ取り早く学びたい人の為にサンプル作ったよ【3の倍数と3が付くときだけ猫になるCOUNTER】</a>

<a href="/8851-2/"> REACT × FLUX × ES6 [WIP]LINE風チャット</a>

<a href="http://kenjimorita.jp/category/react-js/">他のReact記事</a>

<a href="http://kenjimorita.jp/category/webbibouroku/">フロントエンド記事</a>

<a href="https://github.com/kenmori">github</a>

<a href="http://qiita.com/M-ISO">qiita</a>