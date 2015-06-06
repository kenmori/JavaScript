var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var man = (function () {
    function man(name) {
        this.name = name;
    }
    return man;
})();
var greetingMan = (function (_super) {
    __extends(greetingMan, _super);
    function greetingMan() {
        _super.apply(this, arguments);
    }
    greetingMan.prototype.greeting = function () {
        alert(this.name + "さん!");
    };
    return greetingMan;
})(man);
var moritaKun = (function (_super) {
    __extends(moritaKun, _super);
    function moritaKun() {
        _super.call(this, "morita");
    }
    moritaKun.prototype.greeting = function () {
        _super.prototype.greeting.call(this);
        alert(this.name + "君");
    };
    return moritaKun;
})(greetingMan);
var morita = new moritaKun();
morita.greeting();
