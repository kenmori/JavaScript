var Hoge = (function () {
    function Hoge(caller) {
        if (caller == Hoge.getInstance)
            console.log("インスタンスを作成。一度しか呼ばれない");
        else if (Hoge._instance)
            throw new Error("既にインスタンスが存在する為エラー");
        else
            throw new Error("コンストラクタの引数が不正な為エラー");
    }
    Hoge.getInstance = function () {
        console.log("Hogeクラスインスタンスの取得");
        if (!this._instance)
            this._instance = new Hoge(Hoge.getInstance);
        return this._instance;
    };
    return Hoge;
})();
var hoge1 = Hoge.getInstance();
var hoge2 = Hoge.getInstance();
