// 継承したクラスのインスタンスは、親クラスの型としても扱える
// つまりgreetingManクラスのオブジェクトを型とする変数に格納できる
// しかし、それからgreeting関数は呼び出せない。中に入っているオブジェクトはそれを持っているが
// 変数の型がそれをもっていないから
// 3種類の型の変数で同じmoritaオブジェクトを受けた場合の違いをみてみる

class man {
	constructor(public name:string){

	}
}
class greetingMan extends man{
	greeging(){
		alert(this.name + "君");
	}
}
class morita extends greetingMan{
	constructor(){
		super("kenji");
	}
}
var kenji1: man = new morita();
var kenji2: greetingMan = new morita();
var kenji3: morita = new morita();

kenji2.greeting();
kenji3.greeting();
