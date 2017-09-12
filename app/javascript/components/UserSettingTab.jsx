import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends Component {

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
      return null;
    }
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        <UsersTable users={users} onAdd={user => this.addUser(user)} onUpdate={user => this.updateUser(user)}
                    onRemove={id => this.removeUser(id)}/>
      </Tab.Pane>
    );
  }
}

UserSettingTab.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserSettingTab;
