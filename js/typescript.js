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
var player = (function () {
    function player() {
        this.kago = 0;
    }
    player.kago = 0;
    return player;
})();
player.kago = 2;
var kenji = new player();
kenji.kago = 1;
console.log(player.kago);
console.log(kenji.kago);
