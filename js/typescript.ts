//列挙型

// var win:string = "紅組";//ここが「赤組」となると白組が勝利してします。関係の無い文字列が入力されてしまうのが問題
// if(win == "紅組") alert("紅組の勝利です");
// else alert("白組の勝利です");
//自由度の高い文字列ではなくonかoffかのbooleanをつかう

var win:boolean = true;
if(win) alert("赤組の勝利です");
else alert("白組の勝利です");
