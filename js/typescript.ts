//http://qiita.com/tonkotsuboy_com/items/6d86d68200326757195d
class Hoge
{
	//インスタンス
	private static _instance: Hoge;
	public static getInstance() : Hoge
	{
		console.log("Hogeクラスインスタンスの取得");
		if(!this._instance)
		this._instance = new Hoge(Hoge.getInstance);
		return this._instance;
	}
	constructor(caller: Function){
		if(caller == Hoge.getInstance)
			console.log("インスタンスを作成。一度しか呼ばれない");
		else if(Hoge._instance)
			throw new Error("既にインスタンスが存在する為エラー");
		else
			throw new Error("コンストラクタの引数が不正な為エラー")
	}
}
var hoge1:Hoge = Hoge.getInstance();
var hoge2:Hoge = Hoge.getInstance();
