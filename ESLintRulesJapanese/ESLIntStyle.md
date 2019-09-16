# ESLintのエラールール。日本語ざっくり解説[スタイル編]

※こちらは2015/9/25日の古い記事です。（ESLint v1.5.1 released 22 September 2015）
現時点(2018/7/14)では[ESLint v5.1.0](https://github.com/eslint/eslint/releases)です。
最新のドキュメントを読みに行くことをオススメします。
(近いうち新たに加筆してこちらに更新する予定です)

こんにちは。<a href="/aboutme/">森田</a>と申します。芸人をしています。今回は
[ESLint](http://eslint.org/)のエラールール。日本語「ざっくりしたの」ないのか、と思ってぐぐしても
なさそうなので書きました。

※使い方は[こちら](http://eslint.org/docs/user-guide/getting-started)
※ここに載っているのが「ESlintのルール全て」ではありません。

他にこういうのあります。
[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)

※いろいろなオプションでルール設定できるみたいなので詳しく知りたかったら見出しがリンクになっていますので見に行ってくださいね。
※以下文章長いので注意(もし探しているルールあったらcmd+F検索したらいいかもね)

以下は「Stylistic Issues」というカテゴリーで提案しているところです。ルールはABC順

長いですので吐きそうになったら教えてください。



## [array-bracket-spacing](http://eslint.org/docs/rules/array-bracket-spacing)

enforce spacing inside array brackets

配列のカッコ内の間隔を強制します
下記のようなnever設定がdefaultです

```js
/*eslint array-bracket-spacing: [2, "never"]*/
var arr = [ 'foo', 'bar' ];   /*error There should be no space after '['*/ /*error There should be no space before ']'*/
var arr = ['foo', 'bar' ];                                                 /*error There should be no space before ']'*/
var arr = [ ['foo'], 'bar'];  /*error There should be no space after '['*/
var arr = [[ 'foo' ], 'bar']; /*error There should be no space after '['*/ /*error There should be no space before ']'*/
var arr = ['foo',
  'bar'
];
var [ x, y ] = z;             /*error There should be no space after '['*/ /*error There should be no space before ']'*/
var [ x,y ] = z;              /*error There should be no space after '['*/ /*error There should be no space before ']'*/
var [ x, ...y ] = z;          /*error There should be no space after '['*/ /*error There should be no space before ']'*/
var [ ,,x, ] = z;             /*error There should be no space after '['*/ /*error There should be no space before ']'*/
//////////////////////////////////////
//Good
/*eslint array-bracket-spacing: [2, "never"]*/

var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];
var arr = [
  'foo',
  'bar'];

var [x, y] = z;
var [x,y] = z;
var [x, ...y] = z;
var [,,x,] = z;
```

## [block-spacing](http://eslint.org/docs/rules/block-spacing)

disallow or enforce spaces inside of single line blocks

単一行ブロックの内側のスペースを強制、または禁止

```js
/*eslint block-spacing: 2*/
function foo() {return true;} /*error Requires a space after "{".*/ /*error Requires a space before "}".*/
if (foo) { bar = 0;}          /*error Requires a space before "}".*/
////////////////////
//Good
/*eslint block-spacing: 2*/
function foo() { return true; }
if (foo) { bar = 0; }
```

## [brace-style](http://eslint.org/docs/rules/brace-style)

enforce one true brace style

ブレーススタイルを適用の強制

```js
/*eslint brace-style: 2*/
function foo()       /*error Opening curly brace does not appear on the same line as controlling statement.*/
{//こういうのオールマンというらしい
  return true;
}
if (foo)             /*error Opening curly brace does not appear on the same line as controlling statement.*/
{
  bar();
}
///////////////////////
//Good
function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
} else {
  baz();
}

```

## [camelcase](http://eslint.org/docs/rules/camelcase)

require camel case names

キャメル記法とアンダースコア記法があるけどここではキャメル記法のアプローチ
先頭と末尾のアンダースコアは無視する。定数のような全て大文字もスルーする。
とか

```js
/*eslint camelcase: 2*/
var my_favorite_color = "#112C85"; /*error Identifier 'my_favorite_color' is not in camel case.*/

function do_something() {          /*error Identifier 'do_something' is not in camel case.*/
    // ...
}
obj.do_something = function() {    /*error Identifier 'do_something' is not in camel case.*/
    // ...
};
var obj = {
    my_pref: 1                     /*error Identifier 'my_pref' is not in camel case.*/
};
/////////////////////////////
//Good
/*eslint camelcase: 2*/
var myFavoriteColor   = "#112C85";
var _myFavoriteColor  = "#112C85";
var myFavoriteColor_  = "#112C85";
var MY_FAVORITE_COLOR = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };
obj.do_something();


```

## [comma-spacing](http://eslint.org/docs/rules/comma-spacing)

enforce spacing before and after comma

カンマの前後の間隔を強制します。例題、よくカンマの位置みてくださいね

```js
/*eslint comma-spacing: [2, {"before": false, "after": true}]*/

var foo = 1 ,bar = 2;                   /*error There should be no space before ','.*/ /*error A space is required after ','.*/
var arr = [1 , 2];                      /*error There should be no space before ','.*/
var obj = {"foo": "bar" ,"baz": "qur"}; /*error There should be no space before ','.*/ /*error A space is required after ','.*/
foo(a ,b);                              /*error There should be no space before ','.*/ /*error A space is required after ','.*/
new Foo(a ,b);                          /*error There should be no space before ','.*/ /*error A space is required after ','.*/
function foo(a ,b){}                    /*error There should be no space before ','.*/ /*error A space is required after ','.*/
a ,b                                    /*error There should be no space before ','.*/ /*error A space is required after ','.*/
/////////////////////////////////
//Good
/*eslint comma-spacing: [2, {"before": false, "after": true}]*/
var foo = 1, bar = 2
    , baz = 3;
var arr = [1, 2];
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function foo(a, b){}
a, b
```

## [comma-style](http://eslint.org/docs/rules/comma-style)

enforce one true comma style

コンマスタイルを適用を強制

```js
/*eslint comma-style: [2, "last"]*/
var foo = 1
,                        /*error Bad line breaking before and after ','.*/
bar = 2;

var foo = 1
  , bar = 2;             /*error ',' should be placed last.*/
var foo = ["apples"
           , "oranges"]; /*error ',' should be placed last.*/
function bar() {
    return {
        "a": 1
        ,"b:": 2         /*error ',' should be placed last.*/
    };
}
///////////////////////
//Good
/*eslint comma-style: [2, "last"]*/
var foo = 1, bar = 2;

var foo = 1,
    bar = 2;


var foo = ["apples",
           "oranges"];
function bar() {
    return {
        "a": 1,
        "b:": 2
    };
}

```

## [computed-property-spacing](http://eslint.org/docs/rules/computed-property-spacing)

require or disallow padding inside computed properties

計算されたプロパティの内側のパディングを許可、もしくは許さないの設定だよあたしゃ

```js
/*eslint computed-property-spacing: [2, "never"]*/
obj[foo ]                                                       /*error There should be no space before ']'*/
obj[ 'foo']        /*error There should be no space after '['*/
var x = {[ b ]: a} /*error There should be no space after '['*/ /*error There should be no space before ']'*/
obj[foo[ bar ]]    /*error There should be no space after '['*/ /*error There should be no space before ']'*/
////////////////////////
//Good
/*eslint computed-property-spacing: [2, "never"]*/
obj[foo]
obj['foo']
var x = {[b]: a}
obj[foo[bar]]

```

## [consistent-this](http://eslint.org/docs/rules/consistent-this)

enforce consistent naming when capturing the current execution context

現在の実行コンテキストをキャプチャする際に一貫性のあるネーミングを強制

```js
/*eslint consistent-this: [2, "self"]*/
var self = 42;   /*error Designated alias 'self' is not assigned to 'this'.*/
var that = this; /*error Unexpected alias 'that' for 'this'.*/
self = 42;       /*error Designated alias 'self' is not assigned to 'this'.*/
that = this;     /*error Unexpected alias 'that' for 'this'.*/
//////////////////
//Good
/*eslint consistent-this: [2, "self"]*/
var self = this;
var that = 42;
var that;
self = this;
foo.bar = this;
```

## [eol-last](http://eslint.org/docs/rules/eol-last)

enforce newline at the end of file, with no multiple empty lines (fixable)

複数の空白行で、ファイルの最後に（固定可能）改行を強制
改行を末尾の利点は、連結またはシェルプロンプトに干渉することなく、端末にファイルと出力ファイルに追加する機能があります。このルールは、すべての非空のプログラムの改行を強制しますよ。

```js
/*eslint eol-last: 2*/
function doSmth() {
  var foo = 2;
}
///////////////////////
///Good
/*eslint eol-last: 2*/

function doSmth() {
  var foo = 2;
}
// ここにスペースを！！
```

## [func-names](http://eslint.org/docs/rules/func-names)

require function expressions to have a name
関数が例外をスローしたときに、関数名をオフのままにした場合、スタックトレース内の無名関数に似た何かを得る可能性があります。関数発見のためにオプション名を指定した場合、スタックトレース内の関数式の名前を取得するよ。

```js
/* eslint func-names: 2*/
Foo.prototype.bar = function() {}; /*error Missing function expression name.*/
(function() {                      /*error Missing function expression name.*/
    // ...
}())
///////////////////////////
//Good
/* eslint func-names: 2*/
Foo.prototype.bar = function bar() {};
(function bar() {
    // ...
}())
```

## [func-style](http://eslint.org/docs/rules/func-style)

enforce use of function declarations or expressions

関数宣言や表現の使用を強制します
関数宣言が巻き上げられることのスタイル強制みたいだよ
これはエラーではないみたいな、下記は関数宣言だけど、関数式の場合、前記述の関数実行を防ぐためのやつみたい

```
doSomething();
function doSomething() {
    // ...
}
```

```js
/*eslint func-style: [2, "declaration"]*/
var foo = function() {  /*error Expected a function declaration.*/
    // ...
};
/*eslint func-style: [2, "expression"]*/
function foo() {  /*error Expected a function expression.*/
    // ...
}
/////////////////////
//Good
/*eslint func-style: [2, "declaration"]*/

function foo() {
    // ...
}
// Methods (functions assigned to objects) are not checked by this rule
SomeObject.foo = function() {
    // ...
};
/*eslint func-style: [2, "expression"]*/
var foo = function() {
    // ...
};

//arrowFunctionを許可する
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/

var foo = () => {};
```

## [id-length](http://eslint.org/docs/rules/id-length)

this option enforces minimum and maximum identifier lengths (variable names, property names etc.)

最小と最大の識別子の長さ（変数名、プロパティ名など）を強制

```js
/*eslint id-length: 2*/     // default is minimum 2-chars ({ min: 2})
var x = 5;                  /*error Identifier name 'x' is too short. (< 2)*/
obj.e = document.body;      /*error Identifier name 'e' is too short. (< 2)*/
var foo = function (e) { }; /*error Identifier name 'e' is too short. (< 2)*/
try {
    dangerousStuff();
} catch (e) {               /*error Identifier name 'e' is too short. (< 2)*/
    // ignore as many do
}
var myObj = { a: 1 };       /*error Identifier name 'a' is too short. (< 2)*/
(a) => { a * a };           /*error Identifier name 'a' is too short. (< 2)*/
function foo(x = 0) { }     /*error Identifier name 'x' is too short. (< 2)*/
class x { }                 /*error Identifier name 'x' is too short. (< 2)*/
class Foo { x() {} }        /*error Identifier name 'x' is too short. (< 2)*/
function foo(...x) { }      /*error Identifier name 'x' is too short. (< 2)*/
var { x} = {};              /*error Identifier name 'x' is too short. (< 2)*/
var { x: a} = {};           /*error Identifier name 'x' is too short. (< 2)*/
var { a: [x]} = {};         /*error Identifier name 'a' is too short. (< 2)*/
import x from 'y';          /*error Identifier name 'x' is too short. (< 2)*/
export var x = 0;           /*error Identifier name 'x' is too short. (< 2)*/
({ a: obj.x.y.z }) = {};    /*error Identifier name 'a' is too short. (< 2)*/ /*error Identifier name 'z' is too short. (< 2)*/
({ prop: obj.x }) = {};     /*error Identifier name 'x' is too short. (< 2)*/
//////////////////////
//Good
/*eslint id-length: 2*/     // default is minimum 2-chars ({ min: 2})
var num = 5;
function _f() { return 42; }
function _func() { return 42; }
obj.el = document.body;
var foo = function (evt) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
var myObj = { apple: 1 };
(num) => { num * num };
function foo(num = 0) { }
class MyClass { }
class Foo { method() {} }
function foo(...args) { }
var { prop } = {};
var { prop: a } = {};
var { prop: [x] } = {};
import something from "y";
export var num = 0;
({ prop: obj.x.y.something }) = {};
({ prop: obj.longName }) = {};
var data = { "x": 1 };  // excused because of quotes
data["y"] = 3;  // excused because of calculated property access
```

## [id-match](http://eslint.org/docs/rules/id-match)

require identifiers to match the provided regular expression

与えられた正規表現に一致する識別子を必要とします

```js
/*eslint id-match: [2, "^[a-z]+([A-Z][a-z]+)*$", {"properties": true}]*/
var my_favorite_color = "#112C85"; /*error Identifier 'my_favorite_color' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
var _myFavoriteColor  = "#112C85"; /*error Identifier '_myFavoriteColor' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
var myFavoriteColor_  = "#112C85"; /*error Identifier 'myFavoriteColor_' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
var MY_FAVORITE_COLOR = "#112C85"; /*error Identifier 'MY_FAVORITE_COLOR' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
function do_something() {          /*error Identifier 'do_something' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
    // ...
}
obj.do_something = function() {    /*error Identifier 'do_something' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
    // ...
};
var obj = {
    my_pref: 1                     /*error Identifier 'my_pref' does not match the pattern '^[a-z]+([A-Z][a-z]+)*$'.*/
};
///////////////////////////
//Good
/*eslint id-match: [2, "^[a-z]+([A-Z][a-z]+)*$", {"properties": false}]*/
var myFavoriteColor   = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };
obj.do_something();
/*eslint id-match: [2, "", {properties: false}]*/
var obj = {
    my_pref: 1
};
```

## [indent](http://eslint.org/docs/rules/indent)

specify tab or space width for your code (fixable)

コードのタブやスペース幅を指定します（修正可能

```js
/*eslint indent: [2, 2]*/

if (a) {
   b=c;            /*error Expected indentation of 2 space characters but found 3.*/
function foo(d) {  /*error Expected indentation of 2 space characters but found 0.*/
       e=f;        /*error Expected indentation of 8 space characters but found 7.*/
}                  /*error Expected indentation of 6 space characters but found 0.*/
}
/////////////////
//Good
/*eslint indent: [2, 2]*/

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}

```

## [jsx-quotes](http://eslint.org/docs/rules/jsx-quotes)

specify whether double or single quotes should be used in JSX attributes

二重引用符または一重引用符がJSX属性で使用するかどうかを指定
JSXのこういうやつどうする？

```js
<a b='c' />
<a b="c" />
<a b="'" />
<a b='"' />
```

## [key-spacing](http://eslint.org/docs/rules/key-spacing)

enforce spacing between keys and values in object literal properties

オブジェクトリテラル・プロパティのキーと値の間の間隔を強制します

```js
//いろいろなオプションある。この指定ではこれはエラーの意
/*eslint key-spacing: [2, {"beforeColon": false, "afterColon": false}]*/
var obj = { foo: 42 };          /*error Extra space before value for key "foo".*/
var bar = { baz :52 };          /*error Extra space after key "baz".*/

foo = { thisLineWouldBeTooLong:
    soUseAnotherLine };         /*error Extra space before value for key "thisLineWouldBeTooLong".*/
/////////////////
// デフォルト
/*eslint key-spacing: [2, {"beforeColon": false, "afterColon": true}]*/
var obj = { "foo": (42) };

foo = { thisLineWouldBeTooLong:
    soUseAnotherLine };
```

## [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment)

enforce empty lines around comments

コメントの周りの空行を強制

```js
var x = 0;
/* the vertical position */
var y = 10;
///////////
//Good
var x = 0;

/**
 * The vertical position.
 */
var y = 10;
```

## [no-lonely-if](http://eslint.org/docs/rules/no-lonely-if)

disallow if as the only statement in an else block

他のブロック内の唯一のステートメントだった場合、それを許可しない
if文は、親の他のブロック内の唯一のステートメントがある場合に文は、
それが形成している場合、他の使用に結合することは明確になります。

```js
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}
/////////////////////
//Good
if (foo) {
    // ...
} else if (bar) {
    // ...
}
```

## [no-mixed-spaces-and-tabs](http://eslint.org/docs/rules/no-mixed-spaces-and-tabs)

disallow mixed spaces and tabs for indentation (recommended)

インデントに混合スペースとタブを許可しない（推奨）

```js
/*eslint no-mixed-spaces-and-tabs: 2*/

function add(x, y) {
// --->..return x + y;

      return x + y;    /*error Mixed spaces and tabs.*/
}

function main() {
// --->var x = 5,
// --->....y = 7;

    var x = 5,
        y = 7;         /*error Mixed spaces and tabs.*/
}
//////////////////////
//Good
/*eslint no-mixed-spaces-and-tabs: 2*/

function add(x, y) {
// --->return x + y;
    return x + y;
}
```

## [no-multiple-empty-lines](http://eslint.org/docs/rules/no-multiple-empty-lines)

disallow multiple empty lines

複数の空行を許可しません絶対にマジで

```js
/*eslint no-multiple-empty-lines: [2, {max: 2}]*/

var foo = 5;


                  /*error Multiple blank lines not allowed.*/
var bar = 3;
///////////////////////
//Good
//最大指定している値に注意
/*eslint no-multiple-empty-lines: [2, {max: 2}]*/

var foo = 5;

var bar = 3;

```

## [no-nested-ternary](http://eslint.org/docs/rules/no-nested-ternary)

disallow nested ternary expressions

ネストされた三元表現を許可しません

```js
/*eslint no-nested-ternary: 2*/
var thing = foo ? bar : baz === qux ? quxx : foobar; /*error Do not nest ternary expressions*/
foo ? baz === qux ? quxx() : foobar() : bar();       /*error Do not nest ternary expressions*/
//////////////////////
///good
/*eslint no-nested-ternary: 2*/
var thing;

if (foo) {
  thing = bar;
} else if (baz === qux) {
  thing = quxx;
} else {
  thing = foobar;
}
```

## [no-new-object](http://eslint.org/docs/rules/no-new-object)

disallow the use of the Object constructor

Objectコンストラクタの使用を許可しません

```js
/*eslint no-new-object: 2*/
var myObject = new Object(); /*error The object literal notation {} is preferrable.*/
var myObject = new Object;   /*error The object literal notation {} is preferrable.*/
///////////////////
//good
/*eslint no-new-object: 2*/
var myObject = new CustomObject();
var myObject = {};
```

## [no-restricted-syntax](http://eslint.org/docs/rules/no-restricted-syntax)

disallow use of certain syntax in code

コード内の特定の構文の使用を許可しません

```js
/* eslint no-restricted-syntax: [2, "FunctionExpression", "WithStatement"] */
with (me) {                       /*error Using "WithStatement" is not allowed.*/
    dontMess();
}
var doSomething = function () {}; /*error Using "FunctionExpression" is not allowed.*/
//////////////
//gddo
/* eslint no-restricted-syntax: [2, "FunctionExpression", "WithStatement"] */
me.dontMess();
function doSomething() {};
```

## [no-spaced-func](http://eslint.org/docs/rules/no-spaced-func)

disallow space between function identifier and application (fixable)

関数識別子とアプリケーション（修正可能）の間にスペースを許可しませんa

```js
/*eslint no-spaced-func: 2*/

fn () /*error Unexpected space between function name and paren.*/

fn    /*error Unexpected space between function name and paren.*/
()
/////////////////////
//good
/*eslint no-spaced-func: 2*/
fn()

```

## [no-ternary](http://eslint.org/docs/rules/no-ternary)

disallow the use of ternary operators

三項演算子の使用を許可しません

```js
/*eslint no-ternary: 2*/

var foo = isBar ? baz : qux; /*error Ternary operator used.*/

foo ? bar() : baz();         /*error Ternary operator used.*/

function quux() {
  return foo ? bar : baz;    /*error Ternary operator used.*/
}
//////////////////
//good
/*eslint no-ternary: 2*/

var foo;

if (isBar) {
    foo = baz;
} else {
    foo = qux;
}

if (foo) {
    bar();
} else {
    baz();
}

function quux() {
    if (foo) {
        return bar;
    } else {
        return baz;
    }
}
```

## [no-trailing-spaces](http://eslint.org/docs/rules/no-trailing-spaces)

disallow trailing whitespace at the end of lines (fixable)

行の末尾に空白を末尾に（修正可能）禁止

```js
/*eslint no-trailing-spaces: 2*/
// spaces, tabs and unicode whitespaces
// are not allowed at the end of lines
var foo = 0;//•••••  /*error Trailing spaces not allowed.*/
var baz = 5;//••     /*error Trailing spaces not allowed.*/
/////////////////
//good
/*eslint no-trailing-spaces: 2*/
var foo = 0;
var baz = 5;
```

## [no-underscore-dangle](http://eslint.org/docs/rules/no-underscore-dangle)

 disallow dangling underscores in identifiers

識別子にアンダースコアをダングリングすることを禁止

```js
/*eslint no-underscore-dangle: 2*/

var foo_;           /*error Unexpected dangling "_" in "foo_".*/
var __proto__ = {}; /*error Unexpected dangling "_" in "__proto__".*/
foo._bar();         /*error Unexpected dangling "_" in "_bar".*/
///////////////////////////
///good
/*eslint no-underscore-dangle: 2*/
var _ = require('underscore');
var obj = _.contains(items, item);
obj.__proto__ = {};
var file = __filename;
```

## [no-unneeded-ternary](http://eslint.org/docs/rules/no-unneeded-ternary)

disallow the use of ternary operators when a simpler alternative exists

単純な選択肢が存在する場合に三元の演算子の使用を許可しません

```js
// Bad
var isYes = answer === 1 ? true : false;

// Good
var isYes = answer === 1;


// Bad
var isNo = answer === 1 ? false : true;

// Good
var isYes = answer !== 1;
```

## [object-curly-spacing](http://eslint.org/docs/rules/object-curly-spacing)

require or disallow padding inside curly braces

必要とするか、または中括弧内のパディングを許可しません

```js
/*eslint object-curly-spacing: [2, "never"]*/
var obj = { 'foo': 'bar' };            /*error There should be no space after '{'*/ /*error There should be no space before '}'*/
var obj = {'foo': 'bar' };                                                          /*error There should be no space before '}'*/
var obj = { baz: {'foo': 'qux'}, bar}; /*error There should be no space after '{'*/
var obj = {baz: { 'foo': 'qux'}, bar}; /*error There should be no space after '{'*/
var {x } = y;                                                                       /*error There should be no space before '}'*/
import { foo } from 'bar';             /*error There should be no space after '{'*/ /*error There should be no space before '}'*/
////////////////////////
///good
/*eslint object-curly-spacing: [2, "never"]*/

var obj = {'foo': 'bar'};
var obj = {'foo': {'bar': 'baz'}, 'qux': 'quxx'};
var obj = {
  'foo': 'bar'
};
var obj = {'foo': 'bar'
};
var obj = {
  'foo':'bar'};
var obj = {};
var {x} = y;
import {foo} from 'bar';
```

## [one-var](http://eslint.org/docs/rules/one-var)

require or disallow one variable declaration per function

必要とするか、または機能ごとの変数の宣言を許可しません

```js
/*eslint one-var: [2, "always"]*/

function foo() {
    var bar;
    var baz;     /*error Combine this with the previous 'var' statement.*/
    let qux;
    let norf;    /*error Combine this with the previous 'let' statement.*/
}

function foo(){
    const bar = false;
    const baz = true;  /*error Combine this with the previous 'const' statement.*/
    let qux;
    let norf;          /*error Combine this with the previous 'let' statement.*/
}

function foo() {
    var bar;

    if (baz) {
        var qux = true; /*error Combine this with the previous 'var' statement.*/
    }
}
///////////////////
///good
/*eslint one-var: [2, "always"]*/

function foo() {
    var bar,
        baz;
    let qux,
        norf;
}

function foo(){
    const bar = true,
        baz = false;
    let qux,
        norf;
}

function foo() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
}

function foo(){
    let bar;

    if (baz) {
        let qux;
    }
}


```

## [operator-assignment](http://eslint.org/docs/rules/operator-assignment)

require assignment operator shorthand where possible or prohibit it entirely

可能な場合は代入演算子の省略形を必要とするか、またはそれを完全に禁止します

```js
/*eslint operator-assignment: [2, "always"]*/

x = x + y;        /*error Assignment can be replaced with operator assignment.*/
x = y * x;        /*error Assignment can be replaced with operator assignment.*/
x[0] = x[0] / y;  /*error Assignment can be replaced with operator assignment.*/
x.y = x.y << z;   /*error Assignment can be replaced with operator assignment.*/
//////////////////////////
///////good
/*eslint operator-assignment: [2, "always"]*/
x = y;
x += y;
x = y * z;
x = (x * y) * z;
x[0] /= y;
x[foo()] = x[foo()] % 2;
x = y + x; // `+` is not always commutative (e.g. x = "abc")
```

## [operator-linebreak](http://eslint.org/docs/rules/operator-linebreak)

enforce operators to be placed before or after line breaks

改行の後か前に位置させる操作を強制。afterとbeforで違うから詳しくはリン先に行ってね

```js
/*eslint operator-linebreak: [2, "after"]*/

foo = 1
+                        /*error Bad line breaking before and after '+'.*/
2;

foo = 1
    + 2;                 /*error '+' should be placed at the end of the line.*/

foo
    = 5;                 /*error '=' should be placed at the end of the line.*/

if (someCondition
    || otherCondition) { /*error '||' should be placed at the end of the line.*/
}

answer = everything
  ? 42                   /*error '?' should be placed at the end of the line.*/
  : foo;                 /*error ':' should be placed at the end of the line.*/
///////////////////////////////
///good
/*eslint operator-linebreak: [2, "after"]*/

foo = 1 + 2;

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything ?
  42 :
  foo;

```

## [padded-blocks](http://eslint.org/docs/rules/padded-blocks)

enforce padding within blocks

ブロック内のパディングを強制。下記、すかすかだね。

```js
if (a) {

    b();

}
```

## [quote-props](http://eslint.org/docs/rules/quote-props)

require quotes around object literal property names

引用符は、周りのリテラルプロパティオブジェクト名に必要とするかどうか。
いろいろあるね。

```js
/*eslint quote-props: [2, "always"]*/

var object = {
    foo: "bar",         /*error Unquoted property `foo` found.*/
    baz: 42,            /*error Unquoted property `baz` found.*/
    "qux-lorem": true
};
/////////////////////
///good
/*eslint quote-props: [2, "always"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```

## [quotes](http://eslint.org/docs/rules/quotes)

specify whether backticks, double or single quotes should be used (fixable)

ダブルバッククォート、または単一引用符を使用するかどうかを指定します（修正可能）
下記のような３つ方法があるうちどれをどうするかの設定

```js
var double = "double";
var single = 'single';
var backtick = `backtick`;    // ES6 only
```

## [require-jsdoc](http://eslint.org/docs/rules/require-jsdoc)

Require JSDoc comment

Docのコメントを要求

```js
/*eslint require-jsdoc: 2*/

function foo() {       /*error Missing JSDoc comment.*/
    return 10;
}
///////////////////
////////good
/*eslint require-jsdoc: 2*/

/**
* It returns 10
*/
function foo() {
    return 10;
}

/**
* It returns 10
*/
var foo = function() {
    return 10;
}

var array = [1,2,3];
array.filter(function(item) {
    return item > 2;
});
```

## [semi-spacing](http://eslint.org/docs/rules/semi-spacing)

enforce spacing before and after semicolons

前とセミコロンの後の間隔を強制します
セミコロンの周りにスペースを許可しないか、強制することは、プログラムの可読性を向上させるよ

```js
var a = "b" ;

var c = "d";var e = "f";
```

## [semi](http://eslint.org/docs/rules/semi)

require or disallow use of semicolons instead of ASI (fixable)

ASIのセミコロンの使用を許可するか否か
自動でセミコロンが挿入されるASIをどうするかということ
下のはどっちも有効とされる。その設定

```js
var name = "ESLint"
var website = "eslint.org";
```

## [sort-vars](http://eslint.org/docs/rules/sort-vars)

sort variables within the same declaration block

同じ宣言ブロック内の変数たちのソート設定っつ！！
大文字、小文字のソート順とかとか

```js
/*eslint sort-vars: 2*/

var b, a;    /*error Variables within the same declaration block should be sorted alphabetically*/

var a, B, c; /*error Variables within the same declaration block should be sorted alphabetically*/

var a, A;    /*error Variables within the same declaration block should be sorted alphabetically*/
////////////////////////////
///good
/*eslint sort-vars: 2*/

var a, b, c, d;

var _a = 10;
var _b = 20;

var A, a;

var B, a, c;



```

## [space-after-keywords](http://eslint.org/docs/rules/space-after-keywords)

require a space after certain keywords (fixable)

特定のキーワードの後にスペースを必要とします
ifの後のスペースのとこよーくみてーーー

```js
/*eslint space-after-keywords: 2*/
if(a) {}         /*error Keyword "if" must be followed by whitespace.*/
if (a) {} else{} /*error Keyword "else" must be followed by whitespace.*/
do{} while (a);  /*error Keyword "do" must be followed by whitespace.*/

/*eslint space-after-keywords: [2, "never"]*/
if (a) {}        /*error Keyword "if" must not be followed by whitespace.*/

////////////////////////
///good
/*eslint space-after-keywords: 2*/
if (a) {}
if (a) {} else {}

/*eslint space-after-keywords: [2, "never"]*/
if(a) {}
```

## [space-before-keywords](http://eslint.org/docs/rules/space-before-keywords)

require a space before certain keywords (fixable)

特定のキーワードの前にスペースが必要です

```js
/*eslint space-before-keywords: [2, "never"]*/

if (foo) {
    // ...
} else {}         /*error Unexpected space before keyword "else".*/

do {

}
while (foo)       /*error Unexpected space before keyword "while".*/

try {} finally {} /*error Unexpected space before keyword "finally".*/

try {} catch(e) {} /*error Unexpected space before keyword "catch".*/
//////////////////////
///good
/*eslint space-before-keywords: [2, "never"]*/

if (foo) {
    // ...
}else {}

do {}while (foo)

try {}finally {}

try{}catch(e) {}

```

## [space-before-blocks](http://eslint.org/docs/rules/space-before-blocks)

require or disallow a space before blocks (fixable)

ブロック前のスペースを許可しないかするか否か

```js
/*eslint space-before-blocks: 2*/

if (a){           /*error Missing space before opening brace.*/
    b();
}

if (a) {
    b();
} else{           /*error Missing space before opening brace.*/
    c();
}

function a(){}    /*error Missing space before opening brace.*/

for (;;){         /*error Missing space before opening brace.*/
    b();
}

try {} catch(a){} /*error Missing space before opening brace.*/
/////////////////////////
////good
/*eslint space-before-blocks: 2*/

if (a) {
    b();
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```

## [space-before-function-paren](require or disallow a space before function opening parenthesis )

require or disallow a space before function opening parenthesis

関数の括弧の前にスペースを許可するか必要とするか。どする？？
下のみてね

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}

var anonymousWithoutSpace = function() {};

var anonymousWithSpace = function () {};
```

## [space-in-parens](http://eslint.org/docs/rules/space-in-parens)

require or disallow spaces inside parentheses

括弧内のスペースを許可するか必要とするか。どする？？あ、それそこに置いておいて？

```js
foo( 'bar' );
var x = ( 1 + 2 ) * 3;

foo('bar');
var x = (1 + 2) * 3;
```

## [space-infix-ops](http://eslint.org/docs/rules/space-infix-ops)

require spaces around operators (fixable)

演算子の前後にスペースが必要です

```js
/*eslint space-infix-ops: 2*/

a+b                   /*error Infix operators must be spaced.*/

a+ b                  /*error Infix operators must be spaced.*/

a +b                  /*error Infix operators must be spaced.*/

a?b:c                 /*error Infix operators must be spaced.*/

const a={b:1};        /*error Infix operators must be spaced.*/

var {a=0}=bar;        /*error Infix operators must be spaced.*/

function foo(a=0) { } /*error Infix operators must be spaced.*/
////////////////////
///good
/*eslint space-infix-ops: 2*/

a + b

a       + b

a ? b : c

const a = {b:1};

var {a = 0} = bar;

function foo(a = 0) { }
```

## [space-return-throw-case](http://eslint.org/docs/rules/space-return-throw-case)

require a space after return, throw, and case (fixable)

リターンやスロー、ケースなどのスペースどする？

```js
/*eslint space-return-throw-case: 2*/

throw{a:0}                   /*error Keyword "throw" must be followed by whitespace.*/

function f(){ return-a; }    /*error Keyword "return" must be followed by whitespace.*/

switch(a){ case'a': break; } /*error Keyword "case" must be followed by whitespace.*/
///////////////////////
/////good
/*eslint space-return-throw-case: 2*/

throw {a: 0};

function f(){ return -a; }

switch(a){ case 'a': break; }
```

## [space-unary-ops](http://eslint.org/docs/rules/space-unary-ops)

require or disallow spaces before/after unary operators

単項演算子の後/前にスペースを許可しません、もしくは必要とするかの設定

```js
/*eslint space-unary-ops: 2*/

typeof!foo;        /*error Unary word operator "typeof" must be followed by whitespace.*/

void{foo:0};       /*error Unary word operator "void" must be followed by whitespace.*/

new[foo][0];       /*error Unary word operator "new" must be followed by whitespace.*/

delete(foo.bar);   /*error Unary word operator "delete" must be followed by whitespace.*/

function *foo() {
    yield(0)       /*error Unary word operator "yield" must be followed by whitespace.*/
}

++ foo;            /*error Unexpected space after unary operator "++".*/

foo --;            /*error Unexpected space before unary operator "--".*/

- foo;             /*error Unexpected space after unary operator "-".*/

+ "3";             /*error Unexpected space after unary operator "+".*/

////////////////////////
///good
/*eslint space-unary-ops: 2*/

// Word unary operator "delete" is followed by a whitespace.
delete foo.bar;

// Word unary operator "new" is followed by a whitespace.
new Foo;

// Word unary operator "void" is followed by a whitespace.
void 0;

// Unary operator "++" is not followed by whitespace.
++foo;

// Unary operator "--" is not preceeded by whitespace.
foo--;

// Unary operator "-" is not followed by whitespace.
-foo;

// Unary operator "+" is not followed by whitespace.
+"3";
```

## [spaced-comment](http://eslint.org/docs/rules/spaced-comment)

コメント付近のスペースのあり方についてのスタイル設定です
いろいろありすぎるのでリンク先参照願います。。


## [wrap-regex](http://eslint.org/docs/rules/wrap-regex)

require regex literals to be wrapped in parentheses


括弧内にラップされる正規表現リテラルが必要です

```js
/*eslint wrap-regex: 2*/

function a() {
    return /foo/.test("bar"); /*error Wrap the regexp literal in parens to disambiguate the slash.*/
}

/////////////////
//good
/*eslint wrap-regex: 2*/

function a() {
    return (/foo/).test("bar");
}
```

## 最後に

隣の人がカルボナーラ食べてる。。美味しそう。。


このほかのLintルールはこちら
[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)

があります。

この記事全部書いたら痩せた。絶対
ESLintQiita記事ダイエットあります。
