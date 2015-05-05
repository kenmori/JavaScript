//設定ファイルを作成すればコマンドで引数を渡す必要がない
module.exports= {
	entry : './main.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	}
};
