function x(message) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return message + sum;
}
x('sum of numbers is ', 400, 200, 122, 500);
