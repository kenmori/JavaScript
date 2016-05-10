function lyricSegment(n) {
	return _.chain([])
		.push(n + "本のビールが残ってる")
		.push(n + "本のビール")
		.push("ひとつ取って、隣に回せ")
		.tap(function(lyrics) {
			if (n > 1)
				lyrics.push((n - 1) + "本のビールが残ってる");
			else
				lyrics.push("もうビールは残ってない");
		})
		.value();
}

function song(start, end, lyricGen) {
	return _.reduce(_.range(start,end,-1),
		function(acc,n) {
		return acc.concat(lyricGen(n));
	}, []);
}

function Point2D(x, y) {
	this._x = x;
	this._y = y;
}

function Point3D(x, y, z) {
	Point2D.call(this, x, y);
	this._z = z;
}

function doubleAll(array) {
	return _.map(array, function(n) { return n*2 });
}

function average(array) {
	var sum = _.reduce(array, function(a, b) { return a+b });
	return sum / _.size(array);
}

function onlyEven(array) {
	return _.filter(array, function(n) {
		return (n%2) === 0;
	});
}

function allOf(/* 1つ以上の関数 */) {
	return _.reduceRight(arguments, function(truth, f) {
		return truth && f();
	}, true);
}

function anyOf(/* 1つ以上の関数 */) {
	return _.reduceRight(arguments, function(truth, f) {
		return truth || f();
	}, false);
}

function complement(pred) {
	return function() {
		return !pred.apply(null, _.toArray(arguments));
	};
}
function cat(/* いくつかの配列 */) {
	var head = _.first(arguments);
	if (existy(head))
		return head.concat.apply(head, _.rest(arguments));
	else
		return [];
}

function construct(head, tail) {
	return cat([head], _.toArray(tail));
}

function mapcat(fun, coll) {
	return cat.apply(null, _.map(coll, fun));
}

function butLast(coll) {
	return _.toArray(coll).slice(0, -1);
}

function interpose (inter, coll) {
	return butLast(mapcat(function(e) {
		return construct(e, [inter]);
	}, coll));
}

var people = [{name: "Rick", age: 30}, {name: "Jaka", age: 24}];

var albums = [{title: "Sabbath Bloody Sabbath", genre: "Metal"}, 
				{title: "Scientist", genre: "Dub"},
				{title: "Undertow", genre: "Metal"}];

var zombie = {name: "Bub", film: "Day of the Dead"};

var person = {name: "Romy", token: "j3983ij", password: "tigress"};
var info = _.omit(person, 'token', 'password');
var creds = _.pick(person, 'token', 'password');

var library = [{title: "SICP", isbn: "0262010771", ed: 1},
				{title: "SICP", isbn: "0262510871", ed: 2},
				{title: "Joy of Clojure", isbn: "1935182641", ed: 1}];
				
function project(table, keys) {
	return _.map(table, function(obj) {
		return _.pick.apply(null, construct(obj, keys));
	});
};

var editionResults = project(library, ['title', 'isbn']);

var isbnResults = project(editionResults, ['isbn']);

function rename(obj, newNames) {
	return _.reduce(newNames, function(o, nu, old) {
		if (_.has(obj, old)) {
			o[nu] = obj[old];
			return o;
		}
		else
			return o;
	},
	_.omit.apply(null, construct(obj, _.keys(newNames))));
};

function as(table, newNames) {
	return _.map(table, function(obj) {
		return rename(obj, newNames);
	});
};

function restrict(table, pred) {
	return _.reduce(table, function(newTable, obj) {
		if (truthy(pred(obj)))
			return newTable;
		else
			return _.without(newTable, obj);
	}, table);
};
