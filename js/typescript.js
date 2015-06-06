//以下のソースコードは成立しない、female型のオブジェクトはmale型と同じ名前のメンバーを持っていないからだ
//
var male = (function () {
    function male() {
    }
    male.prototype.say = function () {
        alert("俺は男だ");
    };
    return male;
})();
var female = (function () {
    function female() {
    }
    female.prototype.say = function () {
        alert("俺は女だ");
    };
    return female;
})();
var x = new female();
x.say();
