import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd'
import Backend from '../../utils/backend';
import { openObjective } from '../../utils/linker';
import { sortKeyResult, createOrderData } from '../../utils/sorter';
import { Segment, Button } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import KeyResult from './KeyResult';

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class Sidebar extends Component {
  constructor(props) {
    super();
    this.nextOrder = null;
    this.state = {
      keyResults: props.objective.get('keyResults'),
      isDragging: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      keyResults: sortKeyResult(nextProps.objective, this.nextOrder).get('keyResults'),
    });
  }

  replaceKeyResults = (originalIndex, overIndex) => {
    const keyResult = this.state.keyResults.get(originalIndex);
    const replacementTarget = this.state.keyResults.get(overIndex);
    let newKeyResults = this.state.keyResults.set(overIndex, keyResult);
    newKeyResults = newKeyResults.set(originalIndex, replacementTarget);
    this.setState({
      keyResults: newKeyResults
    })
  }

  changeDragStyle(isDragging) {
    this.setState({
      isDragging
    })
  }

	findKeyResult(id) {
    const keyResults = this.state.keyResults;
		const keyResult = keyResults.find(item => item.get('id') === id)
		return {
			keyResult,
			index: keyResults.indexOf(keyResult),
		}
  }

  updateKeyResultOrder() {
    this.nextOrder = createOrderData(this.state.keyResults);
    if(this.nextOrder !== this.props.objectiveOrder) {
      this.props.updateKeyResultOrder({
        id: this.props.objective.get('id'),
        keyResultOrder: this.nextOrder
      });
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
            <span className="sidebar__val">{objective.get('name')}</span>
            <span className="progress-rate sidebar__rate">{objective.get('progressRate')}%</span>
          </Segment>
        </div>

        <div className="sidebar__items">
          <div className="sidebar__title">Key Result 一覧</div>
          <Segment.Group>
            { this.state.keyResults.map(item => { 
              return <KeyResult 
                        key={item.get('id')} 
                        currentKeyResultId={this.props.keyResultId} 
                        keyResult={item} 
                        replaceKeyResults={this.replaceKeyResults.bind(this)}
                        findKeyResult={this.findKeyResult.bind(this)}
                        changeDragStyle={this.changeDragStyle.bind(this)}
                        updateKeyResultOrder={this.updateKeyResultOrder.bind(this)}
                      />
            }).toArray() }
          </Segment.Group>
          <Button className="sidebar__add-keyresult" onClick={() => this.props.changeToKeyResultModal(objective)} content="Key Result を追加する" positive />
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  objective: PropTypes.object.isRequired,
  keyResultId: PropTypes.number,
  changeToKeyResultModal: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  objective: Map(),
};

export default Backend(DropTarget('keyResult', {}, collect)(Sidebar));
