import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Objective from './Objective';

const cardTarget = {
	drop() {},
}

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class ObjectiveList extends Component {

  selectObjective = objective => {
    this.props.setMapObjective(objective);
    this.props.changeCurrentOkr(objective.get('id'));
  }

  render() {
    return this.props.connectDropTarget(
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
  connectDropTarget: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(DropTarget('card', cardTarget, collect)(ObjectiveList));