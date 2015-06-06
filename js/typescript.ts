interface abstractPerson{
	name : string;
	greeting(): void;
}
interface abstractPersonWithAge extends abstractPerson{
	age: number;
}
class realPerson implements abstractPersonWithAge{
	name: string;
	age: number;
	greeting(){
		alert("Hello,I'm " + this.name + "and My age is" + this.age + ".");
	}
}
var a = new realPerson();
a.name = "Morita";
a.age = 34;
a.greeting();
