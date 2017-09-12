import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import MenuBar from '../containers/MenuBar';
import UserSettingTab from '../containers/UserSettingTab'

class SettingsPage extends Component {
  get panes() {
    return ([
      { menuItem: 'アカウント', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
      { menuItem: 'ユーザー', render: () => <UserSettingTab/> },
      { menuItem: 'OKR', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
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
