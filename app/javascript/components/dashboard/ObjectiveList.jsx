import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Backend from '../../utils/backend'
import Objective from './Objective'

class ObjectiveList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { objectiveOrder: props.objectiveOrder }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.objectiveOrder.equals(this.props.objectiveOrder)) {
      this.setState({ objectiveOrder: nextProps.objectiveOrder })
    }
  }

  moveObjective = (fromIndex, toIndex, toUpdate = false) => {
    const { objectiveOrder } = this.state

    // フィルタリング状態の index を非フィルタリング状態の index に変換する
    const filteredObjectiveOrder = this.props.objectives
      .map(objective => objective.get('id')).sortBy(id => objectiveOrder.indexOf(id))
    const fromId = filteredObjectiveOrder.get(fromIndex)
    const toId = filteredObjectiveOrder.get(toIndex)
    fromIndex = objectiveOrder.indexOf(fromId)
    toIndex = objectiveOrder.indexOf(toId)

    const newObjectiveOrder = objectiveOrder.delete(fromIndex).insert(toIndex, fromId)
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

  selectObjective = objective => () => this.props.selectObjective(objective)

  render() {
    const { objectives, selectedObjectiveId, canMoveObjective } = this.props
    const { objectiveOrder } = this.state
    return (
      <div className='objective-list'>
        {objectives
          .sortBy(objective => objectiveOrder.indexOf(objective.get('id')))
          .map((objective, index) => {
            const objectiveId = objective.get('id')
            return <Objective
              key={objectiveId}
              index={index}
              objective={objective}
              isSelected={objectiveId === selectedObjectiveId}
              moveObjective={this.moveObjective}
              updateObjectiveOrder={this.updateObjectiveOrder}
              canMoveObjective={canMoveObjective}
              selectObjective={this.selectObjective} />
          })}
      </div>
    )
  }
}

ObjectiveList.propTypes = {
  // container
  selectedObjectiveId: PropTypes.number,
  objectiveOrder: ImmutablePropTypes.list.isRequired,
  canMoveObjective: PropTypes.bool.isRequired,
  selectObjective: PropTypes.func.isRequired,
  updateObjectiveOrder: PropTypes.func.isRequired,
  // component
  objectives: ImmutablePropTypes.list.isRequired,
}

export default Backend(ObjectiveList)
