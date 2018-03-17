import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd'
import OkrPieChart from './OkrPieChart';

const cardSource = {
	beginDrag(props) {
    const id = props.objective.get('id');
    return {
			id,
			originalIndex: props.findCard(id).index,
		}
	},

	endDrag(props, monitor) {
		props.updateUserObjectiveOrder();
	},
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging(),
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
  render(props) {
    const {
      objective,
      isSelected,
      selectObjective,
      isDragging, 
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return connectDragSource(
      connectDropTarget(
        <a className={`objective-box ${isSelected ? 'active' : ''}`}
            href="javascript:void(0)" onClick={() => selectObjective(objective)}>
          <div><div className='name'>{objective.get('name')}</div></div>
          <OkrPieChart objective={objective} />
        </a>
      )
    );
  }
}

Objective.propTypes = {
  objective: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
  updateUserObjectiveOrder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('card', cardTarget, collectTarget)(DragSource('card', cardSource, collectSource)(Objective));