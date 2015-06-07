//列挙型

// var win:string = "紅組";//ここが「赤組」となると白組が勝利してします。関係の無い文字列が入力されてしまうのが問題
// if(win == "紅組") alert("紅組の勝利です");
// else alert("白組の勝利です");
//自由度の高い文字列ではなくonかoffかのbooleanをつかう

// var win:boolean = true;
// if(win) alert("紅組の勝利です");
// else alert("白組の勝利です");
//これではtrueと文字列は無関係

enum team {
	紅組,白組
}
var win: team = team.紅組;
if(win == team.紅組) alert("紅組の勝利です");
else alert("白組の勝利です!");

//これで変数の値がnullやundefinedの場合の誤判定やany型などを使用して型システムをバイパスしてしまう場合の問題を除けば対処できた
