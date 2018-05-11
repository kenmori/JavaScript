import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
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

class UserAvatar extends PureComponent {

  clickFileInput = () => {
    if (this.props.editable) {
      this.refs.fileInput.click();
    }
  }

  openAvatarModal = event => {
    if (!event.target.files.length) return;
    this.props.openAvatarModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  trigger = () => {
    return (
      <div className={`user_avatar ${this.props.editable ? 'editable' : ''}`} onClick={this.clickFileInput}>
        <Avatar {...this.props} />
        <input type='file' ref='fileInput' onChange={this.openAvatarModal} />
        {this.props.editable && <Icon name='pencil' size={sizeToIconSize[this.props.size]} color='grey' />}
      </div>
    );
  }

  popupContent = () => {
    return `${this.props.user.get('lastName')} ${this.props.user.get('firstName')}`;
  }

  render() {
    return (
      <Popup hoverable size='tiny' trigger={this.trigger()} open={this.props.withPopup ? undefined : false}>
        <Popup.Content>{this.popupContent()}</Popup.Content>
      </Popup>
    );
  }
}

UserAvatar.propTypes = {
  // container
  openAvatarModal: PropTypes.func.isRequired,
  // component
  user: ImmutablePropTypes.map.isRequired,
  size: PropTypes.string,
  withInitial: PropTypes.bool,
  withName: PropTypes.bool,
  withPopup: PropTypes.bool,
  editable: PropTypes.bool,
};
UserAvatar.defaultProps = {
  size: 'small',
  withInitial: true,
  withName: false,
  withPopup: false,
  editable: false,
};

export default UserAvatar;
