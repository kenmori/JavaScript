import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Header, Menu, Image} from 'semantic-ui-react';
import logo_image from '../images/logo.png'
import Avatar from './Avatar';

class MenuBar extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  usersOption(users) {
    return users.map(user => {
      const avatarUrl = user.getIn(['avatar', 'url']) || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png';
      return {
        key: user.get('id'),
        value: user.get('id'),
        text: `${user.get('lastName')} ${user.get('firstName')}`,
        image: { avatar: true, src: avatarUrl },
      }
    }).toArray();
  }

  // TODO:
  //期間。
  get periodsOption() {
    return(
      [
        {key: '2017 1Q', value: '2017 1Q', text: '2017 1Q'},
        {key: '2017 2Q', value: '2017 2Q', text: '2017 2Q'},
        {key: '2017 3Q', value: '2017 3Q', text: '2017 3Q'},
        {key: '2017 4Q', value: '2017 4Q', text: '2017 4Q'},
      ]
    )
  }

  userTrigger = (loginUser) => {
    return (
      <span>
        <Avatar user={loginUser} size="small" /> {loginUser.get('lastName')}
      </span>
    )
  }

  render() {
    if (this.props.users.isEmpty()) {
      return null;
    }
    return (
      <Menu secondary className='menu-bar'>
        <Menu.Item header>
          <Header as='h1'><Image src={logo_image} href='/'/><span className="version">β</span></Header>
        </Menu.Item>
        <Menu.Item>
          <Dropdown options={this.periodsOption} defaultValue={this.periodsOption[0].value} scrolling pointing='top'/>
        </Menu.Item>
        <Menu.Item>
          <Dropdown search selection options={this.usersOption(this.props.users)} defaultValue={this.props.loginUser.get('id')}/>
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown trigger={this.userTrigger(this.props.loginUser)} pointing='top right'>
            <Dropdown.Menu>
              <Dropdown.Item as='a' href='/settings' icon='setting' text='設定'/>
              <Dropdown.Item as='a' href='https://help.resily.com/' target='_blank' icon='help circle' text='ヘルプ'/>
              <Dropdown.Item onClick={this.props.signOut.bind(this)} icon='sign out' text='ログアウト'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

MenuBar.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
};

export default MenuBar;
