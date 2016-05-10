function splat(fun) {
	return function(array) {
		return fun.apply(null, array);
	};
}

function unsplat(fun) {
	return function() {
		return fun.call(null, _.toArray(arguments));
	};
}

function parseAge(age) {
  if (!_.isString(age)) throw new Error("引数は文字列である必要があります");
  var a;

  console.log("ageを数値に変換しようとしています");

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    console.log(["ageを数値に変換できませんでした：", age].join(''));
    a = 0;
  }

  return a;
}

function fail(thing) {
	throw new Error(thing);
}

function warn(thing) {
	console.log(["警告：", thing].join(''));
}

function note(thing) {
	console.log(["情報：", thing].join(''));
}

function parseAge(age) {
	if (!_.isString(age)) fail("引数は文字列である必要があります");
	var a;

	note("ageを数値に変換しようとしています");

      a = parseInt(age, 10);
	if (_.isNaN(a)) {
		warn(["ageを数値に変換できませんでした：", age].join(''));
		a = 0;
	}

	return a;
}

var letters = ['a', 'b', 'c'];

function naiveNth(a, index) {
	return a[index];
}

function isIndexed(data) {
	return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
	if(!_.isNumber(index)) fail("インデックスは数値である必要があります");
	if(!isIndexed(a)) fail("インデックス指定可能ではないデータ型はサポートされていません");
	if((index < 0) || (index > a.length -1)) fail("指定されたインデックスは範囲外です");
	return a[index];
}

function second(a) {
	return nth(a, 1);
}

function compareLessThanOrEqual(x, y) {
	if (x < y) return -1;
	if (y < x) return 1;
	return 0;
}

function lessOrEqual(x, y) {
	return x <= y;
}

function comparator(pred) {
	return function(x, y) {
		if (truthy(pred(x, y))) return -1;
		else if (truthy(pred(y, x))) return 1;
		else return 0;
	};
}

function lameCSV(str) {
	return _.reduce(str.split("\n"), function(table, row) {
		table.push(_.map(row.split(","), function(c) { return c.trim() }));
		return table;
	}, []);
};

var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

function selectNames(table) {
	return _.rest(_.map(table, _.first));
}

function selectAges(table) {
	return _.rest(_.map(table, second));
}

function selectHairColor(table) {
	return _.rest(_.map(table, function(row) {
		return nth(row, 2);
	}));
}

var mergeResults = _.zip;

function existy(x) { return x != null };

function truthy(x) { return (x !== false) && existy(x) };

function doWhen(cond, action) {
	if(truthy(cond))
		return action();
	else 
		return undefined;
}

function executeIfHasField(target, name) {
	return doWhen(existy(target[name]), function() {
		var result = _.result(target, name);
		console.log(['結果は', result].join(''));
		return result;
	});
}
