import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Header, Menu, Image} from 'semantic-ui-react';
import logo_image from '../images/logo.png'
import Avatar from '../containers/Avatar';
import Logo from './Logo';

class UserSelectBox extends Component {

  constructor(props) {
    super(props);
    this.isCancel = false;
    this.selectedValue = props.defaultValue;
  }

  usersOption(users) {
    return users.map(user => {
      const avatarUrl = user.get('avatarUrl') || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
      const id = this.props.isOwner ? user.get('ownerId') : user.get('id');
      return {
        key: id,
        value: id,
        text: `${user.get('lastName')} ${user.get('firstName')}`,
        image: { avatar: true, src: avatarUrl },
      }
    }).toArray();
  }

  onHandleChange(event, {value}) {
    if(this.isCancel) {
      this.isCancel = false;
      return;
    }
    this.selectedValue = value;
    this.props.onChange(value);
  }

  render() {
    const value = this.props.defaultValue || null;
    return (
      <div className="user-selectbox">
        <Dropdown 
          search 
          selection
          simple
          options={this.usersOption(this.props.users)}
          value={value}
          onChange={this.onHandleChange.bind(this)}
          onBlur={() => this.isCancel = true} 
        />
      </div>
    )
  }
}

UserSelectBox.propTypes = {
  users: PropTypes.object.isRequired,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  isOwner: PropTypes.bool,
};

UserSelectBox.defaultProps = {
  onChange: () => {},
  isOwner: false,
}

export default UserSelectBox;
