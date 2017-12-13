import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

class Avatar extends Component {
  avatarTag(path, name, size) {
    let cls = `avatar__img is-${size}`;

    if (size === 'small') {
      path = path || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
    }

    return path ?
            <img src={path} className={cls} /> :
            <div className={cls}>{name}</div>
  }
  openAvatarImageModal() {
    ReactDOM.findDOMNode(this.refs.avatarIcon).click();
  }
  changeAvatarImage(event) {
    if (!event.target.files.length) { return; }
    this.props.openAvatarImageModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }
  render() {
    const lastName = this.props.user.get('lastName');
    const name = `${lastName} ${this.props.user.get('firstName')}`;
    const path = this.props.user.get('avatarUrl');
    const popupAvaterTag = () => <Popup trigger={this.avatarTag(path, lastName, this.props.size)} content={name} size='tiny'/>;
    return (
      <div className="avatar">
        { this.props.isChangeImage ? 
            <div className="avatar__changeable">
              <input type="file" ref="avatarIcon" className="avatar__file" onChange={this.changeAvatarImage.bind(this)} /> 
              <div onClick={this.openAvatarImageModal.bind(this)}>{popupAvaterTag()}</div>
            </div> :
            popupAvaterTag()
        }
      </div>
    )
  }
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  isChangeImage: PropTypes.bool,
  openAvatarImageModal: PropTypes.func
};
Avatar.defaultProps = {
  user: null,
  size: 'normal',
  isChangeImage: false
};

export default Avatar;
