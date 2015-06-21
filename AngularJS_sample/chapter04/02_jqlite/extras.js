var appEl = angular.element(document.getElementById('app'));
var btnEl = angular.element(document.getElementById('change-message'));
btnEl.on('click', function () {
  var scope = appEl.scope();
  scope.message = 'Goodbye, Everyone!';
  scope.$apply();
});