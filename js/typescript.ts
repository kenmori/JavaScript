class cat {
	name : string;
	myau(){alert(this.name + 'は泣きました')}
	localAge : number;
	get age(){return this.localAge;}
	set age(value){
		if(value < 0) throw "ageは負の数では無いはずです";
		this.localAge = value;
	}
	constructor(){
		alert("constructed");
		this.name = "Unknown";
		this.age = 1;
	}
}
var x = new cat();
x.name = "nya-chan";
alert(x.name);
x.myau();
x.age = 5;
alert(x.age);
