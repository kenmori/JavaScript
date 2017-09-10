## JavaScriptパターン

###　即時実行関数

・(function(){}()); jsLInt奨励はこっち (function(){})()渡したいときだけ
・読み込みじ一回だけの初期設定なので名前付き関数がいらない 。グローバルスコープに変数を作らないで初期設定するため

```js
var result = (function(){
    return 2 + 2;
}())
var result = function(){
    return 2 + 2;
}()
```

オブジェクトが生きている間決して変更されないとき -> 即時関数。プロパティ値の初期表示

```js
var o = {
    message: (function(){//スクリプトが読み込まれる前に実行することで値づくりを支援する
        var who = "me",
        what = "call";
        return what + " " + who;
    }()),
    getMsg: function(){
        return this.message;
    }
}
```

### 即時オブジェクト初期化(immediate objecxt initialization)
・initメソッドのあるオブジェクトを実行する

```js
({
    name: 'fafa',
    getName: function(){
        return this.name;
    },
    init: function(){
        console.log(this.getName())
        //return this;init後もし参照したかったら
    }
}).init();
//fafa
```
・JavaScriptは{}を()で囲むとコードブロックとしてではなくオブジェクトリテラルとして扱います(グループ化演算子)
```js
let a = 1, b = 2, c = 3;
a + b * c
//7

( a + b ) * c //グループ化演算子
```
・オブジェクトだけを包む代わりにオブジェクトとinit()呼び出しをグループ化のかっこで囲むこともできる

```js
({}).init()
({}.init())

```

・即時関数は複雑な初期設定には向いていない。その場合「即時オブジェクト初期化」がいい
・初期化の全体像が即時関数より掴みやすい
・欠点はミニファイアする際にプロパティとメソッドが短絡名になる
・このパターンは一回きりの作業かつ完了後にオブジェクトへのアクセスをしない場合最適
・init後に参照したかったらreturn thisで返す


### 即時分岐(読み込み時分岐)
環境が変わることはないので1回の判定でいい -> グローバルに持たない
・ブラウザの識別
・DOM要素のスタイル計算
・イベントハンドラ設定


```js

var util = {
    addEventLisner : function(el, type, fn){
        //ここの中でブラウザに組み込まれているか呼び出されるたびに確認しているのが辛い
        if(typeof window.addEventListener === 'function' ){

        } else if (typeof document.attachEvent === 'function'){

        } else {
            el['on' + type] = fn;
        }
    },
    removeListener : function(el, type, fn){
        //同様の処理
    }
}

//変更後

var util = {
    addEvrentListener: null,
    removeEventListener: null
}

if(typeof window.addEventListener === 'function'){
    util.addListener = function(el, type, fn){
        el.addEventListener(type, fn, false);
    }
    util.removeListener = function(el, type, fn){
        el.removeEventListener(type, fn, false);
    }
    else if(typeof document.attachEvent === 'function'){
        ・・・//同様
    }
}
//ifを使うたびに毎回呼ぶのではなく一回しか通らないifは外出しして分岐の中でutilをセットする。ページが存在する間ずっと機能する
```


//知らなかった
```js
function func(a, b, c){}
func.length//3 関数が期待する引数が返る

```

### メモ化

関数の結果をキャッシュすることをメモ化という



```
言葉
・自己呼び出し関数、自己実行関数、IFEE

```


