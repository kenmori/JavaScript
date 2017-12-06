import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Avatar from '../Avatar';

class Sidebar extends Component {
  keyResultListTag(keyResults, selectedOkr) {
    return keyResults.map(item => {
      const cls = selectedOkr.get('okrType') === 'keyResult' && selectedOkr.get('targetId') === item.get('id') ?
                    'sidebar__item is-current' : 'sidebar__item';
      return (
        <Segment className={cls} key={item.get('id')} onClick={() => this.props.showDetail('keyResult', item.get('id'))}>
          <span className="sidebar__avatar"><Avatar user={item.get('owner')} size='small' /></span>
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
      showDetail,
    } = this.props;
    const objectiveCls = selectedOkr.get('okrType') === 'objective' ? 'sidebar__item is-current' : 'sidebar__item';
    return (
      <div className="sidebar">
        <div className="sidebar__items">
          <div className="sidebar__title">Objective</div>
          <Segment className={objectiveCls} onClick={() => showDetail('objective')}>
            <span className="sidebar__avatar"><Avatar user={objective.get('owner')} size='small' /></span>
            <span className="sidebar__val">{objective.get('name')}</span>
            <span className="progress-rate sidebar__rate">{objective.get('progressRate')}%</span>
          </Segment>
        </div>

        <div className="sidebar__items">
          <div className="sidebar__title">KeyResult</div>
          <Segment.Group>
            { this.keyResultListTag(objective.get('keyResults'), selectedOkr) }
          </Segment.Group>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  objective: PropTypes.object.isRequired,
  selectedOkr: PropTypes.object.isRequired,
  showDetail: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  objective: Map(),
};

export default Sidebar;
