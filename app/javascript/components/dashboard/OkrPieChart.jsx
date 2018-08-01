import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { PieChart, Pie, Tooltip, Label } from 'recharts';

class OkrPieChart extends PureComponent {

  getPieChartProperties(objective) {
    const startAngle = 90;
    let endAngle = startAngle;
    const minAngle = 10;

    const data = objective.get('keyResults').map(keyResult => {
      if (keyResult.get('progressRate') === 0) {
        endAngle -= minAngle; // 進捗率0%の KR は minAngle 幅で表示されるためその分の幅を追加する
      }
      return {
        name: (keyResult.get('disabled') ? '[無効] ' : '') + keyResult.get('name'),
        value: Math.max(0.1, keyResult.get('progressRate')), // 進捗率0%の KR を表示するため nonzero の値を指定する
        className: keyResult.get('status'),
      }
    });

    return {
      data: data.toArray(),
      startAngle: startAngle,
      endAngle: endAngle - Math.round(objective.get('progressRate') / 100 * 360),
      minAngle: minAngle,
      label: `${this.props.objective.get('progressRate')}%`,
    };
  }

  formatter = value => `${Math.round(value)}%`

  getPieChart = (objective) => {
    const { data, startAngle, endAngle, minAngle, label } = this.getPieChartProperties(objective);
    return (
      <PieChart width={145} height={145}>
        <Pie data={data}
             dataKey="value"
             startAngle={startAngle} // 時計回りのアニメーションにするため startAngle/endAngle の値を指定する
             endAngle={endAngle}
             minAngle={minAngle}
             innerRadius={50}
             outerRadius={70}
             paddingAngle={2}>
          <Label value={label} position="center" className="okr-pie-chart__progress" />
        </Pie>
        <Tooltip formatter={this.formatter} />
      </PieChart>
    );
  }

  render() {
    const { objective } = this.props
    return (
      <div className='okr-pie-chart'>
        {objective.get('keyResults').isEmpty()
          ? <div className='empty okr-pie-chart__progress'>{objective.get('progressRate')}%</div>
          : this.getPieChart(objective)
        }
      </div>
    );
  }
}

OkrPieChart.propTypes = {
  // container
  // component
  objective: ImmutablePropTypes.map.isRequired,
};

export default OkrPieChart;
