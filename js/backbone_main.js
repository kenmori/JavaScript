// var Contact = Backbone.Model.extend({
// 	defaults : {
// 		firstName : '',
// 		lastName : '',
// 		email : ''
// 	}
// });
// var contact = new Contact({
// 	firstName : 'kenji',
// 	lastName : 'morita',
// 	email : 'kenji@example.com'
// });
// console.log(JSON.stringify(contact,null,2));//第2引数は出力される値のフィルタリングや加工のためのオプション、第3引数はインデント幅指定


var Contact = Backbone.Model.extend({
	initialize : function(){
		console.log('Contactが初期化されました');
	}
});
var contact = new Contact();
//プロパティの設定
contact.set('firstName','Kenji');
//オブジェクトで複数setする
contact.set({
	firstName : 'Kenji',
	lastName : 'Morita'
})
console.log(contact.get('firstName'));//Kenji
console.log(contact.get('lastName'));//Morita