function dispatch(/* 任意の数の関数 */) {
	var funs = _.toArray(arguments);
	var size = funs.length;

	return function(target /*, 追加の引数 */) {
		var ret = undefined;
		var args = _.rest(arguments);

		for (var funIndex = 0; funIndex < size; funIndex++) {
			var fun = funs[funIndex];
			ret = fun.apply(fun, construct(target, args));

			if (existy(ret)) return ret;
		}

		return ret;
	};
}

var str = dispatch(invoker('toString', Array.prototype.toString),
							invoker('toString', String.prototype.toString));

function stringReverse(s) {
	if (!_.isString(s))
		return undefined;
	return s.split('').reverse().join("");
}

var polyrev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
var sillyReverse = dispatch(polyrev, always(42));

function isa(type, action) {
	return function(obj) {
		if (type === obj.type) return action(obj);
	}
}

function notify(message) {
	console.log('notify関数：', message);
	return true;
}


function changeView(message) {
	console.log('notify関数：', message);
	return true;
}

function performCommandHardcoded(command) {
  var result;

  switch (command.type) {
    case 'notify':
      result = notify(command.message);
      break;
    case 'join':
      result = changeView(command.target);
      break;
    default:
      alert(command.type);
  }

  return result;
}

var performCommand = dispatch(
	isa('notify', function(obj) { return notify(obj.message) }),
	isa('join', function(obj) { return changeView(obj.target) }),
	function(obj) { alert(obj.type) });

var performAdminCommand = dispatch(
	isa('kill', function(obj) { return shutdown(obj.hostname) }),
	performCommand);

var performTrialUserCommand = dispatch(
	isa('join', function(obj) { alert("許可されるまで参加できません") }),
	performCommand);

function rightAwayInvoker() {
	var args = _.toArray(arguments);
	var method = args.shift();
	var target = args.shift();
	
	return method.apply(target, args);
}

function leftCurryDiv(n) {
	return function(d) {
		return n/d;
	};
}

function rightCurryDiv(d) {
	return function(n) {
		return n/d;
	};
}

var divide10By = leftCurryDiv(10);
var divideBy10 = rightCurryDiv(10);

function curry(fun) {
	return function(arg) {
		return fun(arg);
	};
}

function curry2(fun) {
	return function(secondArg) {
		return function(firstArg) {
			return fun(firstArg, secondArg);
		};
	};
}

function div(n, d) { return n / d }

var div10 = curry2(div)(10);

var parseBinaryString = curry2(parseInt)(2);

var plays = [{artist: "Burial", track: "Archangel"},
					{artist: "Ben Frost", track: "Stomp"},
					{artist: "Ben Frost", track: "Stomp"},
					{artist: "Burial", track: "Archangel"},
					{artist: "Emeralds", track: "Snores"},
					{artist: "Burial", track: "Archangel"}];

function songToString(song) {
	return [song.artist, song.track].join(" - ");
}

var songCount = curry2(_.countBy)(songToString);

function curry3(fun) {
	return function(last) {
		return function(middle) {
			return function(first) {
				return fun(first, middle, last);
			};
		};
	};
};

var songsPlayed = curry3(_.uniq)(false)(songToString);

function toHex(n) {
	var hex = n.toString(16);
	return (hex.length < 2) ? [0, hex].join(''): hex;
}

function rgbToHexString(r, g, b) {
	return ["#", toHex(r), toHex(g), toHex(b)].join('');
}


var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });
var lessThan = curry2(function (lhs, rhs) { return lhs < rhs });

var withinRange = checker(
	validator("10より大きい必要があります", greaterThan(10)),
	validator("20より小さい必要があります", lessThan(20)));

function divPart(n) {
	return function(d) {
		return n/d;
	};
}

var over10Part = divPart(10);

function partial1(fun, arg1) {
	return function(/* args */) {
		var args = construct(arg1, arguments);
		return fun.apply(fun, args);
	};
}

function partial1native(fun, arg1) {
	return fun.bind(undefined, arg1);
}

var over10Part1 = partial1(div, 10);

function partial2(fun, arg1, arg2) {
	return function(/* args */) {
		var args = cat([arg1, arg2], arguments);
		return fun.apply(fun, args);
	};
}

var div10By2 = partial2(div, 10, 2);


function partial(fun /*, pargs */) {
	var pargs = _.rest(arguments);

	return function(/* arguments */) {
		var args = cat(pargs, _.toArray(arguments));
		return fun.apply(fun, args);
	};
}

var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);

var zero = validator("0ではいけません", function(n) { return 0 === n });
var number = validator("引数は数値である必要があります", _.isNumber);

function sqr(n) {
	if (!number(n)) throw new Error(number.message);
	if (zero(n)) throw new Error(zero.message);
	return n * n;
}

function condition1(/* validators */) {
	var validators = _.toArray(arguments);

	return function(fun, arg) {
		var errors = mapcat(function(isValid) {
			return isValid(arg) ? [] : [isValid.message];
		}, validators);

		if (!_.isEmpty(errors))
			throw new Error(errors.join(", "));

		return fun(arg);
	};
}

var sqrPre = condition1(
	validator("0ではいけません", complement(zero)),
	validator("引数は数値である必要があります", _.isNumber));

function uncheckedSqr(n) { return n * n };

var checkedSqr = partial1(sqrPre, uncheckedSqr);

var sillySquare = partial1(
  condition1(validator("偶数を入力してください", isEven)),
  checkedSqr);

var validateCommand = condition1(
  validator("マップデータである必要があります", _.isObject),
  validator("設定オブジェクトは正しいキーを持っている必要があります", hasKeys('msg', 'type')));

var createCommand = partial(validateCommand, _.identity);

var createLaunchCommand = partial1(
  condition1(
    validator("設定オブジェクトはcountDownが必要です", hasKeys('countDown'))),
  createCommand);
  
function isntString(str) {
  return !_.isString(str);
}

var isntString = _.compose(function(x) { return !x }, _.isString);

var composedMapcat = _.compose(splat(cat), _.map);

var sqrPost = condition1(
  validator("結果は数値である必要があります", _.isNumber),
  validator("結果はゼロではない必要があります", complement(zero)),
  validator("結果は正の数である必要があります", greaterThan(0)));
  
var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);
