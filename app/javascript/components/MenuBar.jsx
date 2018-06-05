import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Dropdown, Menu} from 'semantic-ui-react';
import UserSelect from './form/UserSelect';
import UserAvatar from '../containers/UserAvatar';
import Logo from './util/Logo';

class MenuBar extends PureComponent {

  componentDidMount() {
    this.props.fetchOrganization(this.props.organizationId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needLogout) {
      this.props.signOut()
    } else if (!this.props.isFetchedOrganization && nextProps.isFetchedOrganization) {
      this.props.fetchOkrs(this.props.okrPeriodId, this.props.userId)
    } else if (this.props.okrPeriodId !== nextProps.okrPeriodId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId)
    } else if (this.props.userId !== nextProps.userId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId, false)
    }
  }

  okrPeriodsOption(okrPeriods) {
    return okrPeriods.map(okrPeriod => {
      return {
        key: okrPeriod.get('id'),
        value: okrPeriod.get('id'),
        text: `${okrPeriod.get('name')}`,
      }
    }).toArray();
  }

  userTrigger = loginUser => {
    return <UserAvatar user={loginUser} size='tiny' withInitial={false} withName={true} />;
  }

  handleOkrPeriodChange = (event, { value }) => {
    this.props.changeCurrentOkrPeriod(value);
  }

  handleChangeOrganization = (event, { value }) => {
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
                onChange={this.handleChangeOrganization} 
                selectOnNavigation={false}
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
          {this.organizationTag()}
        </Menu.Item>
        <Menu.Item>
          {!this.props.okrPeriods.isEmpty() &&
            <Dropdown scrolling pointing='top'
                      options={this.okrPeriodsOption(this.props.okrPeriods)}
                      defaultValue={this.props.okrPeriodId}
                      onChange={this.handleOkrPeriodChange}
                      selectOnNavigation={false}
            />
          }
        </Menu.Item>
        <Menu.Item>
          {!this.props.users.isEmpty() && (
            <UserSelect
              users={this.props.users}
              value={this.props.userId}
              onChange={this.props.changeCurrentUser}
            />
          )}
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown trigger={this.userTrigger(this.props.loginUser)} pointing='top right'>
            <Dropdown.Menu>
              <Dropdown.Item as='a' href='/settings/account' icon='setting' text='設定'/>
              <Dropdown.Item as='a' href='https://help.resily.com/' target='_blank' icon='help circle' text='ヘルプ'/>
              <Dropdown.Item onClick={this.props.signOut} icon='sign out' text='ログアウト'/>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

MenuBar.propTypes = {
  // container
  organizationId: PropTypes.number.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  organizations: ImmutablePropTypes.list.isRequired,
  okrPeriods: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  organization: ImmutablePropTypes.map.isRequired,
  loginUser: ImmutablePropTypes.map.isRequired,
  isFetchedOrganization: PropTypes.bool.isRequired,
  needLogout: PropTypes.bool.isRequired,
  fetchOrganization: PropTypes.func.isRequired,
  changeCurrentUser: PropTypes.func.isRequired,
  changeCurrentOkrPeriod: PropTypes.func.isRequired,
  changeCurrentOrganizationId: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  // component
};

export default MenuBar;
