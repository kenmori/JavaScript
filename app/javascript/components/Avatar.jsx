import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

class Avatar extends Component {
  avatarTag = (path, name, size) => {
    let cls = `avatarImg is-${size}`;

    if (size === 'small') {
      path = path || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
    }

    return path ?
            <Image src={path} className={cls} ui={false} /> :
            <div className={cls}>{name}</div>
  }
  render() {
    return this.avatarTag(this.props.path, this.props.name, this.props.size)
  }
}

Avatar.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.string,
};
Avatar.defaultProps = {
  name: '',
  path: '',
  size: 'normal',
};

export default Avatar;
