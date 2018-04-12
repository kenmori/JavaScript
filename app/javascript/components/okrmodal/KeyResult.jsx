import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { openKeyResult } from '../../utils/linker';
import { Segment, Icon } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import { onTouch } from '../../utils/backend';

const itemSource = {
  canDrag(props) {
    return props.canMoveKeyResult;
  },

  beginDrag(props) {
    const id = props.keyResult.get('id');
    props.setDragging(true);
    return {
      id,
      originalIndex: props.findKeyResult(id).index,
    }
  },

  endDrag(props) {
    props.setDragging(false);
    props.updateKeyResultOrder();
  },
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const itemTarget = {
  hover(props, monitor) {
    const dragId = monitor.getItem().id;
    const hoverId = props.keyResult.get('id');
    if (dragId !== hoverId) {
      const dragIndex = props.findKeyResult(dragId).index;
      const hoverIndex = props.findKeyResult(hoverId).index;
      props.replaceKeyResults(dragIndex, hoverIndex);
    }
  },
}

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
  }
}

class KeyResult extends Component {
  moveKeyResult(event, toUp) {
    const currentIndex = this.props.findKeyResult(this.props.keyResult.get('id')).index;
    const nextIndex = toUp ? currentIndex - 1 : currentIndex + 1;
    this.props.replaceKeyResults(currentIndex, nextIndex);
    setTimeout(() => this.props.updateKeyResultOrder(), 0);
    event.stopPropagation();
  }

  keyResultHtml() {
    const {
      keyResult,
      isSelected,
      canMoveKeyResult,
      isDragging,
      canDrop,
    } = this.props;
    // Wrap Segment by div because only native element nodes can now be passed to React DnD connectors
    return (
      <div className="sidebar__item-wrapper">
        <Segment
          className={`sidebar__item ${isSelected ? 'is-current' : ''} ${isDragging ? 'drag' : ''} ${canDrop ? 'drop' : ''} ${onTouch ? 'touch' : ''}`}
          key={keyResult.get('id')} onClick={() => openKeyResult(keyResult.get('id'))}
        >
          <span className="sidebar__avatar">
            <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')} />
          </span>
          <span className="sidebar__name">{keyResult.get('name')}</span>
          <span className="progress-rate sidebar__progress">{keyResult.get('progressRate')}%</span>
          {canMoveKeyResult && (
            <div className="sidebar__swap-icons">
              <Icon name='arrow circle up' size='large' color='grey' fitted className='swap-up'
                    onClick={event => this.moveKeyResult(event, true)} />
              <Icon name='arrow circle down' size='large' color='grey' fitted className='swap-down'
                    onClick={event => this.moveKeyResult(event, false)} />
            </div>
          )}
        </Segment>
      </div>
    )
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
    } = this.props;
    return connectDragSource(connectDropTarget(this.keyResultHtml()));
  }
}

KeyResult.propTypes = {
  keyResult: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  replaceKeyResults: PropTypes.func,
  findKeyResult: PropTypes.func,
  setDragging: PropTypes.func,
  canMoveKeyResult: PropTypes.bool.isRequired,
  updateKeyResultOrder: PropTypes.func,
};

export default DropTarget('item', itemTarget, collectTarget)(DragSource('item', itemSource, collectSource)(KeyResult));
