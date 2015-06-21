var appEl = angular.element(document.getElementById('app'));
var msgEl = angular.element(document.getElementById('message'));
var newMsg = msgEl.clone();
appEl.append(newMsg);
