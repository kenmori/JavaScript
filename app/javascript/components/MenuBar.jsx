import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Menu} from 'semantic-ui-react';
import logo_image from '../images/logo.png'
import UserSelectBox from './UserSelectBox';
import Avatar from '../containers/Avatar';
import Logo from './Logo';

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

  handleChangeOrganization(event, { value }) {
    this.props.changeCurrentOrganizationId(this.props.loginUser.get('id'), value);
  }

  organizationTag(props = this.props) {
    if(!props.organizations) { return null; }

    function options(organizations) {
      return organizations.map(item => (
        {
          key: item.get('id'),
          value: item.get('id'),
          text: item.get('name'),
        }
      )).toArray();
    }

    if(props.organizations.size === 1) {
      return <div>{props.organization.get('name')}</div>
    } else {
      return <Dropdown 
                scrolling 
                pointing='top'
                options={options(props.organizations)}
                defaultValue={props.organization.get('id')}
                onChange={this.handleChangeOrganization.bind(this)} 
            />
      }
  }

  render() {
    return (
      <Menu secondary className='menu-bar'>
        <Menu.Item header href='/'>
          <Logo path={this.props.organization.get('logo').get('url')} size='tiny'/>
        </Menu.Item>
        <Menu.Item href='/'>ホーム</Menu.Item>
        <Menu.Item>
          {!this.props.okrPeriods.isEmpty() &&
            <Dropdown scrolling pointing='top'
                      options={this.okrPeriodsOption(this.props.okrPeriods)}
                      defaultValue={this.props.menu.get('okrPeriodId')}
                      onChange={this.handleOkrPeriodChange.bind(this)} />
          }
        </Menu.Item>
        <Menu.Item>
          {!this.props.users.isEmpty() && <UserSelectBox users={this.props.users} defaultValue={this.props.menu.get('userId')} onChange={(value) => this.props.changeUser(value)} /> }
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown trigger={this.userTrigger(this.props.loginUser)} pointing='top right'>
            <Dropdown.Menu>
              <Dropdown.Item as='a' href='/settings/account' icon='setting' text='設定'/>
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
  changeCurrentOrganizationId: PropTypes.func.isRequired,
  users: PropTypes.object,
  okrPeriods: PropTypes.object,
  menu: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.object,
};

export default MenuBar;
