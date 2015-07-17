
//単純な関数型のコールバック
var emitter = {
	callbacks :[],
	register : function(fn){
		this.callbacks.push(fn);
	},
	onOpen : function(){
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
	this.show = function(){ print(this.msg + 'is called');}//thisが正しく参照されていない//thisは宣言や書き方で決まるのでは泣く、呼び方で決まる
	//レシーバオブジェクトがなかったり別のレシーバオブジェクト経由で同じ関数を呼ぶと動作が変わる//
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

///////////////////////////////////////////////////////////////////
//this参照の注意点
var obj = {
	x:3,
	doit:function(){print('method is called' + this.x);}
};
var fn = obj.doit;//global変数fnに代入
fn();
//method is called undefined
var x = 5;
fn();
//method is called 5;

var obj2 = {//別のオブジェクトobj2のプロパティにojbのメソッド(関数オブジェクトの参照)を代入
	x: 4,
	doit2: fn;
}
obj2.doit2();//メソッド内のthis参照はobj2を参照する
// method is called 4

//メソッド内から下請けメソッドを呼ぶ場合
var obj3 = {
	x:3,
	doit3 : function(){console.log('doit3 is called' + this.x); this.doit4();},
	doit4 : function(){ console.log('doit4 is called' + this.x);}
}
obj3.doit3();


///////////////////////////////////////////////////////////////////
//apply,callはレシーバーオブジェクトを明示的に指定できる
function f(){ console.log(this.x);};
var obj = {x:4};
f.apply(obj);
f.call(obj);
//別オブジェクトをレシーバオブジェクトにしてメソッドを呼び出す
var obj = {
	x : 3,
	doit: function(){
		console.log('method is called' + this.x);
	}
}
var obj2 = {x : 4};
obj.doit.apply(obj2);//メソッド内のthis参照はobj2を参照

//applyとcallの違いは第一引数の渡し方applyは残りの引数を配列で渡す,callは轢く数形式のまま渡す
function f(a,b){
	console.log('this.x=' + this.x + ',a =' + a + ',b=' + b );
}
f.apply({x:4},[1,2]);//第二引数が関数の引数になる//配列
f.call({x:4},1,2);
