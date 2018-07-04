import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import {Dropdown, Menu, Icon} from 'semantic-ui-react';
import UserSelect from './form/UserSelect';
import OkrPeriodSelect from './form/OkrPeriodSelect'
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
    }
  }

  userTrigger = loginUser => {
    return <UserAvatar user={loginUser} size='tiny' withInitial={false} withName={true} />;
  }

  handleOrganizationOkrClick = () => this.props.selectUser(this.props.ownerId)

  handleChangeOrganization = (event, { value }) => {
    this.props.changeCurrentOrganizationId(this.props.loginUser.get('id'), value);
  }

  organizationTag(props = this.props) {
    if(!props.organizations || props.organizations.size === 1) return null

    function options(organizations) {
      return organizations.map(item => (
        {
          key: item.get('id'),
          value: item.get('id'),
          text: item.get('name'),
        }
      )).toArray();
    }

    return (
      <Menu.Item>
        <Dropdown
          scrolling
          pointing='top'
          options={options(props.organizations)}
          defaultValue={props.organization.get('id')}
          onChange={this.handleChangeOrganization}
          selectOnNavigation={false}
        />
      </Menu.Item>
    )
  }

  render() {
    return (
      <Menu secondary className='menu-bar'>
        <Menu.Item header href='/'>
          <Logo path={this.props.organization.get('logo').get('url')} size='tiny'/>
        </Menu.Item>
        <Menu.Item href='/'>
          <Icon name="home" size="large" fitted />ホーム
        </Menu.Item>
        <Menu.Item onClick={this.handleOrganizationOkrClick}>
          <Icon name="building" size='large' fitted />組織 OKR
        </Menu.Item>
        {this.organizationTag()}
        <Menu.Item>
          <OkrPeriodSelect
            okrPeriods={this.props.okrPeriods}
            value={this.props.okrPeriodId}
            onChange={this.props.selectOkrPeriod}
          />
        </Menu.Item>
        <Menu.Item>
          {!this.props.users.isEmpty() && (
            <UserSelect
              users={this.props.users}
              value={this.props.userId}
              onChange={this.props.selectUser}
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
  ownerId: PropTypes.number.isRequired,
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
  selectUser: PropTypes.func.isRequired,
  selectOkrPeriod: PropTypes.func.isRequired,
  changeCurrentOrganizationId: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  // component
};

export default MenuBar;
