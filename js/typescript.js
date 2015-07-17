function a(x) {
    alert(x);
}
a("eee");
a(9);
function b(x) {
    alert(x);
}
;
b("fafa");
b(9);
var MyPerson = (function () {
    function MyPerson() {
    }
    return MyPerson;
})();
function c(t, u) {
    alert(t);
    alert(u);
}
c('finger', 1);
function d(t) {
    return t;
}
alert(d(1234));
function e() {
    var x = null;
    alert(x);
}
e();
function g(x) {
    alert(x instanceof Date);
}
g("new Date()");
g(new Date());
function h(x) {
    alert(x instanceof Date);
}
h("new Date()");
h(new Date());
function j(x) {
    alert(x);
    return x;
}
function k(x) {
    var y = j(x);
}
k(new Date());
