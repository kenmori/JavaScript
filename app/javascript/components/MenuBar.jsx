import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Dropdown, Header, Icon, Menu, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import logo_image from '../images/logo.png'
import Avatar from './Avatar';

class MenuBar extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  usersOption(users) {
    return users.map(item => ({
      key: item.get('id'),
      value: item.get('id'),
      text: `${item.get('lastName')} ${item.get('firstName')}`,
    })).toArray();
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
        <Avatar path={loginUser.get('avatarPath')} name={loginUser.get('lastName')} size="small" /> {loginUser.get('lastName')}
      </span>
    )
  }

  render() {
    if (this.props.users.isEmpty()) {
      return null;
    }
    return (
      <div className='menu-bar'>
        <Menu secondary>
          <Menu.Item header>
            <Header as='h1'><Image src={logo_image} href='/'/></Header>
          </Menu.Item>
          <div className='users'>
            <Dropdown placeholder='ユーザーを選択してください' search selection options={this.usersOption(this.props.users)} className='full-width'/>
          </div>
          <div className='periods'>
            <Dropdown scrolling options={this.periodsOption} defaultValue={this.periodsOption[0].value} className='full-width'/>
          </div>
          <Menu.Menu position='right' className='right-menu'>
            <Dropdown trigger={this.userTrigger(this.props.loginUser)}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink to='/settings'>
                    <Icon name='setting'/> 設定
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item as='a' href='https://help.resily.com/' target='_blank' icon='help circle' text='ヘルプ'/>
                <Dropdown.Item onClick={this.props.signOut.bind(this)} icon='sign out' text='ログアウト'/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

MenuBar.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
};

export default MenuBar;
