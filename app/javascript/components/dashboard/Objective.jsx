import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd'
import OkrPieChart from './OkrPieChart';

const cardSource = {
	beginDrag(props) {
    console.log("beginDrag", props.objective.get('id'), props.findCard(props.objective.get('id')).index)
    return {
			id: props.objective.get('id'),
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()
    console.log("endDrag", droppedId, didDrop);
		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging(),
  }
}

const cardTarget = {
	canDrop() {
    console.log("canDrop");
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem();
    const overId = props.objective.get('id');
    
		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
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
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('card', cardTarget, collectTarget)(DragSource('card', cardSource, collectSource)(Objective));