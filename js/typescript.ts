//オーバーロードを使用して引数の型を限定した例
function a(x: string);
function a(x: number);
function a(x: any){
alert(x);
}
a("eee");
a(9);
//ジェネリックを使うことで他の型にも対応できる
function b<T>(x: T) {
	alert(x);
};
b<string>("fafa");
b<number>(9);

//class構文の時の使い方
//name型は型引数で利用時に決定する
class MyPerson<T>{
	public name: T;
}
//型引数は２つ設定できる
function c<T,U>(t:T,u:U){
	alert(t);
	alert(u);
}
c<string,number>('finger',1);

//型引数を戻り値に設定する
function d<T>(t: T): T {
	return t;
}
alert(d<number>(1234));

//ローカル変数のために指定した型引数
function e<T>() {
	var x: T = null;
	alert(x);
}
e<number>();

//ジェネリックの型推論
function g<T>(x : T){
	alert(x instanceof Date);
}
g<string>("new Date()");
g<Date>(new Date());

//コンパイラに型推論可能なら省略可能
function h<T>(x : T){
	alert(x instanceof Date);
}
h("new Date()");
h(new Date());

//型推論できない場合
function j<T>(x: T): T {
	alert(x);
	return x;
}
function k(x) {//型指定されていないのでany
	var y = j(x);
}
k(new Date());

// まとめ
// ジェネリックは、使用されるまで不明の任意の型を利用する技術
// 型引数が、任意の型に対応する
// 値が変化するときは引数。型が変化する時は型引数で関数をまとめられる
// 引数は関数に付けるものだが、型引数はクラスやインターフェースにも付けられる
// 型引数は複数あってよい
// 型引数は、引数、戻り値の型指定、関数やクラスの内部にも使用できる
// 型引数の型はコンパイラが推論してくれるが、頼りすぎは禁物
// 型には制約を付けることができる
// ジェネリックは、コレクションと相性がよい
// 一般的に、コードサイズが大きくなっていくと、ジェネリックの出番が増えていく
// 参照(http://www.buildinsider.net/web/tsgeneric/01)
