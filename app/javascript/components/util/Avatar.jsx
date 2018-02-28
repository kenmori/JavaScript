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
    const fullName = `${this.props.user.get('lastName')} ${this.props.user.get('firstName')}`;

    if (size === 'tiny' || size === 'mini') {
      name = [...name][0]; // 先頭1文字のみを表示する (サロゲートペア考慮済み)
    }
    if (!this.props.withInitial) {
      path = path || avatar_image; // イニシャルを非表示にするためデフォルト画像を指定する
    }

    return (
      <div className='avatar'>
        <UserAvatar className={`avatar__inner is-${size}`}
                    src={path}
                    name={name}
                    size={sizeToNum[size]}
                    color='transparent'
        />
        {this.props.withName && <span className='avatar__name'>{fullName}</span>}
      </div>
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
  withInitial: PropTypes.bool,
  withName: PropTypes.bool,
};
Avatar.defaultProps = {
  user: null,
  size: 'small',
  withInitial: true,
  withName: false,
};

export default Avatar;
