import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OkrPieChart from './OkrPieChart';

class Objective extends Component {
  render(props) {
    const {
      objective,
      isSelected,
      selectObjective,
    } = this.props;
    return (
      <a className={`objective-box ${isSelected ? 'active' : ''}`}
          href="javascript:void(0)" onClick={() => selectObjective(objective)}>
        <div><div className='name'>{objective.get('name')}</div></div>
        <OkrPieChart objective={objective} />
      </a>
    );
  }
}

Objective.propTypes = {
  objective: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired
};

export default Objective;
