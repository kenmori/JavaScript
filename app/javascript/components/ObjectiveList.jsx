import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OkrPieChart from './OkrPieChart';

class ObjectiveList extends Component {

  selectObjective = objective => {
    this.props.setMapObjective(objective);
    this.props.changeCurrentObjective(objective.get('id'));
  }

  render() {
    return (
      <div className="objective-list">
        {
          this.props.objectives.map((objective) => {
            const isSelected = objective.get('id') === this.props.currentObjectiveId;
            return (
              <a className={`objective-box ${isSelected ? 'active' : ''}`} key={objective.get('id')}
                 href="javascript:void(0)" onClick={() => this.selectObjective(objective)}>
                <div className='name'>{objective.get('name')}</div>
                <OkrPieChart objective={objective} />
              </a>
            );
          })}
      </div>
    );
  }
}

ObjectiveList.propTypes = {
  objectives: PropTypes.object.isRequired,
  setMapObjective: PropTypes.func.isRequired,
};

export default ObjectiveList;
