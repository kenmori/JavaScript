import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Backend from '../../utils/backend';
import Objective from './Objective';

class ObjectiveList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      objectiveOrder: props.objectiveOrder,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.objectiveOrder.equals(this.props.objectiveOrder)) {
      this.setState({ objectiveOrder: nextProps.objectiveOrder });
    }
  }

  moveObjective = (fromIndex, toIndex) => {
    if (0 <= toIndex && toIndex < this.state.objectiveOrder.size) {
      this.setState({ objectiveOrder: this.getNewObjectiveOrder(fromIndex, toIndex) });
    }
  }

  updateObjectiveOrder = (fromIndex, toIndex) => {
    const newObjectiveOrder = this.getNewObjectiveOrder(fromIndex, toIndex);
    if (!newObjectiveOrder.equals(this.props.objectiveOrder)) {
      this.props.updateObjectiveOrder(newObjectiveOrder);
    }
  }

  getNewObjectiveOrder = (fromIndex, toIndex) => {
    if (fromIndex >= 0 && toIndex >= 0) {
      const fromId = this.state.objectiveOrder.get(fromIndex);
      return this.state.objectiveOrder.delete(fromIndex).insert(toIndex, fromId);
    } else {
      return this.state.objectiveOrder;
    }
  }

  selectObjective = objective => {
    this.props.selectOkr(objective.get('id'));
  }

  render() {
    return (
      <div className='objective-list'>
        {this.props.objectives
          .sortBy(objective => this.state.objectiveOrder.indexOf(objective.get('id')))
          .map((objective, index) => {
            const objectiveId = objective.get('id');
            return <Objective
              key={objectiveId}
              index={index}
              objective={objective}
              isSelected={objectiveId === this.props.selectedObjectiveId}
              moveObjective={this.moveObjective}
              updateObjectiveOrder={this.updateObjectiveOrder}
              canMoveObjective={this.props.canMoveObjective}
              selectObjective={this.selectObjective.bind(this)} />
          })}
      </div>
    );
  }
}

ObjectiveList.propTypes = {
  // container
  selectedObjectiveId: PropTypes.number,
  objectiveOrder: ImmutablePropTypes.list.isRequired,
  canMoveObjective: PropTypes.bool.isRequired,
  selectOkr: PropTypes.func.isRequired,
  updateObjectiveOrder: PropTypes.func.isRequired,
  // component
  objectives: ImmutablePropTypes.list.isRequired,
};

export default Backend(ObjectiveList);
