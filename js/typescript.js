var cat = (function () {
    function cat() {
        alert("constructed");
        this.name = "Unknown";
        this.age = 1;
    }
    cat.prototype.myau = function () { alert(this.name + 'は泣きました'); };
    Object.defineProperty(cat.prototype, "age", {
        get: function () { return this.localAge; },
        set: function (value) {
            if (value < 0)
                throw "ageは負の数では無いはずです";
            this.localAge = value;
        },
        enumerable: true,
        configurable: true
    });
    return cat;
})();
var x = new cat();
x.name = "nya-chan";
alert(x.name);
x.myau();
x.age = 5;
alert(x.age);
