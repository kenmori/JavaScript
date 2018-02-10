import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends Component {
  addUser = user => {
    this.props.addUser(user);
  };

  updateUser = user => {
    this.props.updateUser(user);
  };

  updateEmail = user => {
    this.props.updateEmail(user);
  };

  removeUser = id => {
    this.props.removeUser(id);
  };

  render() {
    const users = Array.from(this.props.users);
    const disabledUsers = Array.from(this.props.disabledUsers);
    if (users.length === 0) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        <UsersTable users={users} 
                    disabledUsers={disabledUsers} 
                    loginUser={this.props.loginUser} 
                    onAdd={user => this.addUser(user)} 
                    onUpdateUser={user => this.updateUser(user)}
                    onUpdateEmail={user => this.updateEmail(user)}
                    onRemove={id => this.removeUser(id)}
                    confirm={this.props.confirm}/>
      </Tab.Pane>
    );
  }
}

UserSettingTab.propTypes = {
  users: PropTypes.object,
  disabledUsers: PropTypes.object,
  organization: PropTypes.object,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserSettingTab;
