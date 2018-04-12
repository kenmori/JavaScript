import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Backend from '../../utils/backend';
import { openObjective } from '../../utils/linker';
import { Segment, Button } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import KeyResult from './KeyResult';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      keyResultOrder: props.keyResultOrder,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.keyResultOrder.equals(this.props.keyResultOrder)) {
      this.setState({ keyResultOrder: nextProps.keyResultOrder });
    }
  }

  moveKeyResult = (fromIndex, toIndex) => {
    if (0 <= toIndex && toIndex < this.state.keyResultOrder.size) {
      this.setState({ keyResultOrder: this.getNewKeyResultOrder(fromIndex, toIndex) });
    }
  }

  updateKeyResultOrder = (fromIndex, toIndex) => {
    const newKeyResultOrder = this.getNewKeyResultOrder(fromIndex, toIndex);
    if (!newKeyResultOrder.equals(this.props.keyResultOrder)) {
      this.props.updateKeyResultOrder({
        id: this.props.objective.get('id'),
        keyResultOrder: JSON.stringify(newKeyResultOrder),
      });
    }
  }

  keyResultListHTML() {
    return (
      <Segment.Group>
        {this.props.objective.get('keyResults')
          .sortBy(keyResult => this.state.keyResultOrder.indexOf(keyResult.get('id')))
          .map((keyResult, index) => {
            const keyResultId = keyResult.get('id');
            return <KeyResult
              key={keyResultId}
              index={index}
              isSelected={keyResultId === this.props.keyResultId}
              keyResult={keyResult}
              moveKeyResult={this.moveKeyResult}
              setDragging={isDragging => this.setState({ isDragging })}
              updateKeyResultOrder={this.updateKeyResultOrder}
              canMoveKeyResult={this.props.canMoveKeyResult}
            />
          })}
      </Segment.Group>
    )
  }

  getNewKeyResultOrder = (fromIndex, toIndex) => {
    if (fromIndex >= 0 && toIndex >= 0) {
      const fromId = this.state.keyResultOrder.get(fromIndex);
      return this.state.keyResultOrder.delete(fromIndex).insert(toIndex, fromId);
    } else {
      return this.state.keyResultOrder;
    }
  }

  render() {
    const objective = this.props.objective;
    const objectiveCls = this.props.keyResultId ? 'sidebar__item' : 'sidebar__item is-current';
    return (
      <div className={`sidebar ${this.state.isDragging ? 'is-dragging' : ''}`}>
        <div className="sidebar__items">
          <div className="sidebar__title">Objective</div>
          <Segment className={objectiveCls} onClick={() => openObjective(objective.get('id'))}>
            <span className="sidebar__avatar"><OwnerAvatar owner={objective.get('owner')} /></span>
            <span className="sidebar__name">{objective.get('name')}</span>
            <span className="progress-rate sidebar__progress">{objective.get('progressRate')}%</span>
          </Segment>
        </div>

        <div className="sidebar__items">
          <div className="sidebar__title">Key Result 一覧</div>
          {this.keyResultListHTML()}
          <Button className="sidebar__add-keyresult" content="Key Result を追加する" positive
                  onClick={() => this.props.changeToKeyResultModal(objective)} />
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  objective: PropTypes.object.isRequired,
  keyResultId: PropTypes.number,
  canMoveKeyResult: PropTypes.bool.isRequired,
  keyResultOrder: PropTypes.object.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  changeToKeyResultModal: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  objective: Map(),
};

export default Backend(Sidebar);
