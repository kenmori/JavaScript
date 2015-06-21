var appEl = angular.element(document.getElementById('app'));
var childEls = appEl.children();
angular.forEach(childEls, function (el, i) {
  angular.element(el).text('{{message}}');
});
