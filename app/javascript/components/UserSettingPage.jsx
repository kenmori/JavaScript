import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from '../containers/MenuBar';
import UsersTable from './UsersTable';

class UserSettingPage extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  addUser = user => {
    this.props.addUser(user);
  };

  updateUser = user => {
    this.props.updateUser(user);
  };

  removeUser = id => {
    this.props.removeUser(id);
  };

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
          <UsersTable data={users} onAdd={user => this.addUser(user)} onUpdate={user => this.updateUser(user)}
                      onRemove={id => this.removeUser(id)}/>
        </main>
      </div>
    );
  }
}

UserSettingPage.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserSettingPage;
