import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import Avatar from './Avatar';

class UserAvatar extends Component {

  clickFileInput = () => {
    if (this.props.readOnly) return;
    this.refs.fileInput.click();
  }

  openAvatarModal = event => {
    if (!event.target.files.length) return;
    this.props.openAvatarModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }
  
  popupContent = () => {
    return `${this.props.user.get('lastName')} ${this.props.user.get('firstName')}`;
  }

  render() {
    return (
      <div className={`user_avatar ${this.props.readOnly ? 'readonly' : 'changeable'}`} onClick={this.clickFileInput}>
        <Popup size='tiny' trigger={<div><Avatar {...this.props} /></div>}>
          <Popup.Content>{this.popupContent()}</Popup.Content>
        </Popup>
        <input type='file' ref='fileInput' onChange={this.openAvatarModal} />
      </div>
    );
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  useDefault: PropTypes.bool,
  readOnly: PropTypes.bool,
  openAvatarModal: PropTypes.func
};
UserAvatar.defaultProps = {
  user: null,
  size: 'small',
  useDefault: false,
  readOnly: true,
};

export default UserAvatar;
