import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

class OkrList extends Component {

  render() {
    return (
      <List className='okr-list'>
        {this.props.okrs.map(okr =>
          <List.Item key={okr.get('id')}>
            <OwnerAvatar owner={okr.get('owner')} />
            <List.Content>{okr.get('name')}</List.Content>
          </List.Item>
        )}
      </List>
    );
  }
}

OkrList.propTypes = {
  okrs: PropTypes.object.isRequired,
};

export default OkrList;
