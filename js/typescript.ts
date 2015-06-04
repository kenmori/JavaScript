function x(message : string, ...a: number[]){//普通の引数をレスト変数の後に持ってくることはできない
	var sum = 0;
	for(var i = 0; i < a.length; i++){
		 sum += a[i];
	}
	return message + sum;
}
x('sum of numbers is ',400,200,122,500)
