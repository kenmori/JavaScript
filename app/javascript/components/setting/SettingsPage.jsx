import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MenuBar from '../../containers/MenuBar';
import AccountSettingTab from '../../containers/AccountSettingTab'
import UserSettingTab from '../../containers/UserSettingTab'
import OrganizationSettingTab from '../../containers/OrganizationSettingTab'
import OkrPeriodSettingTab from '../../containers/OkrPeriodSettingTab'
import AvatarModal from '../../containers/AvatarModal'
import LogoModal from '../../containers/LogoModal'

class SettingsPage extends Component {
  get panes() {
    const panes = [{ id: 0, menuItem: 'アカウント', render: () => <AccountSettingTab/>, name: 'account' }];
    const adminPanes = [
      { id: 1, menuItem: '組織', render: () => <OrganizationSettingTab/> , name: 'organization'},
      { id: 2, menuItem: 'OKR期間', render: () => <OkrPeriodSettingTab/>, name: 'okr_periods' },
      { id: 3, menuItem: 'ユーザー', render: () => <UserSettingTab/>, name: 'users' },
      
    ]
    return this.props.isAdmin ? panes.concat(adminPanes) : panes;
  }

  handleTabChange(event, {activeIndex}) {
    const targetPane = this.panes.find(item => item.id === Number(activeIndex)) || {};
    this.props.changeURL(`/settings/${targetPane.name || this.panes[0].name}`);
  }

  componentWillMount() {
    const targetPane = this.panes.find(item => item.name === this.props.name);
    if (!targetPane) {
      return this.props.changeURL('/');
    }
  }

  render() {
    const targetPane = this.panes.find(item => item.name === this.props.name);
    if (!targetPane) {
      return null;
    }
    
    const activeIndex = targetPane.id;
    return (
      <div className='settings-page'>
        <MenuBar/>
        <main>
          <h2>設定</h2>
          <Tab activeIndex={activeIndex} menu={{ secondary: true, pointing: true }} panes={this.panes} className='setting-tabs' onTabChange={this.handleTabChange.bind(this)}/>
        </main>
        <AvatarModal/>
        <LogoModal/>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  name: PropTypes.string,
  changeURL: PropTypes.func,
};

SettingsPage.defaultProps = {
  name: 'account'
};

export default SettingsPage;