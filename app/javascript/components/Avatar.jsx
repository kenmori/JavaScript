import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

class Avatar extends Component {
  avatarTag = (path, name, size) => {
    let cls = `avatarImg is-${size}`;

    if (size === 'small') {
      path = path || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
    }

    return path ?
            <img src={path} className={cls} /> :
            <div className={cls}>{name}</div>
  }
  render() {
    const lastName = this.props.user.get('lastName');
    const name = `${lastName} ${this.props.user.get('firstName')}`;
    const path = this.props.user.get('avatarUrl');
    return <Popup trigger={this.avatarTag(path, lastName, this.props.size)} content={name} size='tiny'/>;
  }
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
};
Avatar.defaultProps = {
  user: null,
  size: 'normal',
};

export default Avatar;
