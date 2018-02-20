import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import avatar_image from '../../images/avatar.png';

class Avatar extends Component {
  avatarTag(path, name, size) {
    let cls = `avatar__img is-${size}`;

    if (size === 'small') {
      path = path || avatar_image;
    }

    return path ?
            <img src={path} className={cls} /> :
            <div className={cls}>{name}</div>
  }
  openAvatarModal() {
    if (this.props.readOnly) return;
    ReactDOM.findDOMNode(this.refs.avatarIcon).click();
  }
  changeAvatarImage(event) {
    if (!event.target.files.length) { return; }
    this.props.openAvatarModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }
  render() {
    const lastName = this.props.user.get('lastName');
    const name = `${lastName} ${this.props.user.get('firstName')}`;
    const path = this.props.user.get('avatarUrl');
    return (
      <div className={`avatar ${this.props.readOnly ? 'readonly' : 'changeable'}`}>
        <input type="file" ref="avatarIcon" className="avatar__file" onChange={this.changeAvatarImage.bind(this)} /> 
        <div onClick={this.openAvatarModal.bind(this)}>
          <Popup trigger={this.avatarTag(path, lastName, this.props.size)} content={name} size='tiny' />
        </div>
      </div>
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  readOnly: PropTypes.bool,
  openAvatarModal: PropTypes.func
};
Avatar.defaultProps = {
  user: null,
  size: 'normal',
  readOnly: true,
};

export default Avatar;
