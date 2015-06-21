exports.config = {
  // Seleniumサーバーのアドレス
  seleniumAddress: "http://localhost:4444/wd/hub",
  // テストで利用するブラウザなどの条件を設定することができます。
  // 詳細は https://code.google.com/p/selenium/wiki/DesiredCapabilities
  capabilities: {
    browserName: "chrome"
  },
  // テスト対象のspecファイルのパス
  specs: ["todo_spec.js"],
  // テスト対象のアプリケーションのベースURL
  baseUrl: 'http://localhost:9000/',
  // 利用するテストフレームワーク
  framework: "jasmine",
  // jasmine用の設定
  // 詳細は https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    showColors: true
  }
};