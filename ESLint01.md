# ESLintのエラールール。日本語ざっくり解説[ES6編]


[ESLint](http://eslint.org/)のエラールール。日本語「ざっくりしたの」ないのか、と思ってぐぐしてもなさそうなので書きました。


※こちらは2015/9/25日の記事です。（ESLintさん v1.5.1 released 22 September 2015）
現時点(2017/4/11)では[ESLint v4.0.0-alpha.0](http://eslint.org/blog/2017/04/eslint-v4.0.0-alpha.0-released)です。近いうち新たに加筆してこちらに更新する予定です。

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


##[no-await-in-loop](http://eslint.org/docs/rules/no-await-in-loop)

Disallow await inside of loops

ループ内のawaitを許可しない

```js
//bad
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    //それぞれのイテレーションループは全体の非同期が完了するまで遅らされます
    results.push(await bar(thing));
  }
  return baz(results);
}

//good
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    //全ての非同期オペレーションは即時スタートされます
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```


##[no-compare-neg-zero](http://eslint.org/docs/rules/no-compare-neg-zero)

disallow comparing against -0
反対に比較されていることを許可しない
例えば、x === -0　のようなコードは+0と-0はtrueを返します。それを許さない


```js
//bad

if (x === -0) {
    // doSomething()...
}


//good
if (x === 0) {
    // doSomething()...
}

//good
if (Object.is(x, -0)) {
    // doSomething()...
}


This rule was introduced in ESLint 3.17.0.
```

## [no-cond-assign](http://eslint.org/docs/rules/no-cond-assign)

disallow assignment operators in conditional statements

if、for、while、do...whileステートメントの中で曖昧なオペレーションを割り当てることを不許可

```js
//bad

/*eslint no-cond-assign: "error"*/
// Unintentional assignment
//意図しない割り当て
var x;
if (x = 0) {
    var b = 1;
}


//good
// Assignment replaced by comparison
//割り当ては比較に置き換わる
var x;
if (x === 0) {
    var b = 1;
}

```


## [disallow the use of console](http://eslint.org/docs/rules/no-console)

disallow the use of console
consoleの使用を不許可

```js
/*eslint no-console: "error"*/

console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");

//good
/*eslint no-console: "error"*/

// custom console
Console.log("Hello world!");
```

## [no-constant-condition](http://eslint.org/docs/rules/no-constant-condition

disallow constant expressions in conditions
条件に定数式入れるのを許さない

```js
//bad
/*eslint no-constant-condition: "error"*/

if (false) {
    doSomethingUnfinished();
}

if (void x) {
    doSomethingUnfinished();
}

for (;-2;) {
    doSomethingForever();
}

while (typeof x) {
    doSomethingForever();
}

do {
    doSomethingForever();
} while (x = -1);

var result = 0 ? a : b;

//good
/*eslint no-constant-condition: "error"*/

if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

var result = x !== 0 ? a : b;


This rule was introduced in ESLint 0.4.1.
```


## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```

## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```

## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```

## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```

## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```

## []()

equire parens in arrow function arguments

アロー関数の引数でequire括弧。

```js
//bad

//good
```




