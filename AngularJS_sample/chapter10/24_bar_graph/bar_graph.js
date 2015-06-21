var app = angular.module('app');
app.directive('barGraph', [function () {
  return {
    scope: {
      height: '=',
      width: '=',
      data: '='
    },
    restrict: 'EA',
    link: function (scope, iElement) {
      // 描画領域を生成
      var svg = d3.select(iElement[0])
        .append('svg')
        .attr('width', scope.width)
        .attr('height', scope.height * 1.2);

      // グラフの高さを正規化する関数の作成
      var scale = d3.scale.linear()
        .domain([0, d3.max(scope.data, function (d) {
          return d.count;
        })])
        .range([scope.height, 0]);

      var barAreaWidth = scope.width / scope.data.length;
      var barWidth = barAreaWidth * 0.8;
      var widthMargin = barAreaWidth * 0.1;
      var heightMargin = scope.height * 0.1;

      // 棒グラフを生成
      svg.selectAll('rect')
        .data(scope.data)
        .enter()
        .append('rect')
        .attr({
          x: function (d, i) {
            return i * barAreaWidth + widthMargin;
          },
          y: function (d) {
            return heightMargin + scale(d.count);
          },
          width: barWidth,
          height: function (d) {
            return scope.height - scale(d.count)
          },
          fill: 'blue'
        });

      // Y軸の説明を追加
      svg.selectAll("text.yAxis")
        .data(scope.data)
        .enter()
        .append("svg:text")
        .attr('x', function (d, i) {
          return i * barAreaWidth;
        })
        .attr('y', function () {
          return heightMargin * 2 + scope.height;
        })
        .attr("dx", barAreaWidth / 2)
        .attr("dy", '-0.2em')
        .attr("text-anchor", "middle")
        .text(function (d) {
          return d.month;
        })
        .attr("class", "yAxis");
    }
  };
}]);
