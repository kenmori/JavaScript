// class player{
// 	static kago: number = 0;
// 	throwTama(balls:number){
// 		player.kago += balls;
//
//// }
// var player1 = new player();
// var player2 = new player();
// var player3 = new player();
//
// player1.throwTama(3);
// player2.throwTama(2);
// player3.throwTama(5);
// alert("かごの中の玉は" + player.kago + "個です。");



//玉の数を数えるだけの関数をインスタンス化しないで静的メンバとして扱う時
//
// class player{
// 	static kago: number = 0;
// 	static throwTama(balls:number){
// 		player.kago += balls;
// 	}
// }
// player.throwTama(3);
// player.throwTama(5);
// player.throwTama(2);

//以下の場kagoは別物となる
class player {
	static kago: number = 0;
	kago: number = 0;
}
player.kago = 2;
var kenji = new player();
kenji.kago = 1;
console.log(player.kago);
console.log(kenji.kago);
