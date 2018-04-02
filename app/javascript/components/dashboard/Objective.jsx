import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'semantic-ui-react';
import OkrPieChart from './OkrPieChart';

const boxSource = {
  canDrag(props) {
    return props.isSelectedLoginUser;
  },

  beginDrag(props) {
    const id = props.objective.get('id');
    props.setDragging(true);
    return {
      id,
      originalIndex: props.findBox(id).index,
    }
  },

  endDrag(props) {
    props.setDragging(false);
    props.updateUserObjectiveOrder();
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
    const { id: draggedId } = monitor.getItem();
    const overId = props.objective.get('id');

    if (draggedId !== overId) {
      const { index: originalIndex } = props.findBox(draggedId)
      const { index: overIndex } = props.findBox(overId)
      props.moveBox(originalIndex, overIndex)
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
  moveObjective(event, toLeft) {
    const currentIndex = this.props.findBox(this.props.objective.get('id')).index;
    const nextIndex = toLeft ? currentIndex - 1 : currentIndex + 1;
    this.props.moveBox(currentIndex, nextIndex);
    setTimeout(() => this.props.updateUserObjectiveOrder(), 0);
    event.stopPropagation();
  }

  objectiveHtml() {
    const {
      objective,
      isSelected,
      selectObjective,
      isDragging,
      canDrop
    } = this.props;
    return (
      <div
        className={`objective-box ${isSelected ? 'active' : ''} ${isDragging ? 'drag' : ''} ${canDrop ? 'drop' : ''}`}
        onClick={() => selectObjective(objective)}
      >
        <div>
          <div className='name'>{objective.get('name')}</div>
        </div>
        <OkrPieChart objective={objective} />
        {this.props.isSelectedLoginUser && (
          <div className='swap-icons'>
            <Icon name='arrow circle left' size='large' color='grey' fitted className='swap-left'
                  onClick={event => this.moveObjective(event, true)} />
            <Icon name='arrow circle right' size='large' color='grey' fitted className='swap-right'
                  onClick={event => this.moveObjective(event, false)} />
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
  objective: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired,
  isSelectedLoginUser: PropTypes.bool.isRequired,
  moveBox: PropTypes.func.isRequired,
  findBox: PropTypes.func.isRequired,
  setDragging: PropTypes.func.isRequired,
  updateUserObjectiveOrder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('box', boxTarget, collectTarget)(DragSource('box', boxSource, collectSource)(Objective));
