import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Label } from 'recharts';
import PropTypes from 'prop-types';

class OkrPieChart extends Component {

  getPieChartProperties(objective) {
    return {
      data: objective.get('keyResults').map(keyResult => (
        {
          name: keyResult.get('name'),
          value: Math.round(keyResult.get('progressRate') / objective.get('keyResults').size),
        }
      )).toArray(),
      endAngle: 90 - Math.round(objective.get('progressRate') / 100 * 360),
      label: `${this.props.objective.get('progressRate')}%`,
    };
  }

  render() {
    const { data, endAngle, label } = this.getPieChartProperties(this.props.objective);
    return (
      <PieChart width={160} height={160}>
        <Pie data={data}
             dataKey="value"
             startAngle={90}
             endAngle={endAngle}
             innerRadius={50}
             outerRadius={70}
             fill="lightgray"
             paddingAngle={2}>
          <Label value={label} position="center" fill="indianred"/>
        </Pie>
        <Tooltip formatter={value => `${value}%`}/>
      </PieChart>
    );
  }
}

OkrPieChart.propTypes = {
  objective: PropTypes.object.isRequired,
};

export default OkrPieChart;
