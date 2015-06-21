var app = angular.module('app')
  .provider('ProviderWithInjection', ['constService', function (constService) {
    this.$get = ['valueService', function (valueService) {
      return constService + valueService;
    }];
  }]);

app.constant('constService', 1234);
app.value('valueService', 5678);
