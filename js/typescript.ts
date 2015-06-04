//
//
//
// class cat {
// 	name : string;
// 	myau(){alert(this.name + 'は泣きました')}
// 	localAge : number;
// 	get age(){return this.localAge;}
// 	set age(value){
// 		if(value < 0) throw "ageは負の数では無いはず";
// 		this.localAge = value;
// 	}
// 	constructor(){
// 		alert("constructed");
// 		this.name = "Unknown";
// 		this.age = 1;
// 	}
// }
// var x = new cat();
// x.name = "nya-chan";
// alert(x.name);
// x.myau();
// x.age = 5;
// alert(x.age);
//
//
//アクセシビリティを付ける。このままだと
//setを通らない直接の値代入が可能になる。x.localAge = -5;
//privete:クラスの外からは利用できない。内部利用のみ(値の保存専用の変数)
//public: クラスの内外から無制限で利用できる(外部からの受付窓口)
//
class cat {
	public name : string;
	public myau(){alert(this.name + 'は泣きました')}
	private localAge : number;
	public get age(){return this.localAge;}
	public set age(value){
		if(value < 0) throw "ageは負の数では無いはず";
		this.localAge = value;
	}
	public constructor(){
		alert("constructed");
		this.name = "Unknown";
		this.age = 1;
	}
}
var x = new cat();
x.name = "nya-chan";
alert(x.name);
x.myau();
//x.localAge = -5//書き換えようとするとコンパイルエラーになる
x.age = 5;
alert(x.age);
