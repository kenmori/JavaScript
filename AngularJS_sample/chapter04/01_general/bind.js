function getMessage() {
  return this.message;
}
// (1) そのままgetMessageを呼び出すと、thisにmessageが定義されていません
var msg = getMessage();
console.log('not bound getMessage(): ' + msg);

var context = {
  message: 'Hello, World!'
};
// (2) getMessageにcontextを束縛して呼び出すと、'Hello, World!'が返ります
var fn = angular.bind(context, getMessage);
var msg = fn();
console.log('bound getMessage(): ' + msg);
