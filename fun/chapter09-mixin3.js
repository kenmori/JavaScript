// 9章「メソッドは低レイヤーの操作」のサンプルコード
// chapter09.js、chapter09-mixin.jsを先に読み込んでおく必要があります。

function contain(value) {
	return new Container(value);
}

function hole(val /*, 検証関数 */) {
	var h = new Hole();
	var v = _.toArray(arguments)[1];

	if (v) h.addValidator(v);
	h.setValue(val);
	return h;
}

var swap = invoker('swap', Hole.prototype.swap);

function cas(val /*, 任意の数の引数 */) {
	var h = hole.apply(this, arguments);
	var c = new CAS(val);
	c._validator = h._validator;
	return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);

function snapshot(o) { return o.snapshot(); }
function addWatcher(o, fun) { o.watch(fun); }
