// 9章「Mixinを使って階層を平坦化」項のサンプルコード
// 8章で定義したContainer関数を上書きするため、index.htmlにはデフォルトで読み込んでいません。
// 

function Container(val) {
	this._value = val;
	this.init(val);
}

Container.prototype.init = _.identity;

var HoleMixin = {
	setValue: function(newValue) {
		var oldVal = this._value;
		this.validate(newValue);
		this._value = newValue;
		this.notify(oldVal, newValue);
		return this._value;
	}
};

var Hole = function(val) {
	Container.call(this, val);
}

var ObserverMixin = (function() {
	var _watchers = [];

	return {
		watch: function(fun) {
			_watchers.push(fun);
			return _.size(_watchers);
		},
		notify: function(oldVal, newVal) {
			_.each(_watchers, function(watcher) {
				watcher.call(this, oldVal, newVal);
			});
			return _.size(_watchers);
		}
	};
}());

var ValidateMixin = {
	addValidator: function(fun) {
		this._validator = fun;
	},
	init: function(val) {
		this.validate(val);
	},
	validate: function(val) {
		if (existy(this._validator) && !this._validator(val))
			fail("不正な値を設定しようとしました：" + polyToString(val));
	}
};

_.extend(Hole.prototype
	, HoleMixin
	, ValidateMixin
	, ObserverMixin);
	
