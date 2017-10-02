import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import MenuBar from '../containers/MenuBar';
import AccountSettingTab from '../containers/AccountSettingTab'
import UserSettingTab from '../containers/UserSettingTab'
import OKRSettingTab from '../containers/OKRSettingTab'

class SettingsPage extends Component {
  get panes() {
    return ([
      { menuItem: 'アカウント', render: () => <AccountSettingTab/> },
      { menuItem: 'ユーザー', render: () => <UserSettingTab/> },
      { menuItem: 'OKR', render: () => <OKRSettingTab/> },
    ]);
  }

  render() {
    return (
      <div className='settings-page'>
        <MenuBar/>
        <main>
          <h2>設定</h2>
          <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} className='setting-tabs'/>
        </main>
      </div>
    );
  }
}

SettingsPage.propTypes = {};

export default SettingsPage;
