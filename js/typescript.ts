//以下のソースコードは成立しない、female型のオブジェクトはmale型と同じ名前のメンバーを持っていないからだ
//

// class male{
// 	sayMale(){
// 		alert("俺は男だ");
// 	}
// }
// class female{
// 	sayFemale(){
// 		alert("俺は女だ");
// 	}
// }
// var x : male = new female();
// x.sayFemale();
//俺は女だ;
//
//
////male型とfemale型は相互に何の関係もない型であるにもかかわらず、メンバーの名前を揃えると
//コンパイルが通ってしまう

// class male {
// 	say(){
// 		alert("俺は男だ");
// 	}
// }
// class female{
// 	say(){
// 		alert("俺は女だ");
// 	}
// }
// var x : male = new female();
// x.say();//俺は女だ

//オブジェクトリテラルは匿名のクラスを直接型として書き込む機能
//
class male {
	say(){
		alert("俺は男だ");
	}
}
class female{
	say(){
		alert("俺は女だ");
	}
}

var x : {say(): void} = new female();
x.say();//俺は女だ
//このように書き換えるとｘの型はmaleクラスからsay関数を含むオブジェクトに変化する
//男の型という解釈から解放される
