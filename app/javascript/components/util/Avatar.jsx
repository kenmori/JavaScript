import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserAvatar from 'react-user-avatar';
import avatar_image from '../../images/avatar.png';

const sizeToNum = {
  mini: 18,
  tiny: 24,
  small: 36,
  large: 48,
  big: 60,
  huge: 72,
  massive: 128,
};

class Avatar extends Component {
  render() {
    let name = this.props.user.get('lastName');
    let path = this.props.user.get('avatarUrl');
    const size = this.props.size;

    if (size === 'tiny' || size === 'mini') {
      name = [...name][0]; // 先頭1文字のみを表示する (サロゲートペア考慮済み)
    }
    if (this.props.useDefault) {
      path = path || avatar_image; // デフォルト画像を指定する (イニシャルアイコンとして表示されない)
    }

    return (
      <UserAvatar className={`avatar is-${size}`}
                  src={path}
                  name={name}
                  size={sizeToNum[size]}
                  color='transparent'
      />
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  useDefault: PropTypes.bool,
};
Avatar.defaultProps = {
  user: null,
  size: 'small',
  useDefault: false,
};

export default Avatar;
