import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Objective from './Objective';

class ObjectiveList extends Component {
  constructor() {
    super();
    this.state = {
      isDragging: false
    }
  }

  changeDragStyle(isDragging) {
    this.setState({
      isDragging
    })
  }

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
    return (
      <div className={`objective-list ${this.state.isDragging ? 'is-dragging' : ''}`}>
        {this.props.objectives.map((objective) => {
          const isSelected = objective.get('id') === this.props.currentObjectiveId;
          return <Objective
            key={objective.get('id')}
            objective={objective}
            isSelected={isSelected}
            moveCard={this.props.replaceObjectives}
            objectivesLength={this.props.objectives.size}
            updateUserObjectiveOrder={this.props.updateUserObjectiveOrder}
            findCard={this.findCard.bind(this)}
            changeDragStyle={this.changeDragStyle.bind(this)}
            isSelectedLoginUser={this.props.isSelectedLoginUser}
            selectObjective={this.selectObjective.bind(this)} />
        })}
      </div>
    );
  }
}

ObjectiveList.propTypes = {
  objectives: PropTypes.object.isRequired,
  isSelectedLoginUser: PropTypes.bool.isRequired,
  setMapObjective: PropTypes.func.isRequired,
};

const isTouchSupport = 'ontouchstart' in window;
const backend = isTouchSupport ? TouchBackend : HTML5Backend;

export default DragDropContext(backend)(ObjectiveList);