// class man{
// 	constructor(public name: string){
// 	}
// }
// class greetingMan extends man{
// 	greeting(){
// 		alert(this.name + "さん!");
// 	}
// }
// class moritaKun extends greetingMan{
// 	greeting(){
// 		alert(this.name + "君")
// 	}
// 	constructor(){
// 		super("morita");
// 	}
// }
// var morita1:man = new moritaKun();
// var morita2:greetingMan = new moritaKun();
// var morita3:moritaKun = new moritaKun();
//型の上書き「その型とみなしてください」という意味
// (<greetingMan>morita1).greeting();
// morita2.greeting();
// morita3.greeting();
//greetingManクラスのgreeting関数はmoritaKunクラスのgreeting関数によって
//置き換えられてしまったので
//必ず置き換え済みの関数が呼び出されてしまう
//superキーワード経由で親クラスを呼び出してみる
class man{
	constructor(public name: string){
	}
}
class greetingMan extends man{
	greeting(){
		alert(this.name + "さん!");
	}
}
class moritaKun extends greetingMan{
	greeting(){
		super.greeting();
		alert(this.name + "君")
	}
	constructor(){
		super("morita");
	}
}
var morita = new moritaKun();
morita.greeting();
