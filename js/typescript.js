// 継承したクラスのインスタンスは、親クラスの型としても扱える
// つまりgreetingManクラスのオブジェクトを型とする変数に格納できる
// しかし、それからgreeting関数は呼び出せない。中に入っているオブジェクトはそれを持っているが
// 変数の型がそれをもっていないから
// 3種類の型の変数で同じmoritaオブジェクトを受けた場合の違いをみてみる
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
    greetingMan.prototype.greeging = function () {
        alert(this.name + "君");
    };
    return greetingMan;
})(man);
var morita = (function (_super) {
    __extends(morita, _super);
    function morita() {
        _super.call(this, "kenji");
    }
    return morita;
})(greetingMan);
var kenji1 = new morita();
var kenji2 = new morita();
var kenji3 = new morita();
kenji2.greeting();
kenji3.greeting();
