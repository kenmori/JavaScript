var rand = partial1(_.random, 1);

function randString(len) {
	var ascii = repeatedly(len, partial1(rand, 36));

	return _.map(ascii, function(n) {
		return n.toString(36);
	}).join('');
}

function generateRandomCharacter() {
	return rand(26).toString(36); // この実装には意図的な誤りがあります
}

function generateString(charGen, len) {
	return repeatedly(len, charGen).join('');
}

var composedRandomString = partial1(generateString, generateRandomCharacter);

function skipTake(n, coll) {
	var ret = [];
	
	var sz = _.size(coll);
	for(var index = 0; index < sz; index += n) {
		ret.push(coll[index]);
	}
	return ret;
} 

function summ(array) {
	var result = 0;
	var sz = array.length;
	
	for (var i = 0; i < sz; i++) result += array[i];
	return result;
}

function summRec(array, seed) {
	if (_.isEmpty(array))
		return seed;
	else
		return summRec(_.rest(array), _.first(array) + seed);
}

function deepFreeze(obj) {
	if (!Object.isFrozen(obj))
		Object.freeze(obj);

	for (var key in obj) {
		if (!obj.hasOwnProperty(key) || !_.isObject(obj[key]))
			continue;
	
		deepFreeze(obj[key]);
	}
}

var freq = curry2(_.countBy)(_.identity);

var person = {fname: "Simon"};

function merge(/*args*/) {
	return _.extend.apply(null, construct({}, arguments));
}

function Point(x, y) {
	this._x = x;
	this._y = y;
}

Point.prototype = {
	withX: function(val) {
		return new Point(val, this._y);
	},
	
	withY: function(val) {
		return new Point(this._x, val);
	}
};

function Queue(elems) {
	this._q = elems;
}

Queue.prototype = {
	enqueue: function(thing) {
		return new Queue(cat(this._q, [thing]));
	}
};

var SaferQueue = function(elems) {
	this._q = _.clone(elems);
}

SaferQueue.prototype = {
	enqueue: function(thing) {
		return new SaferQueue(cat(this._q, [thing]));
	}
};

function queue() {
	return new SaferQueue(_.toArray(arguments));
}

function Container(init) {
	this._value = init;
};

Container.prototype = {
	update: function(fun /*, args */) {
		var args = _.rest(arguments);
		var oldValue = this._value;
		this._value = fun.apply(this, construct(oldValue, args));
		return this._value;
	}
};
