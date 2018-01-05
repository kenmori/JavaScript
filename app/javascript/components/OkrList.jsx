import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OkrPieChart from './OkrPieChart';

class OkrList extends Component {
  render() {
    const selectedId = this.props.selectedObjective && this.props.selectedObjective.get('id');
    return (
      <div className="okr-list">
        {
          this.props.objectives.map((objective) => {
            const isSelected = objective.get('id') === selectedId;
            return (
              <a className={`okr-box ${isSelected ? 'active' : ''}`} key={objective.get('id')}
                 href="javascript:void(0)" onClick={() => this.props.onSelect(objective)}>
                <div className='name'>{objective.get('name')}</div>
                <OkrPieChart objective={objective} />
              </a>
            );
          })}
      </div>
    );
  }
}

OkrList.propTypes = {
  objectives: PropTypes.object.isRequired,
  selectedObjective: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};
OkrList.defaultProps = {
  selectedObjective: null,
};

export default OkrList;
