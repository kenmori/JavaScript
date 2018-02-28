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

  trigger = () => {
    return (
      <div className={`user_avatar ${this.props.readOnly ? 'readonly' : 'changeable'}`} onClick={this.clickFileInput}>
        <Avatar {...this.props} />
        <input type='file' ref='fileInput' onChange={this.openAvatarModal} />
        {!this.props.readOnly && <Icon name='pencil' size={sizeToIconSize[this.props.size]} color='grey' />}
      </div>
    );
  }

  popupContent = () => {
    return `${this.props.user.get('lastName')} ${this.props.user.get('firstName')}`;
  }

  render() {
    return (
      <Popup size='tiny' trigger={this.trigger()}>
        <Popup.Content>{this.popupContent()}</Popup.Content>
      </Popup>
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
