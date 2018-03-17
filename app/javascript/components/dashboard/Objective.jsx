import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd'
import OkrPieChart from './OkrPieChart';

const cardSource = {
	beginDrag(props) {
    console.log(props)
    return {}
	},

	endDrag(props, monitor) {
    console.log(props, monitor);
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
		return false
	},

	hover(props, monitor) {
		console.log(props, monitor);
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
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('card', cardTarget, collectTarget)(DragSource('card', cardSource, collectSource)(Objective));