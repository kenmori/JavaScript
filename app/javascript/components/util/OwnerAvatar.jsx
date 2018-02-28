import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import Avatar from './Avatar';

class OwnerAvatar extends Component {

  popupContent = () => {
    return (
      <table className='owner_avatar__popup'>
        <tbody>
        <tr>
          <th>責任者</th>
          <td>
            <Avatar user={this.props.owner} size='tiny' useDefault={true} />
            {`${this.props.owner.get('lastName')} ${this.props.owner.get('firstName')}`}
          </td>
        </tr>

        {this.props.members && this.props.members.size > 0 && this.props.members.map((member, index) =>
          <tr key={member.get('id')}>
            <th>{index === 0 && '関係者'}</th>
            <td>
              <Avatar user={member} size='tiny' useDefault={true} />
              {`${member.get('lastName')} ${member.get('firstName')}`}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className={`owner_avatar`}>
        <Popup size='tiny' trigger={<div><Avatar user={this.props.owner} size={this.props.size} /></div>}>
          <Popup.Content>{this.popupContent()}</Popup.Content>
        </Popup>
      </div>
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
