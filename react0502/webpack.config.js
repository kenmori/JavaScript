//設定ファイルを作成すればコマンドで引数を渡す必要がない
module.exports= {
	entry : './main.js',//このファイルのrequireを辿っていく
	output: {
		path: __dirname,
		filename: 'bundle.js'//全てまとめたファイルがここに出力される
	},
	devtool: 'inline-source-map',//デバック用のツールが使える。
	// http://webpack.github.io/docs/configuration.html#devtool
	module:{
	//http://webpack.github.io/docs/configuration.html#module-loaders
		loaders: [//ファイルがある条件を満たしていたらローダーで変換される
					//今回は*.jsxをjsxコンパイラに通すようにする
			{test: /\.jsx$/,loader: 'jsx-loader'}
		]
	},
	resolve: {
		//対象ファイルをModuleと認識する。3つを含める。どれか一つでも欠けるとエラーになる
		//http://webpack.github.io/docs/configuration.html#resolve-extensions
		extensions: ['','.js','.jsx']
	}
};
