# ESLintのエラールール。日本語ざっくり解説[可能性があるエラー編]

↓↓↓↓↓↓↓ あなたの記事の内容
※こちらは2015/9/25日の古い記事です。（ESLint v1.5.1 released 22 September 2015）
現時点(2018/7/14)では[ESLint v5.1.0](https://github.com/eslint/eslint/releases)です。
最新のドキュメントを読みに行くことをオススメします。
(近いうち新たに加筆してこちらに更新する予定です)

こんにちは。<a href="/aboutme/">森田</a>と申します。芸人をしています。
───────
こんにちは。<a href="http://kenjimorita.jp/aboutme/">森田</a>と申します。芸人をしています。
※こちらは2015/9/25日の記事です。（ESLintさん v1.5.1 released 22 September 2015）
現時点では(2017/4/11)は[ESLint v4.0.0-alpha.0](http://eslint.org/blog/2017/04/eslint-v4.0.0-alpha.0-released)です。近いうち新たに加筆してこちらに更新する予定です。

↑↑↑↑↑↑↑ 編集リクエストの内容
よろしくお願いします。

![スクリーンショット 2015-09-25 1.25.33.png](https://qiita-image-store.s3.amazonaws.com/0/64377/162e5079-3aa5-cce3-95aa-acb13aea0f13.png)


[ESLint](http://eslint.org/)のエラールール。日本語で「ざっくりしたの」ないのか、と思ってググしても出てこなかったので[自分](http://kenjimorita.jp/)の勉強の為にも書いたよ。

※使い方は[こちら](http://eslint.org/docs/user-guide/getting-started)

こちらのページで記されているカテゴリーの他にもこういうのがあります。是非参考にしてみてください。(私にとっては大変勉強になりました。。)
[ESLintのエラールール。日本語ざっくり解説[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)

※このページは随時更新していきます
※もし「ざっくり」じゃなくて詳しく知りたかったら見出しがリンクになっていますので見に行ってくださいね。色々例題がありましたよ。
※以下文章長いので注意(もし探しているルールあったらcmd+F検索したらいいかもね)


以下はESlintさんの「Possible Errors」というカテゴリーで提案しているところです。ABC順。



## [comma-dangle](http://eslint.org/docs/rules/comma-dangle)

disallow or enforce trailing commas (recommended)

ES5ではOKだけどIE8だとErrorだよ

```js
var foo = {
    bar: "baz",
    qux: "quux",//
};
```

## [no-cond-assign](http://eslint.org/docs/rules/no-cond-assign)

disallow assignment in conditional expressions (recommended)

代入しちゃっているよ。typo

```js
// Check the user's job title
if (user.jobTitle = "manager") {
    // user.jobTitle is now incorrect
}
```

## [no-console](http://eslint.org/docs/rules/no-console)

disallow use of console in the node environment (recommended)

残っているコンソールログを許さない私は

```js
console.log("Made it here.");
console.error("That shouldn't have happened.");
```

## [no-constant-condition](http://eslint.org/docs/rules/no-constant-condition)

disallow use of constant expressions in conditions (recommended)

条件に定数式入れるのを許さない

```js
if (false) {//なんか変だ
	doSomethingUnfinished();
}
```

## [no-control-regex](http://eslint.org/docs/rules/no-control-regex)

disallow control characters in regular expressions (recommended)

正規表現での制御文字を許可しない

```js
var pattern1 = /\\x1f/;
var pattern2 = new RegExp("\x1f"); /*error Unexpected control character in regular expression.*/
```

## [no-debugger](http://eslint.org/docs/rules/no-debugger)

disallow use of debugger (recommended)

デバッガーの使用を許さない

```js
debugger;
```

## [no-dupe-args](http://eslint.org/docs/rules/no-dupe-args)

disallow duplicate arguments in functions (recommended)

同じ名前の仮引数があるよ？strictモード以外で重複する引数は最初の引数の値をマスクするけどね、

```js
/*eslint no-dupe-args: 2*/
function foo(a, b, a) {/*error Duplicate param 'a'.*/
    console.log("which a is it?", a);
}
```

## [no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys)

disallow duplicate keys when creating object literals (recommended)

keyが重複してるよ?

```js
var foo = {
    bar: "baz",
    bar: "qux"
};
```

## [no-duplicate-case](http://eslint.org/docs/rules/no-duplicate-case)

disallow a duplicate case label. (recommended)

そのcaseあるよーー

```js
var a = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 1:         // duplicate literal 1
        break;
    default:
        break;
}
```

## [no-empty-character-class](http://eslint.org/docs/rules/no-empty-character-class)

disallow the use of empty character classes in regular expressions

文字セットにはいってないよ

```js
var foo = /^abc[]/;
```

## [no-empty](http://eslint.org/docs/rules/no-empty)

disallow empty statements (recommended)

ブロック内に何もないよ

```js
if (foo) {
}
```

## [no-ex-assign](http://eslint.org/docs/rules/no-ex-assign)

disallow assigning to the exception in a catch block (recommended)

キャッチのブロックでエラーへの参照に上書きしているよ

```js
try {
    // code
} catch (e) {
    e = 10;
}
```

## [no-extra-boolean-cast](http://eslint.org/docs/rules/no-extra-boolean-cast)

disallow double-negation boolean casts in a boolean context

こういう反転させるのどうします？

```js
var foo = !!!bar;             /*error Redundant multiple negation.*/

var foo = !!bar ? baz : bat;  /*error Redundant double negation in a ternary condition.*/

var foo = Boolean(!!bar);     /*error Redundant double negation in call to Boolean().*/

var foo = new Boolean(!!bar); /*error Redundant double negation in Boolean constructor call.*/

if (!!foo) {                  /*error Redundant double negation in an if statement condition.*/
    // ...
}
```

## [no-extra-parens](http://eslint.org/docs/rules/no-extra-parens)

disallow unnecessary parentheses

不必要な()を許さない。never

```js
/*eslint no-extra-parens: 2*/
a = (b * c); /*error Gratuitous parentheses around expression.*/

(a * b) + c; /*error Gratuitous parentheses around expression.*/

typeof (a);  /*error Gratuitous parentheses around expression.*/
```

## [no-extra-semi](http://eslint.org/docs/rules/no-extra-semi)

disallow unnecessary semicolons (recommended) (fixable)

不必要なセミコロンあります。冷やし中華始めました

```js
/*eslint no-extra-semi: 2*/
var x = 5;;/*error Unnecessary semicolon.*/

function foo() {
    // code
};  /*error Unnecessary semicolon.*/
```

## [no-func-assign](http://eslint.org/docs/rules/no-func-assign)

disallow overwriting functions written as function declarations (recommended)

機能の再割り当てを許さない

```js
function foo() {}
foo = bar;        /*error 'foo' is a function.*/

function foo() {
    foo = bar;    /*error 'foo' is a function.*/
}
```

## [no-inner-declarations](http://eslint.org/docs/rules/no-inner-declarations)

disallow function or variable declarations in nested blocks

ネストブロックの中での関数と変数の宣言を許さない

```js
// Good
function doSomething() { }

// Bad
if (test) {
    function doSomethingElse () { }
}

function anotherThing() {
    var fn;

    if (test) {

        // Good
        fn = function expression() { };

        // Bad
        function declaration() { }
    }
}
```

## [no-invalid-regexp](http://eslint.org/docs/rules/no-invalid-regexp)

disallow invalid regular expression strings in the RegExp constructor (recommended)

RegExpオブジェクトのコンストラクタで無効な正規表現の文字列を許可しない

```js
/*eslint no-invalid-regexp: 2*/

RegExp('[')      /*error Invalid regular expression: /[/: Unterminated character class*/

RegExp('.', 'z') /*error Invalid flags supplied to RegExp constructor 'z'*/

new RegExp('\\') /*error Invalid regular expression: /\/: \ at end of pattern*/
```

## [no-irregular-whitespace](http://eslint.org/docs/rules/no-irregular-whitespace)

disallow irregular whitespace outside of strings and comments (recommended)

文字列やコメントの外に不規則な空白を許可しない

```js
/*eslint no-irregular-whitespace: 2*/

function thing() /*<NBSP>*/{ /*error Irregular whitespace not allowed*/
  return 'test';
}

function thing( /*<NBSP>*/){ /*error Irregular whitespace not allowed*/
  return 'test';
}

function thing /*<NBSP>*/(){ /*error Irregular whitespace not allowed*/
  return 'test';
}

function thing᠎/*<MVS>*/(){   /*error Irregular whitespace not allowed*/
  return 'test';
}

function thing() {
  return 'test'; /*<ENSP>*/  /*error Irregular whitespace not allowed*/
}

function thing() {
  return 'test'; /*<NBSP>*/  /*error Irregular whitespace not allowed*/
}
```

## [no-negated-in-lhs](http://eslint.org/docs/rules/no-negated-in-lhs)

disallow negation of the left operand of an in expression (recommended)

式の中の左オペランドの否定を許可しない

```js
/*eslint no-negated-in-lhs: 2*/

if(!a in b) {       /*error The `in` expression's left operand is negated*/
    // do something
}
```

## [no-obj-calls](http://eslint.org/docs/rules/no-obj-calls)

disallow the use of object properties of the global object (Math and JSON) as functions (recommended)

グローバルオブジェクトの関数呼び出しを許可しない

```js
/*eslint no-obj-calls: 2*/

var x = Math(); /*error 'Math' is not a function.*/
var y = JSON(); /*error 'JSON' is not a function.*/

var x = math();//ok
var y = json();//ok
```

## [no-regex-spaces](http://eslint.org/docs/rules/no-regex-spaces)

disallow multiple spaces in a regular expression literal (recommended)

正規表現リテラルの中の２文字以上のスペースを許さない

```js
/*eslint no-regex-spaces: 2*/
var re = /foo   bar/; /*error Spaces are hard to count. Use {3}.*/
```

## [no-sparse-arrays](http://eslint.org/docs/rules/no-sparse-arrays)

disallow sparse arrays (recommended)

まばらなやつを許さない逮捕

```js
/*eslint no-sparse-arrays: 2*/
var items = [,];                 /*error Unexpected comma in middle of array.*/
var colors = [ "red",, "blue" ]; /*error Unexpected comma in middle of array.*/
```

## [](http://eslint.org/docs/rules/no-unreachable)

disallow unreachable statements after a return, throw, continue, or break statement (recommended)

リターンやエラーがスローされた等の後に書いてあるやつを私たちは決して許さない。絶対

```js
/*eslint no-unreachable: 2*/

function foo() {
    return true;
    console.log("done");      /*error Found unexpected statement after a return.*/
}

function bar() {
    throw new Error("Oops!");
    console.log("done");      /*error Found unexpected statement after a throw.*/
}

while(value) {
    break;
    console.log("done");      /*error Found unexpected statement after a break.*/
}

throw new Error("Oops!");
console.log("done");          /*error Found unexpected statement after a throw.*/
```

## [use-isnan](http://eslint.org/docs/rules/use-isnan)

disallow comparisons with the value NaN (recommended)

isNaNを使わないのを許さないよ。あたしゃ。あたしゃ浅香光代だよ。

```js
/*eslint use-isnan: 2*/

if (foo == NaN) { /*error Use the isNaN function to compare with NaN.*/
    // ...
}

if (foo != NaN) { /*error Use the isNaN function to compare with NaN.*/
    // ...
}

/*eslint use-isnan: 2*/

if (isNaN(foo)) {//ok
    // ...
}

if (isNaN(NaN)) {//ok
    // ...
}
```

## [valid-jsdoc](http://eslint.org/docs/rules/valid-jsdoc)

Ensure JSDoc comments are valid

JSDocのコメントが有効であるか確認してね

```js
/*eslint valid-jsdoc: 2*/

// missing type for @param and missing @returns
/**                                 // 2 errors
 * A description
 * @param num1 The first number.
 */
function foo(num1) {
    // ...
}
// missing description for @param
/**                                 //error Missing JSDoc parameter description for 'num1'.
 * A description
 * @param {int} num1
 * @returns {void}
 */
function foo(num1) {
    // ...
}

// no description for @returns
/**                                 //error Missing JSDoc return description.
 * A description
 * @returns {int}
 */
function foo() {
    // ...
}
// no type for @returns
/**                                 //error JSDoc syntax error.
 * A description
 * @returns Something awesome
 */
function foo() {
    // ...
}
```

## [no-reserved-keys](http://eslint.org/docs/rules/no-reserved-keys)

disallow reserved words being used as object literal keys

予約語をオブジェクトリテラルのキーとして使うことを許さない

```js
var values = {
    enum: ["red", "blue", "green"]  // throws an error in ECMAScript 3
}
```

## [valid-typeof](http://eslint.org/docs/rules/valid-typeof)

Ensure that the results of typeof are compared against a valid string (recommended)

typeof演算の結果が有効な文字列と比較されていることを確認する

```js
/*eslint valid-typeof: 2*/
typeof foo === "strnig"   /*error Invalid typeof comparison value*/
typeof foo == "undefimed" /*error Invalid typeof comparison value*/
typeof bar != "nunber"    /*error Invalid typeof comparison value*/
typeof bar !== "fucntion" /*error Invalid typeof comparison value*/
```

## [no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline)

Avoid code that looks like two expressions but is actually one

二つの式のように見えますが、実際には1であるコードを避けてください

```js
/*eslint no-unexpected-multiline: 2*/
var foo = bar
(1 || 2).baz();               /*error Unexpected newline between function and ( of function call.*/

var hello = 'world'
[1, 2, 3].forEach(addNumber); /*error Unexpected newline between object and [ of property access.*/
```


##　さいごに

はは〜ぁ。愛情愛情〜。

他にもこういうのあります。
[ESLintのエラールール。日本語ざっくりver2[ベストプラクティス編]](http://qiita.com/M-ISO/items/4cd183e2496c2937a53e)
[ESLintのエラールール。日本語ざっくり解説[スタイル編]](http://qiita.com/M-ISO/items/113ddd448bdc496af783)
[ESLintのエラールール。日本語ざっくり解説[ES6編]](http://qiita.com/M-ISO/items/f0c2f0e669db32cf4efb)



