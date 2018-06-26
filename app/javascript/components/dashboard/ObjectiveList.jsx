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

  moveObjective = (fromIndex, toIndex, toUpdate = false) => {
    const newObjectiveOrder = this.getNewObjectiveOrder(fromIndex, toIndex)
    if (toUpdate) {
      this.props.updateObjectiveOrder(newObjectiveOrder)
    } else {
      this.setState({ objectiveOrder: newObjectiveOrder })
    }
  }

  updateObjectiveOrder = () => {
    if (!this.state.objectiveOrder.equals(this.props.objectiveOrder)) {
      this.props.updateObjectiveOrder(this.state.objectiveOrder)
    }
  }

  getNewObjectiveOrder = (fromIndex, toIndex) => {
    const filteredObjectiveOrder = this.props.objectives
      .map(objective => objective.get('id'))
      .sortBy(id => this.state.objectiveOrder.indexOf(id))
    const fromId = filteredObjectiveOrder.get(fromIndex)
    const toId = filteredObjectiveOrder.get(toIndex)
    fromIndex = this.state.objectiveOrder.indexOf(fromId)
    toIndex = this.state.objectiveOrder.indexOf(toId)
    return this.state.objectiveOrder.delete(fromIndex).insert(toIndex, fromId)
  }

  selectObjective = objective => () => {
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
              selectObjective={this.selectObjective} />
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
