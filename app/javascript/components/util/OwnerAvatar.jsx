import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';
import Avatar from './Avatar';

const sizeToIconSize = {
  mini: 'small',
  tiny: 'small',
  small: null,
  large: 'large',
  big: 'large',
  huge: 'big',
  massive: 'huge',
};

class OwnerAvatar extends Component {

  trigger = () => {
    const hasMembers = this.props.members && this.props.members.size > 0;
    return (
      <div className={`owner_avatar`}>
        <Avatar user={this.props.owner} size={this.props.size} />
        {hasMembers && <Icon name='plus' size={sizeToIconSize[this.props.size]} color='grey' />}
      </div>
    );
  }

  popupContent = () => {
    const hasMembers = this.props.members && this.props.members.size > 0;
    return (
      <table className='owner_avatar__popup'>
        <tbody>
        <tr>
          <th>責任者</th>
          <td><Avatar user={this.props.owner} size='tiny' withInitial={false} withName={true} /></td>
        </tr>

        {hasMembers && this.props.members.map((member, index) =>
          <tr key={member.get('id')}>
            <th>{index === 0 && '関係者'}</th>
            <td><Avatar user={member} size='tiny' withInitial={false} withName={true} /></td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <Popup size='tiny' trigger={this.trigger()}>
        <Popup.Content>{this.popupContent()}</Popup.Content>
      </Popup>
    );
  }
}

OwnerAvatar.propTypes = {
  owner: PropTypes.object,
  members: PropTypes.object,
  size: PropTypes.string,
};
OwnerAvatar.defaultProps = {
  owner: null,
  members: null,
  size: 'small',
};

export default OwnerAvatar;
