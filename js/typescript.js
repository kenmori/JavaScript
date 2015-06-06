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
var realPerson = (function () {
    function realPerson() {
    }
    realPerson.prototype.greeting = function () {
        alert("Hello,I'm" + this.name);
    };
    return realPerson;
})();
var a = new realPerson();
a.name = "Morita";
a.greeting();
