// class man {
// 	constructor(public name: string){}
// }
// function greeting(){
// 	alert(this.name + "君");
// }
// man.prototype["greeting"] = greeting;
// var morita = new man("morita");
// morita["greeting"]();
//
// var morim = new man("morim");
// morim["greeting"]();
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
        alert(this.name + "君");
    };
    return greetingMan;
})(man);
var kenjikun = (function (_super) {
    __extends(kenjikun, _super);
    function kenjikun() {
        _super.call(this, "eee");
    }
    return kenjikun;
})(greetingMan);
var kenji = new kenjikun("morita");
kenji.greeting();
var shima = new greetingMan("shima");
shima.greeting();
