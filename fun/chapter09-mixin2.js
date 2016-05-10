// 9章「mixin拡張を使用した新しい仕組み」項のサンプルコード
// chapter09-mixin.jsを先に読み込んでおく必要があります。

var SwapMixin = {
	swap: function(fun /* , args... */) {
		var args = _.rest(arguments)
		var newValue = fun.apply(this, construct(this._value, args));
		
		return this.setValue(newValue);
	}
};

var SnapshotMixin = {
	snapshot: function() {
		return deepClone(this._value);
	}
};

_.extend(Hole.prototype
	, HoleMixin
	, ValidateMixin
	, ObserverMixin
	, SwapMixin
	, SnapshotMixin);
	
var CAS = function(val) {
	Hole.call(this, val);
}

var CASMixin = {
	swap: function(oldVal, f) {
		if (this._value === oldVal) {
			this.setValue(f(this._value));
			return this._value;
		}
		else {
			return undefined;
		}
	}
};

_.extend(CAS.prototype
	, HoleMixin
	, ValidateMixin
	, ObserverMixin
	, SwapMixin
	, CASMixin // SwapMixinよりも後
	, SnapshotMixin);
	
