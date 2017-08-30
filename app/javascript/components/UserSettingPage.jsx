import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from '../containers/MenuBar';
import UsersTable from './UsersTable';

class UserSettingPage extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = Array.from(this.props.users);
    if (users.length === 0) {
      return <div/>;
    }
    return (
      <div className="user-setting-page">
        <MenuBar/>
        <main>
          <h2>ユーザー設定</h2>
          <UsersTable data={users}/>
        </main>
      </div>
    );
  }
}

UserSettingPage.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
};

export default UserSettingPage;
