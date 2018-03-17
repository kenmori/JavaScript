import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Objective from './Objective';

const cardTarget = {
	drop() {
    console.log('container: drop');
  },
}

function collect(connect) {
  console.log('container: connect', connect);
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class ObjectiveList extends Component {
	findCard(id) {
		const { objectives } = this.props
		const objective = objectives.find(c => c.get('id') === id)
		return {
			card: objective,
			index: objectives.indexOf(objective),
		}
	}

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
                    moveCard={this.props.replaceObjectives}
                    updateUserObjectiveOrder={this.props.updateUserObjectiveOrder}
                    findCard={this.findCard.bind(this)}
                    selectObjective={this.selectObjective.bind(this)} />
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