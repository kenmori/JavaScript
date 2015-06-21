module.exports = function (config) {
  config.set({
    // filesやexcludeを指定する際のベースとなるディレクトリのパスを指定します
    basePath: '',
    // テストに利用するファイルを指定します
    files: [
      '../../angular/angular.js',
      '../../angular/angular-mocks.js',
      '*_spec.js'
    ],
    // 上記のfilesで指定したファイルのうち、不要なものを指定します
    exclude: [],
    // テストを実行する前に行う処理を指定します
    // CoffeeScriptで記述したテストコードをJavaScriptにコンパイルする用途などに利用します
    preprocessors: {},
    // 利用するテストフレームワークを指定します
    frameworks: ['jasmine'],
    // テストの実行状況を通知する方法を指定します
    reporters: ['progress'],
    // Karmaを起動するWebサーバのポート番号を指定します
    port: 9876,
    // trueに設定すると、テストの実行状況やログの出力に色が付きます
    colors: true,
    // 出力するログのレベルを指定します
    logLevel: config.LOG_INFO,
    // テストに利用するブラウザを指定します
    browsers: ['Chrome'],
    // trueに設定するとテストを1回実行した後に終了します
    singleRun: false,
    // trueに設定すると、filesで指定したファイルに変更があった際に自動的にテストを再実行します
    // autoWatchを有効にする場合は、singleRunをfalseに設定する必要があります
    autoWatch: true
  });
};
