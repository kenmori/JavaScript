import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

class Avatar extends Component {
  avatarTag = (path, name, small) => {
    let cls = 'avatarImg is-normal';

    if (small) {
      cls = 'avatarImg is-small';
      path = path || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
    }

    return path ?
            <Image src={path} className={cls} ui={false} /> :
            <div className={cls}>{name || ''}</div>
  }
  render() {
    return this.avatarTag(this.props.path, this.props.name, this.props.small)
  }
}

Avatar.propTypes = {
  name: PropTypes.any,
  path: PropTypes.any,
  small: PropTypes.bool,
};
Avatar.defaultProps = {
  small: false
};

export default Avatar;
