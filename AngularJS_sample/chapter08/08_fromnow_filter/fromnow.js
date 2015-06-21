angular.module('app')
  .filter('fromnow', function createFromNowFilter() {
    function format(diff, denominator, unit) {
      return '' + Math.round(Math.abs(diff) / denominator) + unit + (diff > 0 ? '前' : '後');
    }

    var formatters = [
      {upperSeconds: 10, format: function (diff) {
        return '今';
      }},
      {upperSeconds: 60, format: function (diff) {
        return format(diff, 1, '秒');
      }},
      {upperSeconds: 60 * 60, format: function (diff) {
        return format(diff, 60, '分');
      }},
      {upperSeconds: 60 * 60 * 24, format: function (diff) {
        return format(diff, 60 * 60, '時間');
      }},
      {upperSeconds: 60 * 60 * 24 * 30, format: function (diff) {
        return format(diff, 60 * 60 * 24, '日');
      }},
      {upperSeconds: 60 * 60 * 24 * 365, format: function (diff) {
        return format(diff, 60 * 60 * 24 * 30, '月');
      }},
      {upperSeconds: Infinity, format: function (diff) {
        return format(diff, 60 * 60 * 24 * 365, '年');
      }},
    ];
    return function fromNowFilter(value, baseDate) {
      if (!angular.isDate(value)) {
        return value;
      }
      var now = baseDate || new Date();
      var diff = (now.getTime() - value.getTime()) / 1000
        + (now.getTimezoneOffset() - value.getTimezoneOffset()) * 60;


      for (var i = 0; i < formatters.length; i++) {
        var formatter = formatters[i];
        if (Math.abs(diff) < formatter.upperSeconds) {
          return formatter.format(diff)
        }
      }
    };
  });