import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Backend from '../../utils/backend';
import { openObjective } from '../../utils/linker';
import { Segment, Button, Header, Divider } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import ProgressRate from '../util/ProgressRate'
import KeyResult from './KeyResult';

class OkrSidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keyResultOrder: props.keyResultOrder,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.keyResultOrder.equals(this.props.keyResultOrder)) {
      this.setState({ keyResultOrder: nextProps.keyResultOrder });
    }
  }

  moveKeyResult = (fromIndex, toIndex, toUpdate = false) => {
    const newKeyResultOrder = this.getNewKeyResultOrder(fromIndex, toIndex)
    if (toUpdate) {
      this.props.updateKeyResultOrder(this.props.objective.get('id'), newKeyResultOrder)
    } else {
      this.setState({ keyResultOrder: newKeyResultOrder })
    }
  }

  updateKeyResultOrder = () => {
    if (!this.state.keyResultOrder.equals(this.props.keyResultOrder)) {
      this.props.updateKeyResultOrder(this.props.objective.get('id'), this.state.keyResultOrder)
    }
  }

  getNewKeyResultOrder = (fromIndex, toIndex) => {
    const fromId = this.state.keyResultOrder.get(fromIndex)
    return this.state.keyResultOrder.delete(fromIndex).insert(toIndex, fromId)
  }

  handleObjectiveClick = () => openObjective(this.props.objective.get('id'))

  handleAddKeyResultClick = () => this.props.openKeyResultModal(this.props.objective)

  render() {
    const { objective, keyResultId, canMoveKeyResult } = this.props
    const { keyResultOrder } = this.state
    const isSelected = !keyResultId
    return (
      <div className='okr-sidebar'>
        <Header as="h4">Objective</Header>
        <Segment className={`sidebar__item ${isSelected ? 'is-current' : ''}`} onClick={this.handleObjectiveClick}>
          <OwnerAvatar owner={objective.get('owner')} />
          <div className="sidebar__name">{objective.get('name')}</div>
          <ProgressRate value={objective.get('progressRate')} type='label' />
        </Segment>

        <Header as="h4">Key Result 一覧</Header>
        <Segment.Group>
          {objective.get('keyResults')
            .sortBy(keyResult => keyResultOrder.indexOf(keyResult.get('id')))
            .map((keyResult, index) => (
              <KeyResult
                key={keyResult.get('id')}
                index={index}
                isSelected={keyResult.get('id') === keyResultId}
                keyResult={keyResult}
                moveKeyResult={this.moveKeyResult}
                updateKeyResultOrder={this.updateKeyResultOrder}
                canMoveKeyResult={canMoveKeyResult}
              />
            ))}
        </Segment.Group>

        <Divider hidden />

        <Button fluid positive content="Key Result を追加する" onClick={this.handleAddKeyResultClick} />
      </div>
    )
  }
}

OkrSidebar.propTypes = {
  // container
  // component
  objective: ImmutablePropTypes.map.isRequired,
  keyResultId: PropTypes.number,
  canMoveKeyResult: PropTypes.bool.isRequired,
  keyResultOrder: ImmutablePropTypes.list.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  openKeyResultModal: PropTypes.func.isRequired,
};

OkrSidebar.defaultProps = {
  objective: Map(),
};

export default Backend(OkrSidebar);
