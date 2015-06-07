//アロー関数(匿名関数の置き換え)
//
//
setTimeout(() => {
	alert("1秒が経過しました");
},1000)

//右側に戻り値の型を書く
function mainFunc(f:(a:number,b: number) => number){
	alert(f(1,2));
}
mainFunc((a,b) => {return a + b;})
//戻り値が無い場合は()=>voidのように記述する

//アロー関数はreturn文一つきりの時
function makeName(f:(a:string,b:string) => string){
	alert(f("battle","star"));
}
makeName((a,b)=> a+ b);
//returnと{}を省略できる

//引数が一つの時、アロー関数は引数の小括弧をはずせる
function makeName(f:(a: string) => string){
	alert(f("はい"));
}
makeName((a) => a+ a+ a);

//外したパターン
function makeName(f: (a: string) => string){
	alert(f("はい"));
}
makeName(a => a + a + a);

class a{
	b = "I'm class a";
}
