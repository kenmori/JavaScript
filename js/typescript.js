var kodai = (function () {
    function kodai() {
        this.name = "kodai";
    }
    kodai.prototype.greeting = function () {
        alert("Hello,I'm" + this.name);
    };
    kodai.prototype.shoot = function () {
        alert("Fire!");
    };
    return kodai;
})();
var morita = (function () {
    function morita() {
        this.name = "morita";
    }
    morita.prototype.greeting = function () {
        alert("Hello,I'm" + this.name);
    };
    morita.prototype.warp = function () {
        alert("Warp!");
    };
    return morita;
})();
var yuki = (function () {
    function yuki() {
        this.name = "yuki";
    }
    yuki.prototype.greeting = function () {
        alert("My name is" + this.name);
    };
    yuki.prototype.coffee = function () {
        alert("Coffee!!");
    };
    return yuki;
})();
var all = [new kodai(), new morita(), new yuki()];
for (var i = 0; i < all.length; i++) {
    all[i].greeting();
}
