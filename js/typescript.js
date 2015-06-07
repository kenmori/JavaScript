//列挙型
var team;
(function (team) {
    team[team["紅組"] = 0] = "紅組";
    team[team["白組"] = 1] = "白組";
})(team || (team = {}));
var win = team.紅組;
if (win == team.紅組)
    alert("紅組の勝利です");
else
    alert("白組の勝利です!");
