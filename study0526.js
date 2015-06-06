$('a').each(function(){
	//continue
	if(index < 10 ) return ;
	//break;
	if(index > 100) return false;
	alert('10~100までの',this);
})

//jQueryオブジェクトが保持する最初の要素を返す
$('#id').get(0);
//getは通常の配列に対する操作が可能
var div = $('div').get();
div.pop()

//$('#target').beforeで要素が追加される位置
'<div id="target">
$('#target').prependで要素が追加される位置
<img>
$('#target').appendで要素が追加される位置
</div>
'
//$('#target').afterで要素が追加される位置


//appendとappendToの違い
//appendは引数として新しい要素を指定するため()が入れ子になる
$('#id').append(
	$('<button>').click(function(){
		alert('click');
	}).css({
		'position' : 'absolute',
		'top' : 0,
		'left' : 0
	})
);
//appendToの場合全てが一つのメソッドチェインにつながるため括弧の入れ子を減らせる
$('button').appendTo('#id').click(function(){
	alert('click');
}).css({
	'position' : 'absolute',
	'top' : 0,
	'right' : 0
});


.dataは呼び出されたjQueryオブジェクトに対して変数の保存参照をする
//#idに対してkeyという名前でvalを保存する
$('#id').data('key','val');
//#idに対してkeyという名前の変数を参照する
var val = $('#id').data('key');
//dataはundfind以外は保持できるオブジェクト、関数、html要素も保持できる
//注意点
//removeDataを引数なしで呼び出さない
//undfinedやnull、0などを引数でよびださない
//引数を指定すれば問題ない
//
//大きなデータを保持しない
//不要になった時点でremoveDataをする
//
//events、handleという名前を使用しない
//すでに要素が使っているので上書きしてしまうため

// 例
// ボタンがクリックされたかを保持する例。「最初のクリックか否か」を保持している
$('button').click(function(){
	var click = $(this).data('click');
	if(click) return;
	alert('first click');
	$(this).data('click',true);
})




//イベントデリゲート
//実際にイベントを捕捉する要素の上位要素に対してイベントを監視し、
//下位要素でイベントが発生した際に発生元要素が対象要素か否かを確認することで
//イベントハンドラ呼び出しを行う技術
//以下のような利点がある
//
//１、イベント設定の回数を抑えられる
//・多数の要素に対して個別にイベントを設定する場合イベントを設定するための処理時間が問題となる可能性がある
//これに対してイベントデリゲートを使用した場合は、実際は一つのイベントを設定するだけなので、
//発生元要素数に依存せず高速にイベント設定ができる
//
//２，下位要素の状況に依存せずイベントを設定できる
//通常のイベント設定では、対象要素がＤＯＭツリー上に存在していない場合にはイベント設定ができません。
//これに対してイベントデリゲートを使用した場合は現在ＤＯＭツリー上に存在していない要素にもイベント設定できます
//
//
//
//
//clickは呼び出す旅同じ処理をするが、toggleはクリックされるごとに設定した関数が順次呼び出される
$('#id').toggle(function(){
	alert('toggle on');
},function(){
	alert('toggle off');
});

//changeは要素の値が変化した際に呼び出される
$('input[type="text"]').change(function(){
	alert('change');
});

//.triggerは設定されているイベントの呼び出しを行う。第一引数に呼び出したいイベント名を指定します。
//
//
$('#id').trigger('click');
//
//
//
//
//
//エフェクトの停止
//.stopは現在実行されているエフェクトを停止します
//stopは主に、同じイベントが複数回呼び出されることを防止するために、ユーザーが呼び出すイベントないで使用する
//$('#id').stop();
//
//
//エフェクトが連続で呼び出されたときの処理
//高速でhoverすると止まらなくなる
$('.menu').hover(function(){
	$(this).find('ul').slideDwon();
},function(){
	$(this).find('ul').slideUp();
});
//先に実行されているエフェクトを.stopで停止させる処理を行う必要がある

$('.menu').hover(function(){
	$(this).find('ul').stop().slideDwon();
},function(){
	$(this).find('ul').stop().slideUp();
});
//.stop()はその時点で実行されている最初のエフェクトを中止する。
//第1引数にtrueを渡すことでその時点で実行待ちになっているエフェクトをすべて停止、第2引数にtrueを
//渡すことで現在実行されているエフェクトを完了形に変更する機能があります。
//
//
//イベントを全てキャンセルしたうえでスライドダウン、アップする
$('.menu').hover(function(){
	$(this).find('ul').stop(true,true).slideDwon();
},function(){
	$(this).find('ul').stop(true,true).slideUp();
});
//
//エフェクト記述で気をつけること
//・複数の要素を同時に動かさない→どうしても動かす必要がある場合画面上に表示されていない要素は停止させられないかを検討
//・エフェクトの実行時間を短くする
//.javascript以外の実現方法を検討する
//
//
//引数にオブジェクトを指定為た場合は、
//オブジェクトの値をthis
//オブジェクトのkeyを第1引数で渡す
$.each({
'key' : 'val1',
'key2' : 'val2'
},function(key){
	alert(key + '=' + this);
});


//extendは第1引数のオブジェクトに対し、第2引数以降のオブジェクトの内容を追加する
$.extend(object,{
	'key' : 'val1',
	'key2' : 'val2'
});
//上記はオブジェクトに対してkey1,key2が含まれたオブジェクトの内容を追加しているが、
//このときオブジェクトの中にkey1,key2が含まれている場合、引数のオブジェクトの内容で上書きされる
//
//また、extendは追加されたオブジェクトの内容を返すため
//次のようにオブジェクトをコピーする場合にも使用される
var new_object = $.extend({},object);

//
//
//
//
//
//
////////////////////////////////////
///
///jQueryプラグイン
///jQuery.fnに関数を追加することで実装されている
///
///
///jQuery.fun = {
/// hover : function(){
/// return this.hohooho
/// }
//};
///
///
///
///関数型とメソッド型
///
///
///$から直接呼び出す関数型
///関数型は引数に指定された内容の処理やjQuery自体に関わる処理などのＤＯＭに影響しない処理を行う
///.ajaxや.supportなどがある
///ajaxは関数型のため$()から呼び出すことはできない
///$('#fa').ajax({
///	'type' : 'POST',
///	'url' : 'http://,
///	'success' : function(data){}
///})


///$()の結果に対して呼び出すメソッド型
///メソッド型は主にＤＯＭ ＡＰＩやメソッドチェインに関する処理を行う
///findやclick
///メソッド型のため呼び出すことはできない
///$.css({
///'display' : none
///})
///
///※each()は$と$()に同じ名前のメソッドが定義されているためいずれであっても呼び出せる
///$().eachとは別のメソッド。引数に注意
///$.each([1,2,3],function(){});
///
///$.eachとは別メソッド引数に注意
///$('.class').each(function(){});
///
///
////////////////////////////////////////
///
///
///alert('newPlugin')を実行するプラグインを関数型とメソッド型で実装する
///
///関数型プラグイン
///$.new_plugin()で呼び出す
$.new_plugin = function(){
	alert('new_plugin');
};
// $.new_plugin();
//DOMを変更しないのであれば関数型プラグイン
//
//関数型プラグインの作り方
//関数型プラグインを作成する場合、$のプロパティに直接関数を代入する
$.new_plugin = function(a,b){
return a + b;
};
//alert($.new_plugin(1,2));
//基本的に通常の関数定義と変わらないため、引数、戻り値などはそのまま受け渡しできます
//
//
// メソッド型プラグイン
// $().new_plugin()で呼び出す
$.fn.new_plugin = function(){
	alert('new_plugin');
};
//DOMを変更するのであればメソッド型プラグイン
//
//メソッド型プラグインの作り方
//メソッド型プラグインを作成する場合、$.fnのプロパティに関数を代入します
$.fn.new_plugin = function(a,b,c){
	console.log(a,b,c,this)
};
$('#id').new_plugin(1,2,3);
//
//
//プラグイン内ではthisが現在選択されているjQueryオブジェクトになるため、
//thisに対して直接APIを呼び出すことで操作できる
//
//プラグイン内からreturnした変数はそのプラグインを呼び出した場所で受け取ることができますが、
//メソッド型プラグインの場合はメソッドチェインをつなげるためにjQueryオブジェクトを返すのが一般で気です
//メソッド型プラグインで特に値を返す必要がない場合には最後にreturn thisをしましょう
//
//
//外部にプラグインを公開する場合
//
//
//
