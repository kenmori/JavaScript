import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { Icon } from 'semantic-ui-react';
import OkrPieChart from './OkrPieChart';

const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';

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
  constructor() {
    super();
    this.state = {
      isHover: false,
      canMoveToleft: false,
      canMoveToRight: true,
    };
  }
  moveObjective(evt, direction) {
    const currentIndex = this.props.findCard(this.props.objective.get('id')).index;
    const nextIndex = direction === MOVE_LEFT ? currentIndex - 1 :
                        direction === MOVE_RIGHT ? currentIndex + 1 : -1;
    if (nextIndex >= 0) {
      this.props.moveCard(currentIndex, nextIndex);
      this.props.updateUserObjectiveOrder();
    }
    evt.stopPropagation();
  }
  handleMouseHover(isHover) {
    const currentIndex = this.props.findCard(this.props.objective.get('id')).index;
    this.setState({
      isHover,
      canMoveToleft: currentIndex !== 0,
      canMoveToRight: currentIndex !== this.props.objectivesLength - 1,
    });
  }
  objectiveHtml() {
    const {
      objective,
      isSelected,
      selectObjective,
    } = this.props;
    const canDisplayedNavi = this.state.isHover && this.props.isSelectedLoginUser;
    return (
      <div 
        className={`objective-box ${isSelected ? 'active' : ''}`} 
        onClick={() => selectObjective(objective)}
        onMouseOver={() => this.handleMouseHover(true)}
        onMouseLeave={() => this.handleMouseHover(false)}
      >
        <div><div className='name'>{objective.get('name')}</div></div>
        <OkrPieChart objective={objective} />
        { canDisplayedNavi &&
          <div className="sort-navi">
            { this.state.canMoveToleft &&
              <span className="sort-left"><Icon name="arrow circle left" size='large' onClick={(evt) => this.moveObjective(evt, MOVE_LEFT)} /></span>
            }
            { this.state.canMoveToRight &&
              <span className="sort-right"><Icon name="arrow circle right" size='large' onClick={(evt) => this.moveObjective(evt, MOVE_RIGHT)} /></span>
            }
          </div>
        }
      </div>
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
  objectivesLength: PropTypes.number.isRequired,
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