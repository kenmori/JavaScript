// class cat {
// 	public name = "Unknown";
// }
// var x = new cat();
// alert(x.name);
var man = (function () {
    function man(firstName, lastName) {
        this.name = lastName + firstName;
    }
    return man;
})();
var x = new man("賢二", "森田");
x.name[1];
