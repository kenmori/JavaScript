function lazyChain(obj) {
	var calls = [];
	
	return {
		invoke: function(methodName /* args */) {
			var args = _.rest(arguments);
			calls.push(function(target) {
				var meth = target[methodName];
				return meth.apply(target, args);
			});
			return this;
		},
		force: function() {
			return _.reduce(calls, function(ret, thunk) {
				return thunk(ret);
			}, obj);
		}
	};
}

function deferredSort(ary) {
	return lazyChain(ary).invoke('sort');
}

var deferredSorts = _.map([[2,1,3], [7,7,1], [0,9,5]], deferredSort);

function force(thunk) {
	return thunk.force();
}

var validateTriples = validator(
	"それぞれの配列は3つの要素を持っている必要があります", function (arrays) {
	return _.every(arrays, function(a) {
		return a.length === 3;
	});
});

var validateTripleStore = partial1(condition1(validateTriples), _.identity);

function postProcess(arrays) {
	return _.map(arrays, second);
}

function processTriples(data) {
	return pipeline(data
		, JSON.parse
		, validateTripleStore
		, deferredSort
		, force
		, postProcess
		, invoker('sort', Array.prototype.sort)
		, str);
}

function stringifyArray(ary) {
	return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}

var polyToString = dispatch(
	function(s) { return _.isString(s) ? s : undefined },
	function(s) { return _.isArray(s) ? stringifyArray(s) : undefined },
	function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined },
	function(s) { return s.toString() });

Container.prototype.toString = function() {
	return ["@<", polyToString(this._value), ">"].join('');
}
