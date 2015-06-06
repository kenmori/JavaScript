var man = (function () {
    function man(name) {
        this.name = name;
    }
    return man;
})();
function greeting() {
    alert(this.name + "君");
}
man.prototype["greeting"] = greeting;
var morita = new man("morita");
morita["greeting"]();
var morim = new man("morim");
morim["greeting"]();
