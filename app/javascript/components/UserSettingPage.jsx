import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';

class UserSettingPage extends Component {

  render() {
    return (
      <div className="user-setting-page">
        <MenuBar/>
        <main>
          <h2>ユーザー設定</h2>
        </main>
      </div>
    );
  }
}

UserSettingPage.propTypes = {
};

export default UserSettingPage;
