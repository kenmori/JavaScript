import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import UserAvatar from '../../containers/UserAvatar';

class Sidebar extends Component {
  keyResultListTag(keyResults, selectedOkr) {
    return keyResults.map(item => {
      const cls = selectedOkr.get('okrType') === 'keyResult' && selectedOkr.get('targetId') === item.get('id') ?
                    'sidebar__item is-current' : 'sidebar__item';
      return (
        <Segment className={cls} key={item.get('id')} onClick={() => this.props.showOkrPane('keyResult', item.get('id'))}>
          <span className="sidebar__avatar"><UserAvatar user={item.get('owner')} /></span>
          <span className="sidebar__val">{item.get('name')}</span>
          <span className="progress-rate sidebar__rate">{item.get('progressRate')}%</span>
        </Segment>
      )
    }).toArray();
  }

  render() {
    const { 
      objective, 
      selectedOkr,
      showOkrPane,
    } = this.props;
    const objectiveCls = selectedOkr.get('okrType') === 'objective' ? 'sidebar__item is-current' : 'sidebar__item';
    return (
      <div className="sidebar">
        <div className="sidebar__items">
          <div className="sidebar__title">Objective</div>
          <Segment className={objectiveCls} onClick={() => showOkrPane('objective')}>
            <span className="sidebar__avatar"><UserAvatar user={objective.get('owner')} /></span>
            <span className="sidebar__val">{objective.get('name')}</span>
            <span className="progress-rate sidebar__rate">{objective.get('progressRate')}%</span>
          </Segment>
        </div>

        <div className="sidebar__items">
          <div className="sidebar__title">Key Result 一覧</div>
          <Segment.Group>
            { this.keyResultListTag(objective.get('keyResults'), selectedOkr) }
          </Segment.Group>
          <Button className="sidebar__add-keyresult" onClick={() => this.props.changeToKeyResultModal(objective)} content="Key Result を追加する" positive />
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  objective: PropTypes.object.isRequired,
  selectedOkr: PropTypes.object.isRequired,
  showOkrPane: PropTypes.func.isRequired,
  changeToKeyResultModal: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  objective: Map(),
};

export default Sidebar;
