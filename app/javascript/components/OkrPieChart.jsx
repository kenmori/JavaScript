import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Label } from 'recharts';
import PropTypes from 'prop-types';

class OkrPieChart extends Component {

  getPieChartProperties(objective) {
    const startAngle = 90;
    let endAngle = startAngle;
    const minAngle = 10;

    const data = objective.get('keyResults').map(keyResult => {
      if (keyResult.get('progressRate') === 0) {
        endAngle -= minAngle; // 進捗率0%の KR は minAngle 幅で表示されるためその分の幅を追加する
      }
      return {
        name: keyResult.get('name'),
        value: Math.max(0.1, keyResult.get('progressRate')), // 進捗率0%の KR を表示するため nonzero の値を指定する
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

  getPieChart = (objective) => {
    const { data, startAngle, endAngle, minAngle, label } = this.getPieChartProperties(objective);
    return (
      <PieChart width={160} height={160}>
        <Pie data={data}
             dataKey="value"
             startAngle={startAngle} // 時計回りのアニメーションにするため startAngle/endAngle の値を指定する
             endAngle={endAngle}
             minAngle={minAngle}
             innerRadius={50}
             outerRadius={70}
             fill="lightgray"
             paddingAngle={2}>
          <Label value={label} position="center" className="progress-rate" />
        </Pie>
        <Tooltip formatter={value => `${Math.round(value)}%`} />
      </PieChart>
    );
  }

  render() {
    return (
      <div className='okr-pie-chart'>
        {(() => {
          if (this.props.objective.get('keyResults').isEmpty()) {
            return <div className='empty progress-rate'>-%</div>;
          } else {
            return this.getPieChart(this.props.objective);
          }
        })()}
      </div>
    );
  }
}

OkrPieChart.propTypes = {
  objective: PropTypes.object.isRequired,
};

export default OkrPieChart;
