//function x(p){
//	if(typeof p == "number"){
//		alert("numberの" + p + "です");
//	}
//	else{
//		alert("stringの" + p + "です");
//	}
//}
//x(1234);
//x("1234");


//↑これだとPが「any」となり{}が渡ったら壊れる。stringとnumberしか渡らないようにしなくてはいけない
//オーバーロード機能を使う。
function x(p: string);//関数の定義と実装を分離する。これは関数の定義
function x(p: number);
function x(p: any){//関数の実装
	if(typeof p == "number"){
		alert("numberの" + p + "です");
	}
	else{
		alert("stringの" + p + "です");
	}
}
x(1234);
x("1234");
