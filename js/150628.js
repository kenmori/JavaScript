
//単純な関数型のコールバック
var emitter = {
	callbacks:[],
	register: function(fn){
		this.callbacks.push(fn);
	},
	onOpen:function(){
		for each (var f in this.callbacks){
			f();
		}
	}
}
//callback関数の登録
emitter.register(function(){print('event handler1 is called');});
emitter.register(function(){print('event handler2 is called');});

//イベント発生のエミュレーション(コールバック関数の呼び出し)
emitter.onOpen();
///////////////////////////////////////////////////////////////////
//コールバック関数が状態を持てるようにする
//コールバックされる側をオブジェクトにしてemitterにメソッドを渡す形に変える
//期待通りに動かない関数
var emitter = {
	callbacks:[],
	register: function(fn){
		this.callbacks.push(fn);
	},
	onOpen:function(){
		for each (var f in this.callbacks){
			f();
		}
	}
}
function MyClass(msg){
	this.msg = msg;
	this.show = function(){ print(this.msg + 'is called');}//thisが正しく参照されていない
	//解決方法は２つ
	//bindを使う方法
	//メソッドでは泣くオブジェクトを登録する方法
}
var obj1 = new MyClass('listener1');
var obj2 = new MyClass('listener2');
emitter.register(obj1.show);

emitter.onOpen();
///////////////////////////////////////////////////////////////////
///上記でbindとしてcallバック関数を登録する
var emitter = {
	callbacks : [];
	register : function(fn){
		this.callbacks.push(fn);
	},
	onOpen: function(){
		for each (var f in this.callbacks){
			f();
		}
	}
}
function MyClass(msg){
	this.msg = msg;
	this.show = function(){ print(this.msg + 'is called');}
}
var obj1 = new MyClass('listener1');
var obj2 = new MyClass('listener2');
emitter.register(obj1.show.bind(obj1));
emitter.register(obj2.show.bind(obj2));

emitter.onOpen();
