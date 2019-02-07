import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { DragSource, DropTarget } from "react-dnd";
import { Segment, Icon } from "semantic-ui-react";
import OwnerAvatar from "../../util/OwnerAvatar";
import ProgressRate from "../../util/ProgressRate";
import OkrName from "../../util/OkrName";

const itemSource = {
  canDrag(props) {
    return props.canMoveKeyResult;
  },

  beginDrag(props) {
    return {
      id: props.keyResult.get("id"), // required to update isDragging
      index: props.index,
    };
  },

  endDrag(props) {
    props.updateKeyResultOrder();
  },
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

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
};

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
});

class KeyResultItem extends PureComponent {
  swapKeyResult = toUp => event => {
    const fromIndex = this.props.index;
    const toIndex = toUp ? fromIndex - 1 : fromIndex + 1;
    this.props.moveKeyResult(fromIndex, toIndex, true);
    event.stopPropagation();
  };

  renderItem() {
    const {
      keyResult,
      isSelected,
      onClick,
      canMoveKeyResult,
      isDragging,
      canDrop,
    } = this.props;
    // Wrap Segment by div because only native element nodes can now be passed to React DnD connectors
    return (
      <div className="sidebar__item-wrapper">
        <Segment
          className={`sidebar__item ${isSelected ? "is-current" : ""} ${
            isDragging ? "drag" : ""
          } ${canDrop ? "drop" : ""}`}
          key={keyResult.get("id")}
          onClick={onClick}>
          <OwnerAvatar
            owner={keyResult.get("owner")}
            members={keyResult.get("members")}
          />
          <div className="sidebar__name">
            <OkrName okr={keyResult} />
          </div>
          <ProgressRate
            value={keyResult.get("progressRate")}
            status={keyResult.get("status")}
            type="label"
          />

          {canMoveKeyResult && (
            <div className="sidebar__swap-icons">
              <Icon
                name="arrow circle up"
                size="large"
                color="grey"
                fitted
                className="swap-up"
                onClick={this.swapKeyResult(true)}
              />
              <Icon
                name="arrow circle down"
                size="large"
                color="grey"
                fitted
                className="swap-down"
                onClick={this.swapKeyResult(false)}
              />
            </div>
          )}
        </Segment>
      </div>
    );
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(connectDropTarget(this.renderItem()));
  }
}

KeyResultItem.propTypes = {
  index: PropTypes.number.isRequired,
  keyResult: ImmutablePropTypes.map.isRequired,
  isSelected: PropTypes.bool.isRequired,
  canMoveKeyResult: PropTypes.bool.isRequired,
  moveKeyResult: PropTypes.func.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // React DnD
  isDragging: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget("item", itemTarget, collectTarget)(
  DragSource("item", itemSource, collectSource)(KeyResultItem),
);
