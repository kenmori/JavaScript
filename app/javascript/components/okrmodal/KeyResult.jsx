import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { openKeyResult } from '../../utils/linker';
import { Segment } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

const keyResultSource = {
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
  keyResultHtml() {
    const {
      keyResult,
      currentKeyResultId
    } = this.props;

    const cls = currentKeyResultId === keyResult.get('id') ? 'sidebar__item is-current' : 'sidebar__item';

    return (
      <div>
        <Segment className={cls} key={keyResult.get('id')} onClick={() => openKeyResult(keyResult.get('id'))}>
          <span className="sidebar__avatar"><OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')} /></span>
          <span className="sidebar__val">{keyResult.get('name')}</span>
          <span className="progress-rate sidebar__rate">{keyResult.get('progressRate')}%</span>
        </Segment>
      </div>
    )
  }
  render() {
    const { 
      connectDragSource,
      connectDropTarget,
    } = this.props;
    
    return (
      connectDragSource(connectDropTarget(this.keyResultHtml()))
    )
  }
}

KeyResult.propTypes = {
  keyResult: PropTypes.object.isRequired,
  currentKeyResultId: PropTypes.number,
  replaceKeyResults: PropTypes.func,
  findKeyResult: PropTypes.func,
  changeDragStyle: PropTypes.func,
};

export default DropTarget('keyResult', keyResultTarget, collectTarget)(DragSource('keyResult', keyResultSource, collectSource)(KeyResult));
