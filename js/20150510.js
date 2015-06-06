function sum (){
	var result = 0;
	for (var i=0 ; i < arguments.length; i++){//x argument
		var tmp = arguments[i];
		if(isNaN(tmp)){ //x (isNaN != arguments[i])
			throw new Error('引数ではありません' + tmp ); //x thorw,この場合trueならErrorを投げる
		}
		result += tmp;
	}
	return result;
}

try{ //x try(){}
	console.log(sum(3,4,5,8));
}catch(e){
	consol.log(e.message);
}
//20
//
//高級関数
function arraWalk(data,f){
	for (var key in data){
		f(key,data[key]);
	}
}
function showElement(key,value){
	document.write(key + ':' + value);
}
var arry = [0,9,10,4,19];

arraWalk(arry,showElement);
