import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import UserAvatar from 'react-user-avatar';
import { Icon } from 'semantic-ui-react';
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

const sizeToIconSize = {
  mini: 'small',
  tiny: 'small',
  small: null,
  large: 'large',
  big: 'large',
  huge: 'big',
  massive: 'huge',
};

class Avatar extends PureComponent {
  render() {
    let name = this.props.user.get('lastName');
    let path = this.props.user.get('avatarUrl');
    const size = this.props.size;
    const fullName = `${this.props.user.get('lastName')} ${this.props.user.get('firstName')}`;
    const disabled = this.props.user.get('disabled');

    if (size === 'tiny' || size === 'mini') {
      name = [...name][0]; // 先頭1文字のみを表示する (サロゲートペア考慮済み)
    }
    if (!this.props.withInitial) {
      path = path || avatar_image; // イニシャルを非表示にするためデフォルト画像を指定する
    }

    return (
      <div className={`avatar ${disabled ? 'disabled' : ''}`}>
        <UserAvatar className={`avatar__inner is-${size}`}
                    src={path}
                    name={name}
                    size={sizeToNum[size]}
                    color='transparent'
        />
        {disabled && <Icon disabled name='dont' size={sizeToIconSize[this.props.size]} />}
        {this.props.withName && <span className='avatar__name'>{disabled ? `${fullName} (無効)` : fullName}</span>}
      </div>
    );
  }
}

Avatar.propTypes = {
  // container
  // component
  user: ImmutablePropTypes.map.isRequired,
  size: PropTypes.string,
  withInitial: PropTypes.bool,
  withName: PropTypes.bool,
};
Avatar.defaultProps = {
  size: 'small',
  withInitial: true,
  withName: false,
};

export default Avatar;
