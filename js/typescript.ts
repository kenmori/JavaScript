// class man {
// 	constructor(public name: string){}
// }
// function greeting(){
// 	alert(this.name + "君");
// }
// man.prototype["greeting"] = greeting;
// var morita = new man("morita");
// morita["greeting"]();
//
// var morim = new man("morim");
// morim["greeting"]();

//上記だとgreeting機能が要らない場合無駄が増える
//greetingのつづりを間違えてもコンパイルエラーにはならない
//greeting　お引数の数や型を間違えてもコンパイルエラーにはならない
//型に関する扱いが杜撰すぎる


//上記の問題を解決
class man {
	constructor(public name : string){}
}
class greetingMan extends man{
	greeting(){
		alert(this.name + "君");
	}
}
var morita = new greetingMan("morita");
morita.greeting();
