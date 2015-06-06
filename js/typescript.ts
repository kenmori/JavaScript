class man {
	constructor(public name: string){}
}
function greeting(){
	alert(this.name + "君");
}
man.prototype["greeting"] = greeting;
var morita = new man("morita");
morita["greeting"]();

var morim = new man("morim");
morim["greeting"]();
