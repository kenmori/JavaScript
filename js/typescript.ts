// class realPerson{
// 	name : string;
// 	greeting(){
// 		alert("Hello,I'm" + this.name);
// 	}
// }
// var a = new realPerson();
// a.name = "Kodai";
// a.greeting();
//
//interfaceは実装を持たないことを特徴とする
//これと同じ定義を持つインターフェースはキーワードinterfaceを用いて
//以下のように定義することができる
//
//
// interface abstractPerson{
// 	name: string;
// 	greeting():void;//実装が内interfaceの場合は
	//明示的に教えないと型が決まらない
// }
// var a = new abstractPerson();
//動作するための実体を持っていない

interface abstractPerson{
	name:string;//実体はない
	greeting():void;
}
class realPerson implements abstractPerson{
	name: string;//実体を持つ
	greeting(){
		alert("Hello,I'm" + this.name);
	}
}
var a = new realPerson();
a.name = "Morita";
a.greeting();
//interfaceを実装しているrealPersonは定義に反する定義にすると
//コンパイルエラーになる
//逆を言えば同じインターフェイスを実装しているクラスには同じ名前の
//メンバーが常に存在していることになる
//同じメンバーが常にそん座視していることになる
