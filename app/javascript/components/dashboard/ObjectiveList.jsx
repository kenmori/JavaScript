import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Objective from './Objective';

class ObjectiveList extends Component {

  selectObjective = objective => {
    this.props.setMapObjective(objective);
    this.props.changeCurrentOkr(objective.get('id'));
  }

  render() {
    return (
      <div className="objective-list">
        {
          this.props.objectives.map((objective) => {
            const isSelected = objective.get('id') === this.props.currentObjectiveId;
            return <Objective
                    key={objective.get('id')}
                    objective={objective}
                    isSelected={isSelected}
                    selectObjective={this.selectObjective} />
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
