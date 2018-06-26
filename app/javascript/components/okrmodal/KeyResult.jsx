import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { DragSource, DropTarget } from 'react-dnd';
import { openKeyResult } from '../../utils/linker';
import { Segment, Icon } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import ProgressRate from '../util/ProgressRate'
import { onTouch } from '../../utils/backend';

const itemSource = {
  canDrag(props) {
    return props.canMoveKeyResult;
  },

  beginDrag(props) {
    return {
      id: props.keyResult.get('id'), // required to update isDragging
      index: props.index,
    }
  },

  endDrag(props) {
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
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex !== hoverIndex) {
      props.moveKeyResult(dragIndex, hoverIndex);

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

class KeyResult extends PureComponent {
  swapKeyResult = toUp => event => {
    const fromIndex = this.props.index;
    const toIndex = toUp ? fromIndex - 1 : fromIndex + 1;
    this.props.moveKeyResult(fromIndex, toIndex, true);
    event.stopPropagation();
  }

  handleClick = () => openKeyResult(this.props.keyResult.get('id'))

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
          key={keyResult.get('id')}
          onClick={this.handleClick}>

          <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('members')} />
          <div className="sidebar__name">{keyResult.get('name')}</div>
          <ProgressRate value={keyResult.get('progressRate')} status={keyResult.get('status')} type='label' />

          {canMoveKeyResult && (
            <div className="sidebar__swap-icons">
              <Icon name='arrow circle up' size='large' color='grey' fitted className='swap-up'
                    onClick={this.swapKeyResult(true)} />
              <Icon name='arrow circle down' size='large' color='grey' fitted className='swap-down'
                    onClick={this.swapKeyResult(false)} />
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
  // container
  // component
  index: PropTypes.number.isRequired,
  keyResult: ImmutablePropTypes.map.isRequired,
  isSelected: PropTypes.bool.isRequired,
  canMoveKeyResult: PropTypes.bool.isRequired,
  moveKeyResult: PropTypes.func.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget('item', itemTarget, collectTarget)(DragSource('item', itemSource, collectSource)(KeyResult));
