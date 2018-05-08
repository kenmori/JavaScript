import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { openObjective, openKeyResult } from '../../utils/linker';
import { List } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

class OkrList extends Component {

  handleClick = id => {
    this.props.isObjective ? openObjective(id) : openKeyResult(id);
  }

  render() {
    return (
      <List className='okr-list'>
        {this.props.okrs.map(okr =>
          <List.Item key={okr.get('id')} className='okr-item'>
            <OwnerAvatar owner={okr.get('owner')} members={okr.get('members')} />
            <List.Content className='name'>
              <a onClick={() => this.handleClick(okr.get('id'))}>{okr.get('name')}</a>
            </List.Content>
            <List.Content className='progress-rate'>{okr.get('progressRate')}%</List.Content>
          </List.Item>
        )}
      </List>
    );
  }
}

OkrList.propTypes = {
  okrs: PropTypes.object.isRequired,
  isObjective: PropTypes.bool,
};

OkrList.defaultProps = {
  isObjective: true,
};

export default OkrList;
