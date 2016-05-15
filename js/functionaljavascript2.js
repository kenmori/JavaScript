//https://github.com/fogus/lemonad
//参照javascriptで学ぶ関数型プログラミング 「O'REILY」
//<script src='//jashkenas.github.io/underscore/underscore-min.js'></script>
var letters = ['a', 'b', 'c', 'd', 'e', 'f'];

letters[1];//b

//抽象の意味とは個別の基本的な動作を保持し、あちこちで使い回すための簡単な方法を提供すること

//インデックス指定という動作を保持して使い回す(抽象化)
function naiveNth(a, index){
  return a[index];
};
naiveNth(letters, 1);//b

//しかしインデックス不可能なオブジェクトを渡すと動作しない
naiveNth({}, 1);
//undefined

//improve
//nth関数はインデックス指定可能なデータ型をもったデータから有効なインデックスで指定される要素を返す
//与えられたデータが有効なデータ型か見分けるためにisIndexed関数を作ることができる
function isIndexed(data){
 return _.isArray(data) || _.isString(data);
}

function fail(value){
 console.log(value);
};

//isIndexed関数を使ってnthを抽象化
function nth(a, index){
  if(!_.isNumber(index)) fail('インデックスは数値である必要があります');
  //_.isNumberはunderscore関数
  if(!isIndexed(a)) fail('インデックス指定可能でないデータ型はサポートされていません');
  if((index < 0) || (index > a.length -1)) fail('指定されたインデックスは範囲外です');

  return a[index];
};
console.log(nth(letters, 1));
//'b'
console.log(nth('abc', 0));
//'a'
nth({}, 2);
//'インデックス指定可能でないデータ型はサポートされていません'
nth(letters, 400);
//'指定されたインデックスは範囲外です'
nth(letters, 'aaaaa');
//'インデックスは数値である必要があります'

//2番目の要素を返す動作を抽象化
function second(a){
  return nth(a, 1);
}
second(['a', 'b']);//'b'
second('morita');//'o'
second({});//'インデックス指定可能でないデータ型はサポートされていません'



/////////////////////////////////
///
[2, 3, -6, 0, -108, 42].sort();
//[-108, -6, 0, 2, 3, 42]
//うまくsortできている

///組み合わせを変えると。。
[0, -1, -2].sort();
//[-1, -2, 0]

[2, 3,-1, -6, 0, -108, 42, 10].sort();
//[-1, -108, -6, 0, 10, 2, 3, 42]


//うまくいかない
//Array#sort　メソッドに引数を渡さない場合は配列内の要素を文字列に変換して辞書順にソートする為
//コンパレータ関数を渡す・・・２つの値をひきすうにとり１つ目の引数が2つ目より小さい場合負の値を、大きい場合正の値を返す関数
//

[2, 3,-1, -6, 0, -108, 42, 10].sort(function(x, y){
 if (x < y) return -1;
 if (y < x) return 1;
 return 0;
});
//[-108, -6, -1, 0, 2, 3, 10, 42]

//汎用的にする
//コンパレート関数に名前を与えることで他の場所でのsortに利用できる

function compareLessThanOnEqual(x, y){
 if (x < y) return -1;
 if (y < x) return 1;
 return 0;
}

[2, 3,-1, -6, 0, -108, 42, 10].sort(compareLessThanOnEqual);
//[-108, -6, -1, 0, 2, 3, 10, 42]
//正しくなるが。。


//compareLessThanOnEqualの問題は「コンパレータっぽさ」に従っているため汎用的な比較操作が簡単に
//行うことができない場合がある

if(compareLessThanOnEqual(1, 1)) console.log("同じか小さい");
//何も返さない

//思い通りに動作を実現するためにはcompareLessThanOrEqual関数がコンパレータであるということをあらかじめ知っている
//必要がある
//
if (_.contains([0, -1], compareLessThanOrEqual(1, 1))
console.log('同じか小さい');
//同じか小さい
//Underscore.jsの_.contains(list, value)は valueがlist内に存在する場合にtrueを返す。listが配列の場合はindexOfで処理する


//上記の場合。compareLessThanOrEqualの１つめの引数が2つめより小さい場合に例えば「−42を返す」と修正した場合バグる。
//よりよい書き方
//プレディケート・・・常に真偽値を返す関数
function lessOrEqual(x, y){
 return x <= y;
}

[2, 3,-1, -6, 0, -108, 42, 10].sort(lessOrEqual);
//[42, 10, 3, 2, 0, -1, -6, -108]

//順番がおかしいのはsortはコンパレート関数が渡ってくると期待しているが、プレディケートが渡っているから

//プレディケートをコンパレートの世界に適応させる必要がある
//そのためにプレディケート関数を引数にとり、その関数をコンパレータ関数に変換する関数を定義することで解決する


//その前に。。

//existyとtruthyの定義
//【existy】　・・・ nullとundefinedという「存在しないこと」をしめす値。//existyは与えられた引数がnullやundefinedではないことを確認する

function existy(x) { return x !=null };

existy(null)
//false
existy(1)
//true
existy(undefined)
//false
existy({}.notHere);
//false
existy((function(){})());
//false
existy("")
//true
existy("undefined")
//true

existy(0) //0は本来falseだが真とする。0が偽となると判定したい場合使わない
//true

//【truthy】　・・・ 与えられた「値がtrueとみなされるかどうか」を判定する
function truthy(x) { return (x !==false) && existy(x)}

truthy(false)
//false

truthy('')
//true

truthy(0)
//true


//話にもどる。。
//プレディケート関数を引数にとり、その関数をコンパレータ関数に変換する関数を定義する

function comparator(pred){
 return function(x, y){
  if (truthy(pred(x, y)))
    return -1;
  else if(truthy(pred(y, x)))
    return 1;
  else
    return 0;
 };
}

//このcomparator関数を使ってlessOrEqualのようなプレディケート関数が返す値(true,false)をコンパレータが返すような値(-1,0,1)に「マッピング」することができる

[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual))
//[-2, -1, -1, 0, 1, 10, 100]
