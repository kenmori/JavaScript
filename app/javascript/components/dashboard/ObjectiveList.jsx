import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Objective from './Objective';

class ObjectiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      objectiveOrder: props.objectiveOrder,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.objectiveOrder.equals(this.props.objectiveOrder)) {
      this.setState({ objectiveOrder: nextProps.objectiveOrder });
    }
  }

  moveBox = (dragIndex, hoverIndex) => {
    if (hoverIndex < 0 || this.state.objectiveOrder.size <= hoverIndex) {
      return;
    }
    const dragId = this.state.objectiveOrder.get(dragIndex);
    const objectiveOrder = this.state.objectiveOrder.delete(dragIndex).insert(hoverIndex, dragId);
    this.setState({ objectiveOrder });
  }

  updateObjectiveOrder = () => {
    if (!this.state.objectiveOrder.equals(this.props.objectiveOrder)) {
      this.props.updateObjectiveOrder({
        id: this.props.userId,
        objectiveOrder: JSON.stringify(this.state.objectiveOrder),
      });
    }
  }

  selectObjective = objective => {
    this.props.setMapObjective(objective);
    this.props.changeCurrentOkr(objective.get('id'));
  }

  render() {
    return (
      <div className={`objective-list ${this.state.isDragging ? 'is-dragging' : ''}`}>
        {this.props.objectives
          .sortBy(objective => this.state.objectiveOrder.indexOf(objective.get('id')))
          .map((objective, index) => {
            const objectiveId = objective.get('id');
            const isSelected = objectiveId === this.props.currentObjectiveId;
            return <Objective
              key={objectiveId}
              index={index}
              id={objectiveId}
              objective={objective}
              isSelected={isSelected}
              moveBox={this.moveBox}
              updateObjectiveOrder={this.updateObjectiveOrder}
              setDragging={isDragging => this.setState({ isDragging })}
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
  objectiveOrder: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
};

const isTouchSupport = 'ontouchstart' in window;
const backend = isTouchSupport ? TouchBackend : HTML5Backend;

export default DragDropContext(backend)(ObjectiveList);
