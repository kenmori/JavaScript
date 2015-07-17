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
		//自身が発するイベントを自分でも捕捉したい場合はinitialize内に記述
		this.on('change', function(){
			console.log('属性が変更されました');
		});
		this.on('change: email',function(){
			console.log('email属性が変更されました');
		});
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

//属性値の有無の確認
//
console.log(contact.has('firstName'));//true
console.log(contact.has('email'));//false

//attributesへ直接アクセス
//
contact.attributes.email = 'kenjimoritata@fafa.com';
console.log(contact.get('email'));//kenjimoritata@fafa.com

//setされた値をattributesから直接取得できる
contact.set('address','Ohashi');
console.log(contact.attributes.address);

//changeイベントの監視
contact.on('change',function(){
	console.log('属性が変更されました');
});
//change:属性名と記述することで
//特定の属性値の変化に絞って監視できる
contact.on('change: email',function(){
	console.log('email属性が変更されました');
});

//イベント監視の解除
// contact.off();
// //イベント名を指定
// contact.off('change');
//
//

// コールバック関数を特定して解除
var onChange = function(){
	console.log('属性が変更されました');
};
var onChangeEmail = function(){
	console.log('email属性が変更されました');
};
contact.on('change',onChange);
contact.on('change',onChangeEmail);

//'change'イベントに対してonChange()メソッドを
//紐付けた監視だけを解除する
//
contact.off('change',onChange);

//この属性値の変更に反応するのはonChangeEmail()メソッドのみとなる
contact.set('email','henderson@example.com');
