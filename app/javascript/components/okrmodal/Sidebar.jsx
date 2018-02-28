import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { hashids, OKR_TYPE_ID } from '../../utils/hashids';
import { Segment, Button } from 'semantic-ui-react';
import history from '../../utils/history';
import Avatar from '../util/Avatar';

class Sidebar extends Component {
  keyResultListTag(objectiveId, keyResults, selectedOkr) {
    return keyResults.map(item => {
      const okrHash = hashids.encode(OKR_TYPE_ID.KEY_RESULT, item.get('id'));
      const cls = selectedOkr.get('okrType') === 'keyResult' && selectedOkr.get('targetId') === item.get('id') ?
                    'sidebar__item is-current' : 'sidebar__item';
      return (
        <Segment className={cls} key={item.get('id')} onClick={() => history.push(`/okr/${okrHash}`)}>
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
    } = this.props;
    const okrHash = hashids.encode(OKR_TYPE_ID.OBJECTIVE, objective.get('id'));
    const objectiveCls = selectedOkr.get('okrType') === 'objective' ? 'sidebar__item is-current' : 'sidebar__item';
    return (
      <div className="sidebar">
        <div className="sidebar__items">
          <div className="sidebar__title">Objective</div>
          <Segment className={objectiveCls} onClick={() => history.push(`/okr/${okrHash}`)}>
            <span className="sidebar__avatar"><Avatar user={objective.get('owner')} size='small' /></span>
            <span className="sidebar__val">{objective.get('name')}</span>
            <span className="progress-rate sidebar__rate">{objective.get('progressRate')}%</span>
          </Segment>
        </div>

        <div className="sidebar__items">
          <div className="sidebar__title">Key Result 一覧</div>
          <Segment.Group>
            { this.keyResultListTag(objective.get('id'), objective.get('keyResults'), selectedOkr) }
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
  changeToKeyResultModal: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  objective: Map(),
};

export default Sidebar;
