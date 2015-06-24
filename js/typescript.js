function x(a, b) {
    if (b === void 0) { b = 100; }
    return a + b;
}
alert(x(100));
function x() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}
alert(x(100, 200, 300, 400, 500));
