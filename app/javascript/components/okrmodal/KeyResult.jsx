import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { openKeyResult } from '../../utils/linker';
import { Segment, Icon } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

const MOVE_UP = 'up';
const MOVE_DOWN = 'down';

const keyResultSource = {
  canDrag(props) {
    return props.isObjectiveOwner;
  },

	beginDrag(props) {
    const id = props.keyResult.get('id');
    props.changeDragStyle(true);
    return {
			id,
			originalIndex: props.findKeyResult(id).index,
		}
	},

	endDrag(props, monitor) {
    props.changeDragStyle(false);
    props.updateKeyResultOrder();
	},
}

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
  }
}

const keyResultTarget = {
	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem();
    const overId = props.keyResult.get('id');
		if (draggedId !== overId) {
      const { index: originalIndex } = props.findKeyResult(draggedId)
			const { index: overIndex } = props.findKeyResult(overId)
			props.replaceKeyResults(originalIndex, overIndex)
		}
	},
}

const collectTarget = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}



class KeyResult extends Component {
  moveKeyResult(evt, direction) {
    const currentIndex = this.props.findKeyResult(this.props.keyResult.get('id')).index;
    const nextIndex = direction === MOVE_UP ? currentIndex - 1 :
                        direction === MOVE_DOWN ? currentIndex + 1 : -1;
    if (nextIndex >= 0) {
      this.props.replaceKeyResults(currentIndex, nextIndex);
      setTimeout(() => {
        this.props.updateKeyResultOrder();
      }, 0);
    }
    evt.stopPropagation();
  }
  keyResultHtml() {
    const {
      keyResult,
      currentKeyResultId
    } = this.props;

    const cls = currentKeyResultId === keyResult.get('id') ? 'sidebar__item is-current' : 'sidebar__item';
    const canDisplayedNavi = this.props.isObjectiveOwner;
    return (
      <div 
        className="sidebar__item-wrapper"
      >
        <Segment className={cls} key={keyResult.get('id')} onClick={() => openKeyResult(keyResult.get('id'))}>
          <span className="sidebar__avatar"><OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')} /></span>
          <span className="sidebar__val">{keyResult.get('name')}</span>
          <span className="progress-rate sidebar__rate">{keyResult.get('progressRate')}%</span>
          {canDisplayedNavi && (
            <div className="sidebar__item-nav">
              <Icon name='arrow circle up' size='large' color='grey' className='sort-up'
                    onClick={(evt) => this.moveKeyResult(evt, MOVE_UP)} />
              <Icon name='arrow circle down' size='large' color='grey' className='sort-down'
                    onClick={(evt) => this.moveKeyResult(evt, MOVE_DOWN)} />
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
  currentKeyResultId: PropTypes.number,
  replaceKeyResults: PropTypes.func,
  findKeyResult: PropTypes.func,
  changeDragStyle: PropTypes.func,
  updateKeyResultOrder: PropTypes.func,
};

export default DropTarget('keyResult', keyResultTarget, collectTarget)(DragSource('keyResult', keyResultSource, collectSource)(KeyResult));
