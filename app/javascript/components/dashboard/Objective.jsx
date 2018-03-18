import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd'
import OkrPieChart from './OkrPieChart';

const cardSource = {
	beginDrag(props) {
    const id = props.objective.get('id');
    props.changeDragStyle(true);
    return {
			id,
			originalIndex: props.findCard(id).index,
		}
	},

	endDrag(props, monitor) {
    props.changeDragStyle(false);
		props.updateUserObjectiveOrder();
	},
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
  }
}

const cardTarget = {
	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem();
    const overId = props.objective.get('id');

		if (draggedId !== overId) {
      const { index: originalIndex } = props.findCard(draggedId)
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(originalIndex, overIndex)
		}
	},
}

const collectTarget = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}


class Objective extends Component {
  objectiveHtml() {
    const {
      objective,
      isSelected,
      selectObjective,
    } = this.props;
    return (
      <span className={`objective-box ${isSelected ? 'active' : ''}`} onClick={() => selectObjective(objective)}>
        <div><div className='name'>{objective.get('name')}</div></div>
        <OkrPieChart objective={objective} />
      </span>
    )
  }
  render(props) {
    const { 
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return this.props.isSelectedLoginUser ?
            connectDragSource(connectDropTarget(this.objectiveHtml())) :
            this.objectiveHtml();
  }
}

Objective.propTypes = {
  objective: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired,
  isSelectedLoginUser: PropTypes.bool.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
  changeDragStyle: PropTypes.func.isRequired,
  updateUserObjectiveOrder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('card', cardTarget, collectTarget)(DragSource('card', cardSource, collectSource)(Objective));