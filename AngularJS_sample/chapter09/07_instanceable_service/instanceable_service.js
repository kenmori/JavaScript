var app = angular.module('app');

app.factory('TaxCalculatorFactory', function () {

  function TaxCalculator(tax) {
    this.tax = tax;
  }

  TaxCalculator.prototype.calculate = function (price) {
    price = parseInt(price);
    if (isNaN(price)) {
      return 0;
    } else {
      return Math.floor(price + (price * this.tax));
    }
  };

  function TaxCalculatorFactory(tax) {
    return new TaxCalculator(tax);
  }

  return TaxCalculatorFactory;
});
