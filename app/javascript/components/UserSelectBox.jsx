import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Header, Menu, Image} from 'semantic-ui-react';
import logo_image from '../images/logo.png'
import Avatar from '../containers/Avatar';
import Logo from './Logo';

class UserSelectBox extends Component {

  usersOption(users) {
    return users.map(user => {
      const avatarUrl = user.get('avatarUrl') || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
      return {
        key: user.get('id'),
        value: user.get('id'),
        text: `${user.get('lastName')} ${user.get('firstName')}`,
        image: { avatar: true, src: avatarUrl },
      }
    }).toArray();
  }

  render() {
    return (
      <Dropdown search selection
                options={this.usersOption(this.props.users)}
                defaultValue={this.props.defaultValue}
                onChange={(event, { value }) => this.props.onChange(value)} />
    )
  }
}

UserSelectBox.propTypes = {
  users: PropTypes.object.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default UserSelectBox;
