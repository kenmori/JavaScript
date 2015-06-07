setTimeout(function () {
    alert("1秒が経過しました");
}, 1000);
function mainFunc(f) {
    alert(f(1, 2));
}
mainFunc(function (a, b) { return a + b; });
function makeName(f) {
    alert(f("battle", "star"));
}
makeName(function (a, b) { return a + b; });
function makeName(f) {
    alert(f("はい"));
}
makeName(function (a) { return a + a + a; });
function makeName(f) {
    alert(f("はい"));
}
makeName(function (a) { return a + a + a; });
var a = (function () {
    function a() {
        this.b = "I'm class a";
    }
    return a;
})();
