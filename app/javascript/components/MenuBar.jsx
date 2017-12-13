import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Header, Menu, Image} from 'semantic-ui-react';
import logo_image from '../images/logo.png'
import Avatar from '../containers/Avatar';

class MenuBar extends Component {

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchOkrPeriods(this.props.organization.get('id'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needLogout) {
      this.props.signOut()
    }
  }

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

  okrPeriodsOption(okrPeriods) {
    return okrPeriods.map(okrPeriod => {
      return {
        key: okrPeriod.get('id'),
        value: okrPeriod.get('id'),
        text: `${okrPeriod.get('year')}年${okrPeriod.get('periodNumber')}期`,
      }
    }).toArray();
  }

  userTrigger = (loginUser) => {
    return (
      <span>
        <Avatar user={loginUser} size="small" /> {loginUser.get('lastName')}
      </span>
    )
  }

  handleOkrPeriodChange(event, { value }) {
    this.props.changeOkrPeriod(value);
  }

  handleUserChange(event, { value }) {
    this.props.changeUser(value);
  }

  render() {
    if (this.props.users.isEmpty() || this.props.okrPeriods.isEmpty()) {
      return null;
    }
    return (
      <Menu secondary className='menu-bar'>
        <Menu.Item header>
          <Header as='h1'><Image src={logo_image} href='/'/><span className="version">β</span></Header>
        </Menu.Item>
        <Menu.Item>
          <Dropdown scrolling pointing='top'
                    options={this.okrPeriodsOption(this.props.okrPeriods)}
                    defaultValue={this.props.menu.get('okrPeriodId')}
                    onChange={this.handleOkrPeriodChange.bind(this)} />
        </Menu.Item>
        <Menu.Item>
          <Dropdown search selection
                    options={this.usersOption(this.props.users)}
                    defaultValue={this.props.menu.get('userId')}
                    onChange={this.handleUserChange.bind(this)} />
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
  fetchOkrPeriods: PropTypes.func.isRequired,
  changeUser: PropTypes.func.isRequired,
  changeOkrPeriod: PropTypes.func.isRequired,
  users: PropTypes.object,
  okrPeriods: PropTypes.object,
  menu: PropTypes.object,
  organization: PropTypes.object,
};

export default MenuBar;
