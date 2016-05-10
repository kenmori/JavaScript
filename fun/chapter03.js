aVariable = "外";

function aFun() {
  var aVariable = "内";
  return _.map([1,2,3], function(e) {
    var aVariable = "最内";
    return [aVariable, e].join(' ');
  });
}

function makeEmptyObject() {
	return new Object();
}

var globals = {};

function makeBindFun(resolver) {
	return function(k, v) {
		var stack = globals[k] || [];
		globals[k] = resolver(stack, v);
		return globals;
	};
}

var stackBinder = makeBindFun(function(stack, v) {
	stack.push(v);
	return stack;
});

var stackUnbinder = makeBindFun(function(stack) {
	stack.pop();
	return stack;
});

var dynamicLookup = function(k) {
	var slot = globals[k] || [];
	return _.last(slot);
};


function f() { return dynamicLookup('a'); };
function g() { stackBinder('a', 'g'); return f(); };

function globalThis() { return this; }

var nopeThis = _.bind(globalThis, 'nope');

var target = {name: '正しい値',
               aux: function() { return this.name; },
               act: function() { return this.aux(); }
};

function strangeIdentity(n) {
	// 意図的に変なコードを書いています
	for(var i=0; i<n; i++);
	return i;
}

function strangerIdentity(n) {
	// ここでも意図的に変なコードを書いています
	for(this['i'] = 0; this['i']<n; this['i']++);
	return this['i'];
}

function f() {
	this['a'] = 200;
	return this['a'] + this['b'];
}

function whatWasTheLocal() {
  var CAPTURED = "あ、こんにちは。";
  return function() {
    return "ローカル変数：" + CAPTURED;
  };
}

var reportLocal = whatWasTheLocal();

function createScaleFunction(FACTOR) {
	return function(v) {
		return _.map(v, function(n) {
			return (n * FACTOR);
		});
	};
}

function createWeirdScaleFunction(FACTOR) {
	return function(v) {
		this['FACTOR'] = FACTOR;
		var captures = this;
		return _.map(v, _.bind(function(n) {
			return (n * this['FACTOR']);
		}, captures));
	};
}

function makeAdder(CAPTURED) {
	return function(free) {
		return free + CAPTURED;
	};
}

function isEven(n) { return (n%2) === 0 }
var isOdd = complement(isEven);

function showObject(OBJ) {
  return function() {
    return OBJ;
  };
}

var o = {a: 42};
var showO = showObject(o);

var pingpong = (function() {
  var PRIVATE = 0;
  return {
    inc: function(n) {
      return PRIVATE += n;
    },
    dec: function(n) {
      return PRIVATE -= n;
    }
  };
})();

function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  };
}

var bestNovel = {title: "Infinite Jest", author: "DFW"};
var getTitle = plucker('title');

var books = [{title: "Chthon"}, {stars: 5}, {title: "Botchan"}];
var third = plucker(2);
