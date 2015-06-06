// class cat {
// 	public name = "Unknown";
// }
// var x = new cat();
// alert(x.name);


//###1
// class cat {
// 	public name: string;
// 	public age: number;
// 	constructor(name: string,age: number){
// 		this.name = name;
// 		this.age = age;
// 	}
// }
// var x = new cat("Mee-kun",1);
// alert(x.name + "は" + x.age + "歳");

//###2
//1と全く同じ結果を出すコンストラクター
//コンストラクターにアクセシビリティのキーワードが付くと、その引数には同名のメンバーが存在し
//そのメンバーに値が引き継がれることを意味する。
//メンバーを宣言せずともメンバーが誕生し、コンストラクタでの代入が行われなくともそこに引数を経由して値が入る
//
// class cat {
// 	constructor(public name: string,public age: number){
//
// 	}
// }
// var x = new cat("Mee-Kun",1);
// alert(x.name + "は" + x.age + "歳");


//上記を使うには制約がある
//引数名とメンバーが同じ
//値をコンスタラクターで加工することがない
//
class man {
	public name: string;
	constructor(firstName: string, lastName: string){
		this.name = lastName + firstName;
	}
}
var x = new man("賢二","森田");
x.name[1];
