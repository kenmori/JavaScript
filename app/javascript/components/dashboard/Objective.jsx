import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'semantic-ui-react';
import OkrPieChart from './OkrPieChart';

const isTouchSupport = 'ontouchstart' in window;

const boxSource = {
  canDrag(props) {
    return props.canMoveObjective;
  },

  beginDrag(props) {
    return {
      id: props.objective.get('id'),
      index: props.index,
    }
  },

  endDrag(props) {
    props.updateObjectiveOrder();
  },
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const boxTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex !== hoverIndex) {
      props.moveObjective(dragIndex, hoverIndex);

      // https://github.com/react-dnd/react-dnd/blob/master/packages/documentation/examples/04%20Sortable/Simple/Card.js#L63
      monitor.getItem().index = hoverIndex;
    }
  },
}

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
  }
}

class Objective extends Component {
  swapObjective(event, toLeft) {
    const fromIndex = this.props.index;
    const toIndex = toLeft ? fromIndex - 1 : fromIndex + 1;
    this.props.updateObjectiveOrder(fromIndex, toIndex);
    event.stopPropagation();
  }

  objectiveHtml() {
    const {
      objective,
      isSelected,
      selectObjective,
      canMoveObjective,
      isDragging,
      canDrop
    } = this.props;
    return (
      <div
        className={`objective-box ${isSelected ? 'active' : ''} ${isDragging ? 'drag' : ''} ${canDrop ? 'drop' : ''} ${isTouchSupport ? 'touch' : ''}`}
        onClick={() => selectObjective(objective)}
      >
        <div>
          <div className='name'>{objective.get('name')}</div>
        </div>
        <OkrPieChart objective={objective} />
        {canMoveObjective && (
          <div className='swap-icons'>
            <Icon name='arrow circle left' size='large' color='grey' fitted className='swap-left'
                  onClick={event => this.swapObjective(event, true)} />
            <Icon name='arrow circle right' size='large' color='grey' fitted className='swap-right'
                  onClick={event => this.swapObjective(event, false)} />
          </div>
        )}
      </div>
    )
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return connectDragSource(connectDropTarget(this.objectiveHtml()));
  }
}

Objective.propTypes = {
  index: PropTypes.number.isRequired,
  objective: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired,
  canMoveObjective: PropTypes.bool.isRequired,
  moveObjective: PropTypes.func.isRequired,
  updateObjectiveOrder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('box', boxTarget, collectTarget)(DragSource('box', boxSource, collectSource)(Objective));
