# ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]

※こちらは2015/9/25日の古い記事です。（ESLint v1.5.1 released 22 September 2015）
現時点(2018/7/14)では[ESLint v5.1.0](https://github.com/eslint/eslint/releases)です。
最新のドキュメントを読みに行くことをオススメします。
(近いうち新たに加筆してこちらに更新する予定です)

こんにちは。<a href="/aboutme/">森田</a>と申します。芸人をしています。今回は
[ESLint](http://eslint.org/)のエラールール。日本語「ざっくりしたの」ないのか、と思ってぐぐしてもなさそうなので[自分](http://kenjimorita.jp/)の勉強のためにも書きました。
こちらの記事は数あるカテゴリーの中の「ベストプラクティス編」です。


他カテゴリーはこちら
[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)



**ESLintが勧める「ベストプラクティス」なのでざっと読んでいるだけで「あ、なるほどな、こういう書き方がいいとされてるんだ。。」って感じました。勉強になりました。**

※こちらは2015/9/26日の記事です。（ESLint v1.5.1 released 22 September 2015）
※もし詳しく知りたかったら「見出しがリンク」になっていますので見に行ってくださいね。

以下文章長いので注意(もし探しているルールあったらcmd+F検索したらいいかもね)、ABC順。


## [accessor-pairs](http://eslint.org/docs/rules/accessor-pairs)

Enforces getter/setter pairs in objects
セッターとゲッターのペアーを強制する

```js
// Bad
var o = {
    set a(value) {
        this.val = value;
    }
};

// Good
var o = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};
```

## [block-scoped-var](http://eslint.org/docs/rules/block-scoped-var)

treat var statements as if they were block scoped
ブロック内で宣言された変数の実行コンテキストの扱い

```js
/*eslint block-scoped-var: 2*/
function doSomething() {
    if (true) {
        var build = true;
    }

    console.log(build); /*error "build" used outside of binding context.*/
}
////////////////////////////
//good

function doSomething() {
    var build;

    if (true) {
        build = true;
    }

    console.log(build);//ok
}
```

## [complexity](http://eslint.org/docs/rules/complexity)

specify the maximum cyclomatic complexity allowed in a program
循環的複雑度のしきい値を設定することができるよ

```js
function a(x) {
    if (true) {
        return x; // 1st path
    } else if (false) {
        return x+1; // 2nd path
    } else {
        return 4; // 3rd path
    }
}
```

## [consistent-return](http://eslint.org/docs/rules/consistent-return)

require return statements to either always or never specify values
どの時点でも値を返さない場合があるからどちらか値を一方は返す、もしくは両方返す、の指定

```js
function doSomething(condition) {

    if (condition) {
        return true;
    } else {
        return;      /*error Expected a return value.*/
    }
}
//ok
function doSomething(condition) {

    if (condition) {
        return true;
    } else {
        return false;
    }
}
```

## [curly](http://eslint.org/docs/rules/curly)

specify curly brace conventions for all control statements
すべての制御文の中括弧の規則を指定します

```js
if (foo) foo++; /*error Expected { after 'if' condition.*/

while (bar)     /*error Expected { after 'while' condition.*/
    baz();
//ok
if (foo) {
    foo++;
}

while (bar) {
    baz();
}
```

## [default-case](http://eslint.org/docs/rules/default-case)

require default case in switch statements
switchステートメントのデフォルトケースを必要とします

```js
switch (a) {       /*error Expected a default case.*/
    case 1:
        /* code */
        break;
}
//ok
switch (foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
        break;

    default:
        // do nothing
}
```

## [dot-notation](http://eslint.org/docs/rules/dot-notation)

encourages use of dot notation whenever possible
ドット表記可能な限りの使用を奨励

```js
/*eslint dot-notation: 2*/
var x = foo.bar;

var x = foo[bar];    // Property name is a variable, square-bracket notation required
```

## [dot-location](http://eslint.org/docs/rules/dot-location)

enforces consistent newlines before or after dots
前またはドットの後に一貫した改行を強制

```js
var foo = object
.property;       /*error Expected dot to be on same line as object.*/
```

## [eqeqeq](http://eslint.org/docs/rules/eqeqeq)

require the use of === and !== (fixable)
===と!==の使用

```js
if (x == 42) { }                     /*error Expected '===' and instead saw '=='.*/

if ("" == text) { }                  /*error Expected '===' and instead saw '=='.*/

if (obj.getStuff() != undefined) { } /*error Expected '!==' and instead saw '!='.*/
/* eslint eqeqeq: [2, "smart"] */
typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null

```

## [guard-for-in](http://eslint.org/docs/rules/guard-for-in)

make sure for-in loops have an if statement
プロトタイプチェーンで継承されているプロパティが含まれてしまうことへの対処

```js
for (key in foo) {    /*error The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype.*/
    doSomething(key);
}
//ok
for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}

```

## [no-alert](http://eslint.org/docs/rules/no-alert)

disallow the use of alert, confirm, and prompt
アラート、コンファーム、プロンプトの使用を許可しない

```js
alert("here!");                          /*error Unexpected alert.*/
confirm("Are you sure?");                /*error Unexpected confirm.*/
prompt("What's your name?", "John Doe"); /*error Unexpected prompt.*/
```

## [no-caller](http://eslint.org/docs/rules/no-caller)

disallow use of arguments.caller or arguments.callee
arguments.callerまたはarguments.calleeをの使用を許可しません

```js
/*eslint no-caller: 2*/
function foo(n) {
    if (n <= 0) {
        return;
    }

    arguments.callee(n - 1);   /*error Avoid arguments.callee.*/
}

[1,2,3,4,5].map(function(n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n; /*error Avoid arguments.callee.*/
});
```

## [no-div-regex](http://eslint.org/docs/rules/no-div-regex)

disallow division operators explicitly at beginning of regular expression
正規表現の先頭に明示的に除算演算子を許可しません

```js
function bar() { return /=foo/; } /*error A regular expression literal can be confused with '/='.*/
//ok
function bar() { return /\=foo/; }
```

## [no-else-return](http://eslint.org/docs/rules/no-else-return)

disallow else after a return in an if
もしブロックがreturn文が含まれている場合は、他のブロックが不要となりますyo。
その内容は、ブロックの外に配置することができますyo。

```js
function foo() {
    if (x) {
        return y;
    } else {            /*error Unexpected 'else' after 'return'.*/
        return z;
    }
}
//ok
function foo() {
    if (x) {
        return y;
    }

    return z;
}
```

## [no-empty-label](http://eslint.org/docs/rules/no-empty-label)

disallow use of labels for anything other than loops and switches
ループやスイッチ以外のラベルの使用を許可しない

```js
labeled:     /*error Unexpected label "labeled"*/
var x = 10;
```

## [no-eq-null](http://eslint.org/docs/rules/no-eq-null)

disallow comparisons to null without a type-checking operator
型チェックのオペレータなしnullとの比較を禁止

```js
if (foo == null) {     /*error Use ‘===’ to compare with ‘null’.*/
  bar();
}
while (qux != null) {  /*error Use ‘===’ to compare with ‘null’.*/
  baz();
}
//ok
if (foo === null) {
  bar();
}
while (qux !== null) {
  baz();
}
```

## [no-eval](http://eslint.org/docs/rules/no-eval)

disallow use of eval()
evalの使用を許さないよあたしゃ

```js
var obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key); /*error eval can be harmful.*/
//ok
var obj = { x: "foo" },
    key = "x",
    value = obj[key];
```

## [no-extend-native](http://eslint.org/docs/rules/no-extend-native)

disallow adding to native types
ネイティブ型への追加禁止
じゃあどうするのかって、hasOwnPropertyとforループ内部をラップしてね

```js
//disallow
Object.prototype.a = "a";
Object.defineProperty(Array.prototype, "times", {value: 999});

//これらはチェックされない
var x = Object; x.prototype.thing = a;
eval("Array.prototype.forEach = 'muhahaha'");
with(Array) { prototype.thing = 'thing'; };
window.Function.prototype.bind = 'tight';

```

## [no-extra-bind](http://eslint.org/docs/rules/no-extra-bind)

disallow unnecessary function binding
結合不要な機能を許可しません
メソッドは、必要に応じて、特定の値に引数を結合し、この値を特定し、ある関数を作成するために使用されます。
この値を指定するために使用する場合は、関数が実際にその関数本体でこれを使用することが重要です。
リファクタリングの途中でbindの必要がないところが残ったりする残ると不要なオーバーヘッドが発生する

```js
var boundGetName = (function getName() {
    return this.name;
}).bind({ name: "ESLint" });
console.log(boundGetName());      // "ESLint"

// useless bind
var boundGetName = (function getName() {
    return "ESLint";
}).bind({ name: "ESLint" });//とってオッケー

console.log(boundGetName());      // "ESLint"
```

## [no-fallthrough](http://eslint.org/docs/rules/no-fallthrough)

disallow fallthrough of case statements (recommended)
case文のフォールスルー（推奨)

```js
switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomethingElse();
}
//上の場合fooが1の場合2も通る
switch(foo) {
    case 1:
        doSomething();
        break;//good

    case 2:
        doSomethingElse();
}

```

## [no-floating-decimal](http://eslint.org/docs/rules/no-floating-decimal)

disallow the use of leading or trailing decimal points in numeric literals
先頭または数値リテラルで小数点を後続の使用を許可しません

```js
var num = .5;  /*error A leading decimal point can be confused with a dot.*/
var num = 2.;  /*error A trailing decimal point can be confused with a dot.*/
var num = -.7; /*error A leading decimal point can be confused with a dot.*/
```

## [no-implicit-coercion](http://eslint.org/docs/rules/no-implicit-coercion)

disallow the type conversions with shorter notations
短い表記で型変換を許可しません

```js
//こういうやつ
var b = !!foo;
var b = ~foo.indexOf(".");
var n = +foo;
var n = 1 * foo;
var s = "" + foo;
//置き換えれる
var b = Boolean(foo);
var b = foo.indexOf(".") !== -1;
var n = Number(foo);
var n = Number(foo);
var s = String(foo);

```

## [no-implied-eval](http://eslint.org/docs/rules/no-implied-eval)

 disallow use of eval()-like methods
eval()のようなメソッドの使用を許可しない

```js
//こういうやつ。setTimeout(), setInterval() or execScript()
setTimeout("alert('Hi!');", 100);
//good
setTimeout(function() {
    alert("Hi!");
}, 100);
```

## [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this)

disallow this keywords outside of classes or class-like objects
クラスまたはクラスのようなオブジェクトの外側で、thisキーワードを使うのを許可しません
けっこう重要だと思っているので全部のせる。。

```js
/*eslint no-invalid-this: 2*/
this.a = 0;            /*error Unexpected `this`.*/
baz(() => this);       /*error Unexpected `this`.*/

(function() {
    this.a = 0;        /*error Unexpected `this`.*/
    baz(() => this);   /*error Unexpected `this`.*/
})();

function foo() {
    this.a = 0;        /*error Unexpected `this`.*/
    baz(() => this);   /*error Unexpected `this`.*/
}

var foo = function() {
    this.a = 0;        /*error Unexpected `this`.*/
    baz(() => this);   /*error Unexpected `this`.*/
};

foo(function() {
    this.a = 0;        /*error Unexpected `this`.*/
    baz(() => this);   /*error Unexpected `this`.*/
});

obj.foo = () => {
    // `this` of arrow functions is the outer scope's.
    this.a = 0;        /*error Unexpected `this`.*/
};

var obj = {
    aaa: function() {
        return function foo() {
            // There is in a method `aaa`, but `foo` is not a method.
            this.a = 0;      /*error Unexpected `this`.*/
            baz(() => this); /*error Unexpected `this`.*/
        };
    }
};

class Foo {
    static foo() {
        this.a = 0;      /*error Unexpected `this`.*/
        baz(() => this); /*error Unexpected `this`.*/
    }
}

foo.forEach(function() {
    this.a = 0;          /*error Unexpected `this`.*/
    baz(() => this);     /*error Unexpected `this`.*/
});

/////////////////////////////////////////////////////////////////////
//以下は問題ではない
////////////////////////////////////////////////////////////////////
function Foo() {
    // OK, this is in a legacy style constructor.
    this.a = 0;
    baz(() => this);
}

class Foo {
    constructor() {
        // OK, this is in a constructor.
        this.a = 0;
        baz(() => this);
    }
}

var obj = {
    foo: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

var obj = {
    foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

var obj = {
    get foo() {
        // OK, this is in a method (this function is on object literal).
        return this.a;
    }
};

var obj = Object.create(null, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

Object.defineProperty(obj, "foo", {
    value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
});

Object.defineProperties(obj, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

function Foo() {
    this.foo = function foo() {
        // OK, this is in a method (this function assigns to a property).
        this.a = 0;
        baz(() => this);
    };
}

obj.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

Foo.prototype.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

class Foo {
    foo() {
        // OK, this is in a method.
        this.a = 0;
        baz(() => this);
    }
}

var foo = (function foo() {
    // OK, the `bind` method of this function is called directly.
    this.a = 0;
}).bind(obj);

foo.forEach(function() {
    // OK, `thisArg` of `.forEach()` is given.
    this.a = 0;
    baz(() => this);
}, thisArg);

/** @this Foo */
function foo() {
    // OK, this function has a `@this` tag in its JSDoc comment.
    this.a = 0;
}

```

## [no-iterator](http://eslint.org/docs/rules/no-iterator)


```js
Foo.prototype.__iterator__ = function() { /*error Reserved name '__iterator__'.*/
    return new FooIterator(this);
};
foo.__iterator__ = function () {};        /*error Reserved name '__iterator__'.*/
foo["__iterator__"] = function () {};     /*error Reserved name '__iterator__'.*/

//ok
/*eslint no-iterator: 2*/

var __iterator__ = foo; // Not using the `__iterator__` property.

```

## [no-labels](http://eslint.org/docs/rules/no-labels)

disallow use of labeled statements
ラベル付き文の使用を許可しません
ブレイクと一緒に使用してループ周りを制御するために使うよ

```js
label:                   /*error Unexpected labeled statement.*/
    while(true) {
        // ...
    }

label:                   /*error Unexpected labeled statement.*/
    while(true) {
        break label;     /*error Unexpected label in break statement.*/
    }

label:                  /*error Unexpected labeled statement.*/
    while(true) {
        continue label; /*error Unexpected label in continue statement.*/
    }
//ok
var f = {
    label: "foo"
};

while (true) {
    break;
}

while (true) {
    continue;
}
```

## [no-loop-func](http://eslint.org/docs/rules/no-loop-func)

disallow creation of functions within loops
ループ内の関数の作成を許可しません

```js
for (var i=10; i; i--) {
    (function() { return i; })();     /*error Don't make functions within a loop*/
}
//ok
var a = function() {};
for (var i=10; i; i--) {
    a();
}



```

## [no-multi-spaces](http://eslint.org/docs/rules/no-multi-spaces)

disallow use of multiple spaces
複数のスペースの使用を許可しません

```js
if(foo  === "bar") {}//スペース複数
var a =  1;            /*error Multiple spaces found before '1'.*/

//ok
if(foo === "bar") {}
var a = 1;

```

## [no-multi-str](http://eslint.org/docs/rules/no-multi-str)

disallow use of multiline strings
複数行の文字列の使用を許可しません
スラッシュを利用して複数行にまたがって作る文字列のこと


```js
var x = "Line 1 \
         Line 2";//こういうのを許可しない
```

## [no-native-reassign](http://eslint.org/docs/rules/no-native-reassign)

 disallow reassignments of native objects
 ネイティブオブジェクトの再割り当てを許可しません
 それに代入しようとしたときエラー

```js
String = new Object(); /*error String is a read-only native object.*/
```


## [no-new-func](http://eslint.org/docs/rules/no-new-func)

disallow use of new operator for Function object
Functionオブジェクトのための新しい演算子の使用を許可しません

```js
var x = new Function("a", "b", "return a + b"); /*error The Function constructor is eval.*/
var x = Function("a", "b", "return a + b");     /*error The Function constructor is eval.*/
```

## [no-new-wrappers](http://eslint.org/docs/rules/no-new-wrappers)

disallows creating new instances of String,Number, and Boolean
文字列、数値、ブールの新しいインスタンスを作成する許可しません

```js
var stringObject = new String("Hello world"); /*error Do not use String as a constructor.*/
var numberObject = new Number(33);            /*error Do not use Number as a constructor.*/
var booleanObject = new Boolean(false);       /*error Do not use Boolean as a constructor.*/
var stringObject = new String;                /*error Do not use String as a constructor.*/
var numberObject = new Number;                /*error Do not use Number as a constructor.*/
var booleanObject = new Boolean;              /*error Do not use Boolean as a constructor.*/

//OK
var text = String(someValue);
var num = Number(someValue);
var object = new MyString();
```

## [no-new](http://eslint.org/docs/rules/no-new)

disallow use of the new operator when not part of an assignment or comparison
どこにも参照が格納されていないやつだめ。破棄されるし


```js
new Thing(); /*error Do not use 'new' for side effects.*/

//OK
var thing = new Thing();
Thing();
```

## [no-octal-escape](http://eslint.org/docs/rules/no-octal-escape)

disallow use of octal escape sequences in string literals, such as
文字列リテラルで8進数のエスケープシーケンスの使用を許可しません

```js
var foo = "Copyright \251"; /*error Don't use octal: '\251'. Use '\u....' instead.*/

//ok
var foo = "Copyright \u00A9";   // unicode
var foo = "Copyright \xA9";     // hexadecimal
```

## [no-octal](http://eslint.org/docs/rules/no-octal)

disallow use of octal literals (recommended)
オクタルリテラルの使用を許可しない

```js
var num = 071;       /*error Octal literals should not be used.*/
//ok
var num  = "071";
```

## [no-param-reassign](http://eslint.org/docs/rules/no-param-reassign)

disallow reassignment of function parameters
関数のパラメータの再割り当てを許可しません

```js
function foo(bar) {
    bar = 13;       /*error Assignment to function parameter 'bar'.*/
}
function foo(bar) {
    bar++;          /*error Assignment to function parameter 'bar'.*/
}

//ok
/*eslint no-param-reassign: 2*/
function foo(a) {
    var b = a;
}
```

## [no-process-env](http://eslint.org/docs/rules/no-process-env)

disallow use of process.env
process.envの使用を許可しません。node.jsのやつ

```js
if(process.env.NODE_ENV === "development") { /*error Unexpected use of process.env.*/
    //...
}

//ok
var config = require("./config");

if(config.env === "development") {
    //...
}
```

## [no-proto](http://eslint.org/docs/rules/no-proto)

disallow usage of __proto__ property
\_\_proto\_\_プロパティの使用を許可しません。getPrototypeOfを使おう。

```js
var a = obj.__proto__;    /*error The '__proto__' property is deprecated.*/
var a = obj["__proto__"]; /*error The '__proto__' property is deprecated.*/

//ok
/*eslint no-proto: 2*/
var a = Object.getPrototypeOf(obj);

```

## [no-redeclare](http://eslint.org/docs/rules/no-redeclare)

disallow declaring the same variable more than once (recommended)
複数回同じ変数を宣言許可しない。初期化の混乱をさけるため

```js
var a = 3;
var a = 10; /*error "a" is already defined*/

//ok
var a = 3;
// ...
a = 10;
```

## [no-return-assign](http://eslint.org/docs/rules/no-return-assign)

disallow use of assignment in return statement
return文で割り当ての使用を許可しません
いろいろオプションあるみたいだからリンク先にとんでね

```js
function doSomething() {
    return foo = bar + 2; /*error Return statement should not contain assignment.*/
}
function doSomething() {
    return foo += 2;      /*error Return statement should not contain assignment.*/
}

//ok
function doSomething() {
    return foo == bar + 2;
}
function doSomething() {
    return foo === bar + 2;
}
function doSomething() {
    return (foo = bar + 2);
}

```

## [no-script-url](http://eslint.org/docs/rules/no-script-url)

disallow use of javascript: urls
URLはevalの一形態としていて渡されたコードはURL解析、eval処理されてブラウザによっての評価になるからみたい

```js
location.href = "javascript:void(0)"; /*error Script URL is a form of eval.*/
```

## [no-self-compare](http://eslint.org/docs/rules/no-self-compare)

disallow comparisons where both sides are exactly the same
両側がまったく同じです比較を許可しません

```js
/*eslint no-self-compare: 2*/
var x = 10;
if (x === x) { /*error Comparing to itself is potentially pointless.*/
    x = 20;
}
```

## [no-sequences](http://eslint.org/docs/rules/no-sequences)

disallow use of the comma operator
コンマ演算子の使用を許可しません

```js
foo = doSomething, val;              /*error Unexpected use of comma operator.*/
do {} while (doSomething(), !!test); /*error Unexpected use of comma operator.*/
for (; doSomething(), !!test; );     /*error Unexpected use of comma operator.*/
if (doSomething(), !!test);          /*error Unexpected use of comma operator.*/
switch (val = foo(), val) {}         /*error Unexpected use of comma operator.*/
while (val = foo(), val < 42);       /*error Unexpected use of comma operator.*/
with (doSomething(), val) {}         /*error Unexpected use of comma operator.*/

//ok
/*eslint no-sequences: 2*/
foo = (doSomething(), val);
(0,eval)("doSomething();");
do {} while ((doSomething(), !!test));
for (i = 0, j = 10; i < j; i++, j--);
if ((doSomething(), !!test));
switch ((val = foo(), val)) {}
while ((val = foo(), val < 42));
// with ((doSomething(), val)) {}

```

## [no-throw-literal](http://eslint.org/docs/rules/no-throw-literal)

restrict what can be thrown as an exception
例外としてスローすることができるものを制限します
これは、唯一のErrorオブジェクト自体またはユーザー定義の例外の基底オブジェクトとしてErrorオブジェクトを使用してオブジェクトをスローすることをお勧めと考えられています。
 Errorオブジェクトの基本的な利点は、自動的に、彼らが構築され、発信された場所を追跡することです。
この規則は、例外としてスローされることができるものに制限します。
それが最初に作成されたとき、それは唯一のスローされるのリテラルを妨げ、
Errorオブジェクトである可能性を持つ式を許可するように拡張されました。

```js
throw "error";         /*error Expected an object to be thrown.*/
throw 0;               /*error Expected an object to be thrown.*/
throw undefined;       /*error Do not throw undefined.*/
throw null;            /*error Expected an object to be thrown.*/
var err = new Error();
throw "an " + err;     /*error Expected an object to be thrown.*/
// err is recast to a string literal
var err = new Error();
throw `${err}`         /*error Expected an object to be thrown.*/


//ok
throw new Error();
throw new Error("error");
var e = new Error("error");
throw e;
try {
    throw new Error("error");
} catch (e) {
    throw e;
}
```

## [no-unused-expressions](http://eslint.org/docs/rules/no-unused-expressions)

disallow usage of expressions in statement position
文の位置の表現の使用を許可しません
未使用の表現の排除を目指す。
オプションいろいろあるからリンク先にとんでみてみてね

```js
0        /*error Expected an assignment or function call and instead saw an expression.*/
if(0) 0  /*error Expected an assignment or function call and instead saw an expression.*/
{0}      /*error Expected an assignment or function call and instead saw an expression.*/
f(0), {} /*error Expected an assignment or function call and instead saw an expression.*/
a && b() /*error Expected an assignment or function call and instead saw an expression.*/
a, b()   /*error Expected an assignment or function call and instead saw an expression.*/
/////////////////////////////////////////////////////////////////////
//default//ok
{}
f()
a = 0
new C
delete a.b
void a
c = a, b;
```

## [no-useless-call](http://eslint.org/docs/rules/no-useless-call)

disallow unnecessary .call() and .apply()
必要ないやつ禁止

```js
// foo(1, 2, 3);と同じ意味だし
foo.call(undefined, 1, 2, 3);     /*error unnecessary ".call()".*/
foo.apply(undefined, [1, 2, 3]);  /*error unnecessary ".apply()".*/
foo.call(null, 1, 2, 3);          /*error unnecessary ".call()".*/
foo.apply(null, [1, 2, 3]);       /*error unnecessary ".apply()".*/

// これと同じ意味だし、obj.foo(1, 2, 3);
obj.foo.call(obj, 1, 2, 3);       /*error unnecessary ".call()".*/
obj.foo.apply(obj, [1, 2, 3]);    /*error unnecessary ".apply()".*/
////////////////////////////////////////////////////////////////////
//ok
//thisのバインドは別.
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);
// 引数リストのためはいい
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

## [no-useless-concat](http://eslint.org/docs/rules/no-useless-concat)

disallow unnecessary concatenation of literals or template literals
リテラルまたはテンプレートリテラルの不要な連結を許可しません

```js
//10と同じ
var a = `some` + `string`; /*error Unexpected string concatenation of literals.*/
var a = '1' + '0';         /*error Unexpected string concatenation of literals.*/
var a = '1' + `0`;         /*error Unexpected string concatenation of literals.*/
var a = `1` + '0';         /*error Unexpected string concatenation of literals.*/
var a = `1` + `0`;         /*error Unexpected string concatenation of literals.*/

/////////////////////////////////////////
//ok
// when a non string is included
var c = a + b;
var c = '1' + a;
var a = 1 + '1';
var c = 1 - 2;
// when the string concatenation is multiline
var c = "foo" +
    "bar";
```

## [no-void](http://eslint.org/docs/rules/no-void)

disallow use of the void operator
void演算子の使用を許可しません
空洞表現式を評価し、未定義を返します：void演算子は定義オペランドとリターンを取ります。これは、生成することができる任意の副作用の発現を無視するために使用することができます。
空洞演算子を使用する一般的なケースは、未定義の変数が可変だったES5の前に "純粋な"未定義値を得ることです：

```js
void foo              /*error Expected 'undefined' and instead saw 'void'.*/
var foo = void bar(); /*error Expected 'undefined' and instead saw 'void'.*/


```

## [no-warning-comments](http://eslint.org/docs/rules/no-warning-comments)

disallow usage of configurable warning terms in comments
コメント欄で設定可能な警告用語の使用を許可しません

```js
// TODO: this                          /*error Unexpected todo comment.*/
// todo: this too                      /*error Unexpected todo comment.*/
// Even this: TODO                     /*error Unexpected todo comment.*/
/*                                     /*error Unexpected todo comment.*/ /*error Unexpected fixme comment.*/ /*Unexpected any other term comment.*/ /*
 * The same goes for this TODO comment
 * Or a fixme
 * as well as any other term
 */
//////////////////////////////////////////////
//ok
// This is to do
// even not any other    term
// any other terminal
/*
 * The same goes for block comments
 * with any other interesting term
 * or fix me this
 */

```

## [no-with](http://eslint.org/docs/rules/no-with)

disallow use of the with statement
with使用を許可しません

```js
with (foo) { /*error Unexpected use of 'with' statement.*/
```


## [radix](http://eslint.org/docs/rules/radix)

require use of the second argument for parseInt()
第二引数の使用をおねがいします

```js
var num = parseInt("071");     /*error Missing radix parameter.*/
var num = parseInt(someValue); /*error Missing radix parameter.*/
////////////////////////////////////
//ok
var num = parseInt("071", 10);
var num = parseFloat(someValue);
```


## [vars-on-top](http://eslint.org/docs/rules/vars-on-top)

require declaration of all vars at the top of their containing scope
スコープの上部で宣言をしてね

```js
// Variable declarations in a block:
function doSomething() {
    var first;
    if (true) {
        first = true;
    }
    var second;/*error All "var" declarations must be at the top of the function scope.*/
}
// Variable declaration in for initializer:
function doSomething() {
    for (var i=0; i<10; i++) {} /*error All "var" declarations must be at the top of the function scope.*/
}
// Variables after other statements:
f();
var a;/*error All "var" declarations must be at the top of the function scope.*/
//////////////////////////////////////////////////
///ok

function doSomething() {
    var first;//上
    var second; //multiple declarations are allowed at the top
    if (true) {
        first = true;
    }
}
function doSomething() {
    var i;//宣言とそれは別
    for (i=0; i<10; i++) {}
}

```


## [wrap-iife](http://eslint.org/docs/rules/wrap-iife)

require immediate function invocation to be wrapped in parentheses
関数の即時実行が必要なときは括弧内にラップおねしゃす
関数ステートメントはすぐに呼び出すことができず、関数式はできます。関数ステートメントを括弧でラップする、即時実行関数式というテクニックが一般的です。括弧でラップされた関数は、関数ステートメントではなく、関数式として解析されます。

```js
var x = function () { return { y: 1 };}(); /*error Wrap an immediate function invocation in parentheses.*/
```

ラッピングスタイルを指定するパラメーターがあります。
デフォルトは`outside`です。

```
var x = (function () { return { y: 1 };})(); /*error Move the invocation into the parens that contain the function.*/
//////////////////////////////////////////////////
//ok
var x = (function () { return { y: 1 };}());
```

`inside`と`any`もあります。

```
var x = (function () { return { y: 1 };}()); /*error Wrap only the function expression in parens.*/
//////////////////////////////////////////////////
//ok
var x = (function () { return { y: 1 };})();
```


## [yoda](http://eslint.org/docs/rules/yoda)

require or disallow Yoda conditions
ヨーダを許可するかしないかの設定。
オプションあるからリンク先みてみてね。なにヨーダって→下記@mysticateaさんのコメント参照してね。なるほどー

```js
if ("red" === color) {          /*error Expected literal to be on the right side of ===.*/
    // ...
}
if (true == flag) {             /*error Expected literal to be on the right side of ==.*/
    // ...
}
if (5 > count) {                /*error Expected literal to be on the right side of >.*/
    // ...
}
if (-1 < str.indexOf(substr)) { /*error Expected literal to be on the right side of <.*/
    // ...
}
if (0 <= x && x < 1) {          /*error Expected literal to be on the right side of <=.*/
    // ...
}
/////////////////////////////////////////////
//ok
if (5 & value) {
    // ...
}
if (value === "red") {
    // ...
}
```



## さいごに

つかれた。。


[ESLintのエラールール。日本語ざっくり解説[可能性あるエラー編]](http://qiita.com/M-ISO/items/f9097a75b362206c2a99)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)












