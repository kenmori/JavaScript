var appEl = angular.element(document.getElementById('app'));
var btnEl = angular.element(document.getElementById('button'));
btnEl.on('click', function (e) {
  appEl.empty();
});
