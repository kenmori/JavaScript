//createElement関数で使用されている機能として、特殊化されたシグネチャがある。
//これは文字列の引数の値によって返す型を変動させる機能がある
var male = (function () {
    function male() {
    }
    male.prototype.sayMale = function () {
        alert("俺は男だ");
    };
    return male;
})();
var female = (function () {
    function female() {
    }
    female.prototype.sayFemale = function () {
        alert("俺は女だ");
    };
    return female;
})();
var builder = (function () {
    function builder() {
    }
    builder.prototype.create = function (sex) {
        if (sex == "male")
            return new male();
        else
            return new female();
    };
    return builder;
})();
var a = new builder();
var f = a.create("female");
f.sayFemale();
var m = a.create("male");
m.sayMale();
