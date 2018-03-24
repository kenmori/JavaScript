import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { openKeyResult } from '../../utils/linker';
import { Segment } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

class SidebarItem extends Component {

  render() {
    const { data, keyResultId } = this.props;
    const cls = keyResultId === data.get('id') ? 'sidebar__item is-current' : 'sidebar__item';
    return (
      <Segment className={cls} key={data.get('id')} onClick={() => openKeyResult(data.get('id'))}>
        <span className="sidebar__avatar"><OwnerAvatar owner={data.get('owner')} members={data.get('keyResultMembers')} /></span>
        <span className="sidebar__val">{data.get('name')}</span>
        <span className="progress-rate sidebar__rate">{data.get('progressRate')}%</span>
      </Segment>
    )
  }
}

SidebarItem.propTypes = {
  data: PropTypes.object.isRequired,
  keyResultId: PropTypes.number,
};

export default SidebarItem;
