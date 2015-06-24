//引数省略時に補う値を書き込んでおく
function x(a, b=100) {
	return a + b;
}
alert(x(100));

//可変長変数.
//レスト引数
function x(...a: number[]){
	var sum = 0;
	for(var i = 0; i < a.length; i++){
		sum += a[i];
	}
	return sum;
}
alert(x(100,200,300,400,500));
