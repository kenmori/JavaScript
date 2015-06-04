function x(...a: number[]){
	var sum = 0;
	for(var i = 0; i < a.length; i++){
		 sum += a[i];
	}
	return sum;
}
x(400,200,122,500)
