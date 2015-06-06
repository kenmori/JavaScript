//createElement関数で使用されている機能として、特殊化されたシグネチャがある。
//これは文字列の引数の値によって返す型を変動させる機能がある

class male{
	sayMale(){
		alert("俺は男だ");
	}
}
class female{
	sayFemale(){
		alert("俺は女だ");
	}
}
interface abstractPersonBuilder{
	create(sex: "male"): male;
	create(sex: "female"): female;
	create(sex: "string"): any;
}
class builder implements abstractPersonBuilder{
	create(sex: string): any{
		if(sex == "male") return new male();
		else return new female();
	}
}
var a: abstractPersonBuilder = new builder();
var f = a.create("female");
f.sayFemale();
var m = a.create("male");
m.sayMale();
