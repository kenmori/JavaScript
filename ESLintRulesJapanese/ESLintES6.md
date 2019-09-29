# ESLintのエラールール。日本語ざっくり解説[ES6編]

※こちらは2015/9/25日の古い記事です。（ESLint v1.5.1 released 22 September 2015）
現時点(2018/7/14)では[ESLint v5.1.0](https://github.com/eslint/eslint/releases)です。
最新のドキュメントを読みに行くことをオススメします。
(近いうち新たに加筆してこちらに更新する予定です)

こんにちは。<a href="/aboutme/">森田</a>と申します。芸人をしています。今回は
[ESLint](http://eslint.org/)のエラールール。日本語「ざっくりしたの」ないのか、と思ってぐぐしてもなさそうなので書きました。

よろしくお願いします。

※使い方は[こちら](http://eslint.org/docs/user-guide/getting-started)
※ここに載っているのが「ESlintのルール全て」ではありません。

他にこちら書きました
[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)

あと「Nodo.js」「strict」等がありますが、気が向いて、休みが続いて、暇すぎて、無性にQiita記事書きたくなったら東京五輪までに書きますね。

※いろいろなオプションでルール設定できるみたいなので詳しく知りたかったら見出しがリンクになっていますので見に行ってくださいね。

長いですので吐きそうになったら教えてください。バスの中で読むのは止めたほうがいいです。

以下は「ECMAScript6」というカテゴリーで提案しているところです。ルールはABC順

## [arrow-parens](http://eslint.org/docs/rules/arrow-parens)

equire parens in arrow function arguments

アロー関数の引数でequire括弧。
アロー関数の括弧の一貫した使用を強制する。

```js
// Bad
if (a => 2) {
}

// Good
if (a >= 2) {
}

// Bad
(a) => {}

// Good
a => {}

/*eslint arrow-parens: [2, "always"]*/

a => {};                     /*error Expected parentheses around arrow function argument.*/
a => a;                      /*error Expected parentheses around arrow function argument.*/
a => {'\n'};                 /*error Expected parentheses around arrow function argument.*/
a.then(foo => {});           /*error Expected parentheses around arrow function argument.*/
a.then(foo => a);            /*error Expected parentheses around arrow function argument.*/
a(foo => { if (true) {}; }); /*error Expected parentheses around arrow function argument.*/
//////////////////////////
//good
/*eslint arrow-parens: [2, "always"]*/
() => {};
(a) => {};
(a) => a;
(a) => {'\n'}
a.then((foo) => {});
a.then((foo) => { if (true) {}; });
```

## [arrow-spacing](http://eslint.org/docs/rules/arrow-spacing)

require space before/after arrow function's arrow

アロー関数の矢印の後か前かにスペースを要求するか

```js
/*eslint arrow-spacing: 2*/
()=> {};     /*error Missing space before =>*/
() =>{};     /*error Missing space after =>*/
(a)=> {};    /*error Missing space before =>*/
(a) =>{};    /*error Missing space after =>*/
a =>a;       /*error Missing space after =>*/
a=> a;       /*error Missing space before =>*/
()=> {'\n'}; /*error Missing space before =>*/
() =>{'\n'}; /*error Missing space after =>*/
/////////////////////
//good
/*eslint arrow-spacing: 2*/
() => {};
(a) => {};
a => a;
() => {'\n'};

/*eslint arrow-spacing: [2, { "before": false, "after": false }]*/
()=>{};
(a)=>{};
a=>a;
()=>{'\n'};
```

## [constructor-super](http://eslint.org/docs/rules/constructor-super)

verify calls of super() in constructors

コンストラクタ内のスーパーの呼び出しを（）を検証する。
派生クラスのコンストラクタは、super()を呼び出す必要があります。
非派生クラスのコンストラクタは、super()を呼び出してはなりません。
これが観察されていない場合は、Javascriptエンジンは、ランタイムエラーが発生します。

このルールは、有効なsuper()の呼び出しがあるかどうかをチェックします。

```js
/*eslint constructor-super: 2*/

class A {
    constructor() {
        super();       /*error unexpected `super()`.*/
    }
}

class A extends null {
    constructor() {
        super();       /*error unexpected `super()`.*/
    }
}

class A extends B {
    constructor() { }  /*error this constructor requires `super()`.*/
}
///////////////////////////
///good
/*eslint constructor-super: 2*/

class A {
    constructor() { }
}

class A extends null {
    constructor() { }
}

class A extends B {
    constructor() {
        super();
    }
}
```

## [generator-star-spacing](http://eslint.org/docs/rules/generator-star-spacing)

enforce spacing around the * in generator functions

ジェネレーター関数の中の```*```の周りのスペースを強制する。
ジェネレータは、時間をかけて複数の値を返すことができるのECMAScript6の機能の新しいタイプ。
これらの特別な関数は、関数キーワードの後に*を置くことによって示される。

```js
//good //これらのどのスペースの間隔を採用するかの設定
function* generator() {
    yield "44";
    yield "55";
}
function *generator() {
    yield "44";
    yield "55";
}
function * generator() {
    yield "44";
    yield "55";
}
//e.g
/*eslint generator-star-spacing: [2, {"before": true, "after": false}]*/
function *generator() {}
var anonymous = function *() {};
var shorthand = { *generator() {} };
```

## [no-class-assign](http://eslint.org/docs/rules/no-class-assign)

disallow modifying variables of class declarations

クラス宣言の修正変数を許可しません
ClassDeclarationは、変数を作成し、変数を変更することができます。
しかし、変更はほとんどの場合、間違いです。

```js
/*eslint no-class-assign: 2*/
class A { }
A = 0;         /*error `A` is a class.*/

/*eslint no-class-assign: 2*/
A = 0;         /*error `A` is a class.*/
class A { }
////////////////////////
//good
/*eslint no-class-assign: 2*/
let A = class A { }
A = 0; // A is a variable.

/*eslint no-class-assign: 2*/
let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

## [no-const-assign](http://eslint.org/docs/rules/no-const-assign)

disallow modifying variables that are declared using const

定数を使用して宣言されている修正変数を許可しません。
constキーワードを使用して宣言された変数を変更することはできません。
これは、実行時エラーが発生します。
非ES2015環境下では、それは単に無視されることがあります。

```js
/*eslint no-const-assign: 2*/
const a = 0;
a = 1;       /*error `a` is constant.*/

/*eslint no-const-assign: 2*/
const a = 0;
a += 1;      /*error `a` is constant.*/

/*eslint no-const-assign: 2*/
const a = 0;
++a;         /*error `a` is constant.*/
///////////////////////
//good
/*eslint no-const-assign: 2*/
const a = 0;
console.log(a);

/*eslint no-const-assign: 2*/
for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}

/*eslint no-const-assign: 2*/
for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

## [no-dupe-class-members](http://eslint.org/docs/rules/no-dupe-class-members)

disallow duplicate name in class members

クラスのメンバで重複した名前を許可しません。
クラスのメンバに同じ名前の宣言がある場合、最後の宣言は黙って他の宣言を上書きします。
これは、予期しない動作を引き起こす可能性があります。

```js
/*eslint no-dupe-class-members: 2*/
class Foo {
  bar() { }
  bar() { }          /*error Duplicate name "bar".*/
}

class Foo {
  bar() { }
  get bar() { }      /*error Duplicate name "bar".*/
}

class Foo {
  static bar() { }
  static bar() { }   /*error Duplicate name "bar".*/
}
/////////////////////
///good
/*eslint no-dupe-class-members: 2*/
class Foo {
  bar() { }
  qux() { }
}

class Foo {
  get bar() { }
  set bar(value) { }
}

class Foo {
  static bar() { }
  bar() { }
}
```

## [no-this-before-super](http://eslint.org/docs/rules/no-this-before-super)

disallow use of this/super before calling super() in constructors

コンストラクタでsuper()を呼び出す前に、このsuper()の使用を許可しません

```js
/*eslint no-this-before-super: 2*/
class A extends B {
    constructor() {
        this.a = 0;        /*error "this" is not allowed before super()*/
        super();
    }
}

class A extends B {
    constructor() {
        this.foo();        /*error "this" is not allowed before super()*/
        super();
    }
}

class A extends B {
    constructor() {
        super.foo();       /*error "super" is not allowed before super()*/
        super();
    }
}

class A extends B {
    constructor() {
        super(this.foo()); /*error "this" is not allowed before super()*/
    }
}
/////////////////////////////
//good
/*eslint no-this-before-super: 2*/
class A {
    constructor() {
        this.a = 0; // OK, this class doesn't have an `extends` clause.
    }
}

class A extends B {
    constructor() {
        super();
        this.a = 0; // OK, this is after `super()`.
    }
}

class A extends B {
    foo() {
        this.a = 0; // OK. this is not in a constructor.
    }
}
```

## [no-var](http://eslint.org/docs/rules/no-var)

require let or const instead of var

var宣言の代わりのletかconstを要求する
ECMAScript6は、letとのconstキーワードを使用して、
ブロックスコープの代わりに関数スコープを持つ変数を作成することができます。
ブロックスコープは、他の多くのプログラミング言語で一般的であり、間違いを避けることができます。

```js
/*eslint no-var: 2*/
var x = "y";     /*error Unexpected var, use let or const instead.*/
var CONFIG = {}; /*error Unexpected var, use let or const instead.*/
///////////////////////
//good
/*eslint no-var: 2*/

let x = "y";
const CONFIG = {};
```

## [object-shorthand](http://eslint.org/docs/rules/object-shorthand)

require method and property shorthand syntax for object literals

オブジェクトリテラルのためのメソッドとプロパティの省略記法を必要とする

**ES5での書き方は以下**

```js
// properties
var foo = {
    x: x,
    y: y,
    z: z,
};

// methods
var foo = {
    a: function() {},
    b: function() {}
};
```

**ES6での書き方は以下**

```js
// properties
var foo = {x, y, z};

// methods
var foo = {
    a() {},
    b() {}
};
```
それを踏まえて、、
このルールは省略記法の使用を強制します。
これはオブジェクトリテラルで定義されている（ジェネレーターを含む）すべてのメソッドや、
割り当てられた変数の名前とキーの名前が一致している「定義されたプロパティ」にも適用される//調査中

```js
/*eslint object-shorthand: 2*/
//こちらは警告をだす
var foo = {
    x: function() {},   /*error Expected method shorthand.*/
    y: function *() {}, /*error Expected method shorthand.*/
    z: z                /*error Expected property shorthand.*/
};
///////////////////////////
//good
/*eslint object-shorthand: 2*/
//上のようにしたい場合はこちら
var foo = {
    x() {},
    *y() {},
    z
};

```

## [prefer-arrow-callback](http://eslint.org/docs/rules/prefer-arrow-callback)

suggest using arrow functions as callbacks

コールバックとしてアロー関数を使用することを勧めます。
アロー関数は、コールバックにするのに適していて
thisキーワードが上位スコープに結合します。

```js
/*eslint prefer-arrow-callback: 2*/

foo(function(a) { return a; });                /*error Unexpected function expression.*/
foo(function() { return this.a; }.bind(this)); /*error Unexpected function expression.*/
//////////////////
//good
/*eslint prefer-arrow-callback: 2*/

foo(a => a);
foo(function*() { yield; });

// this is not a callback.
var foo = function foo(a) { return a; };

// using `this` without `.bind(this)`.
foo(function() { return this.a; });

// recursively.
foo(function bar(n) { return n && n + bar(n - 1); });
```

## [prefer-const](http://eslint.org/docs/rules/prefer-const)

suggest using const declaration for variables that are never modified after

変数が変更されることがない場合は、定数宣言を使用するとよいです。
後に変更されることない変数のためのconst宣言を使用することをお勧め
定数宣言は、認知的負荷を軽減し、保守性を向上させます


```js
/*eslint prefer-const: 2*/

let a = 3;               /*error `a` is never modified, use `const` instead.*/
console.log(a);

// `i` is re-defined (not modified) on each loop step.
for (let i in [1,2,3]) {  /*error `i` is never modified, use `const` instead.*/
    console.log(i);
}

// `a` is re-defined (not modified) on each loop step.
for (let a of [1,2,3]) { /*error `a` is never modified, use `const` instead.*/
    console.log(a);
}

///////////////////////
//good
/*eslint prefer-const: 2*/

let a; // there is no initialization.
console.log(a);

// `end` is never modified, but we cannot separate the declarations without modifying the scope.
for (let i = 0, end = 10; i < end; ++i) {
    console.log(a);
}

// suggest to use `no-var` rule.
var b = 3;
console.log(b);
```

## [prefer-spread](http://eslint.org/docs/rules/prefer-spread)

suggest using the spread operator instead of .apply().

apply()の代わりに[spread構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_operator)を使用してね

ES2015の前は、可変長引数の関数を呼び出すためにFunction.prototype.apply()を使用しなければならない
このように、

```js
var args = [1, 2, 3, 4];
Math.max.apply(Math, args);
```
ES2015では、一可変長引数の関数を呼び出すために、spread構文を使用することができます。

```js
var args = [1, 2, 3, 4];
Math.max(...args);
```
それを踏まえて、
このルールは、spread構文に置き換えることができFunction.prototype.apply（フラグの使用）することを目的とします。

```js

foo.apply(undefined, args); /*error use the spread operator instead of the ".apply()".*/
foo.apply(null, args);      /*error use the spread operator instead of the ".apply()".*/
obj.foo.apply(obj, args);   /*error use the spread operator instead of the ".apply()".*/
/////////////////
//good
/*eslint prefer-spread: 2*/

// The `this` binding is different.
foo.apply(obj, args);
obj.foo.apply(null, args);
obj.foo.apply(otherObj, args);

// The argument list is not variadic.
// Those are warned by the `no-useless-call` rule.
foo.apply(undefined, [1, 2, 3]);
foo.apply(null, [1, 2, 3]);
obj.foo.apply(obj, [1, 2, 3]);
```

## [prefer-reflect](http://eslint.org/docs/rules/prefer-reflect)

suggest using Reflect methods where applicable

[リフレクトメソッド](http://h3manth.com/new/blog/2015/es6-reflect-api/)の使用をお勧め//調査中

```js
/*eslint prefer-reflect: 2*/

foo.apply(undefined, args); /*error Avoid using Function.prototype.apply, instead use Reflect.apply*/
foo.apply(null, args);      /*error Avoid using Function.prototype.apply, instead use Reflect.apply*/
obj.foo.apply(obj, args);   /*error Avoid using Function.prototype.apply, instead use Reflect.apply*/
obj.foo.apply(other, args); /*error Avoid using Function.prototype.apply, instead use Reflect.apply*/

foo.call(undefined, arg);   /*error Avoid using Function.prototype.call, instead use Reflect.apply*/
foo.call(null, arg);        /*error Avoid using Function.prototype.call, instead use Reflect.apply*/
obj.foo.call(obj, arg);     /*error Avoid using Function.prototype.call, instead use Reflect.apply*/
obj.foo.call(other, arg);   /*error Avoid using Function.prototype.call, instead use Reflect.apply*/

/////////////////////////
//good
/*eslint prefer-reflect: 2*/

Reflect.apply(undefined, args);
Reflect.apply(null, args);
Reflect.apply(obj.foo, obj, args);
Reflect.apply(obj.foo, other, args);
Reflect.apply(undefined, [arg]);
Reflect.apply(null, [arg]);
Reflect.apply(obj.foo, obj, [arg]);
Reflect.apply(obj.foo, other, [arg]);
```

## [prefer-template](http://eslint.org/docs/rules/prefer-template)

suggest using template literals instead of strings concatenation

文字列の連結の代わりにテンプレートリテラルを使用することをお勧め。
ES2015（ES6）において文字列の連結のテンプレートリテラルを使用することができます。

e.g1

```js
var str = "Hello, " + name + "!";
```

e.g2

```js
var str = `Hello, ${name}!`;
```

この規則は、文字列と+演算子のフラグの使用を目的としています。

```js
/*eslint prefer-template: 2*/

var str = "Hello, " + name + "!";           /*error Unexpected string concatenation.*/
var str = "Time: " + (12 * 60 * 60 * 1000); /*error Unexpected string concatenation.*/
//////////////////////////
//good
/*eslint prefer-template: 2*/

var str = "Hello World!";
var str = `Hello, ${name}!`;
var str = `Time: ${12 * 60 * 60}`;

// This is reported by `no-useless-concat`.
var str = "Hello, " + "World!";
```

## [require-yield](http://eslint.org/docs/rules/require-yield)

disallow generator functions that do not have yield

[yield](http://www.2ality.com/2015/03/es6-generators.html)を持っていないジェネレーター関数を許可しない//調査中

```js
/*eslint require-yield: 2*/

function* foo() { /*error This generator function does not have `yield`.*/
  return 10;
}
////////////////////////
//good
/*eslint require-yield: 2*/

function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* foo() { }

```


## 最後に

ありがとうございました。お騒がせしました

[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)

