var Contact = Backbone.Model.extend({
	defaults : {
		firstName : '',
		lastName : '',
		email : ''
	}
});
var contact = new Contact({
	firstName : 'Alice',
	lastName : 'Henderson',
	email : 'alice@example.com'
});
console.log(JSON.stringify(contact,null,2));
