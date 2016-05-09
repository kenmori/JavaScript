var people = [{name: "Fred", age: 65}, {name: "Lucy", age: 36}];

function finder(valueFun, bestFun, coll) {
	return _.reduce(coll, function(best, current) {
		var bestValue = valueFun(best);
		var currentValue = valueFun(current);
		return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
	});
}

function best(fun, coll) {
	return _.reduce(coll, function(x, y) {
		return fun(x, y) ? x : y;
	});
}

function repeat(times, VALUE) {
	return _.map(_.range(times), function() { return VALUE; });
}

function repeatedly(times, fun) {
	return _.map(_.range(times), fun);
}

function iterateUntil(fun, check, init) {
	var ret = [];
	var result = fun(init);
	while (check(result)) {
		ret.push(result);
		result = fun(result);
	}
	return ret;
};

function always(VALUE) {
	return function() {
		return VALUE;
	};
};

function invoker (NAME, METHOD) {
	return function(target /* args ... */) {
		if (!existy(target)) fail("Must provide a target");
		var targetMethod = target[NAME];
		var args = _.rest(arguments);
		return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
			return targetMethod.apply(target, args);
		});
	};
};

var rev = invoker('reverse', Array.prototype.reverse);

var add100 = makeAdder(100);

function uniqueString(prefix) {
	return [prefix, new Date().getTime()].join('');
};

function makeUniqueStringFunction(start) {
	var COUNTER = start;
	return function(prefix) {
		return [prefix, COUNTER++].join('');
	}
};

var generator = {
	count: 0,
	uniqueString: function(prefix) {
		return [prefix, this.count++].join('');
	}
};

var omgenerator = (function(init) {
	var COUNTER = init;

	return {
		uniqueString: function(prefix) {
			return [prefix, COUNTER++].join('');
		}
	};
})(0);

var nums = [1,2,3,null,5];

function fnull(fun /*, defaults */) {
	var defaults = _.rest(arguments);
	return function(/* args */) {
		var args = _.map(arguments, function(e, i) {
			return existy(e) ? e : defaults[i];
		});
		return fun.apply(null, args);
	};
};


var safeMult = fnull(function(total, n) { return total * n }, 1, 1);

function defaults(df) {
  return function(obj, key) {
    var val = fnull(_.identity, df[key]);
    return obj && val(obj[key]);
  };
}

function doSomething(config) {
	var lookup = defaults({critical: 108});
	return lookup(config, 'critical');
}

function checker(/* validators */) {
	var validators = _.toArray(arguments);
	return function(obj) {
		return _.reduce(validators, function(errs, check) {
			if (check(obj))
				return errs
			else
				return _.chain(errs).push(check.message).value();
		}, []);
	};
}

var alwaysPasses = checker(always(true), always(true));

var fails = always(false);
fails.message = "人生における過ち";
var alwaysFails = checker(fails);

function validator(message, fun) {
	var f = function(/* args */) {
		return fun.apply(fun, arguments);
	};
	f['message'] = message;
	return f;
}

var gonnaFail = checker(validator("ZOMG!", always(false)));

function aMap(obj) {
	return _.isObject(obj);
}

function hasKeys() {
	var KEYS = _.toArray(arguments);
	
	var fun = function(obj) {
		return _.every(KEYS, function(k) {			return _.has(obj, k);
		});
	};

	fun.message = cat(["これらのキーが存在する必要があります："], KEYS).join(" ");
	return fun;
}

var checkCommand = checker(validator("マップデータである必要があります", aMap),
										hasKeys('msg', 'type'));
