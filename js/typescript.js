var realPerson = (function () {
    function realPerson() {
    }
    realPerson.prototype.greeting = function () {
        alert("Hello,I'm " + this.name + "and My age is" + this.age + ".");
    };
    return realPerson;
})();
var a = new realPerson();
a.name = "Morita";
a.age = 34;
a.greeting();
