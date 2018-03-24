import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

import { openObjective } from '../../utils/linker';
import { Segment, Button } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import KeyResult from './KeyResult';

class Sidebar extends Component {
  render() {
    const objective = this.props.objective;
    const objectiveCls = this.props.keyResultId ? 'sidebar__item' : 'sidebar__item is-current';
    return (
      <div className="sidebar">
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
            { objective.get('keyResults').map(item => <KeyResult key={item.get('id')} keyResultId={this.props.keyResultId} data={item} />).toArray() }
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

export default Sidebar;
