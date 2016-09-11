window.onload = function(){

	var c = document.getElementById('canvas');
	c.width  = 512;
	c.height = 512;

	var gl = c.getContext('webgl');
	if(!gl){
		alert('webgl not supported');
		return;
	}
	gl.clearColor(0.0, 0.0, 1.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	function ff(x){
		return 1 + y;
	}
	var fff = ff(6);
	if(fff === 7){
		console.log(fff);
	} else {
		typeof x;
		console.log("no 7")
	}
	//三角形を形成する頂点のデータを受け取る
	var triangleData = genTriangle();

	//頂点データからバッファを生成
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleData.p), gl.STATIC_DRAW);

	var vertexSource = document.getElementById('vs').textContent;
	var fragmentSource = document.getElementById('fs').textContent;
	var vertexShader =  gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	var programs = gl.createProgram();
	gl.shaderSource(vertexShader, vertexSource);
	gl.compileShader(vertexShader);
	gl.attachShader(programs, vertexShader);
	gl.shaderSource(fragmentShader, fragmentSource);
	gl.compileShader(fragmentShader);
	gl.attachShader(programs, fragmentShader);
	gl.linkProgram(programs);
	gl.useProgram(programs);

	//プログラムオブジェクトに三角形の頂点データを登路

	var attLocation = gl.getAttribLocation(programs, 'position');
	gl.enableVertexAttribArray(attLocation);
	gl.vertexAttribPointer(attLocation, 3, gl.FLOAT, false, 0, 0);

	//描画
	gl.drawArrays(gl.TRIANGLES, 0, triangleData.p.length / 3);
	gl.flush();
}

function genTriangle(){
	var obj = {};
	obj.p = [
		0.0, 0.5, 0.0,
		0.5, -0.5, 0.0,
		-0.5, -0.5, 0.0
	];
	return obj;
}
