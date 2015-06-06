interface abstractPerson{
	name : string;
	greeting():void;
}
class kodai implements abstractPerson{
	name = "kodai";
	greeting(){
		alert("Hello,I'm"+ this.name );
	}
	shoot(){
		alert("Fire!");
	}
}
class morita implements abstractPerson{
	name = "morita";
	greeting(){
		alert("Hello,I'm" + this.name);
	}
	warp(){
		alert("Warp!");
	}
}
class yuki implements abstractPerson{
	name = "yuki";
	greeting(){
		alert("My name is" + this.name);
	}
	coffee(){
		alert("Coffee!!");
	}
}
var all: abstractPerson[] = [new kodai(),new morita(),new yuki()];
for(var i = 0;i< all.length; i++){
	all[i].greeting();
}
