import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends Component {

  componentDidMount() {
    this.props.fetchOrganization(this.props.organization.get('id'));
  }

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
    if (users.length === 0) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        <UsersTable users={users} 
                    loginUser={this.props.loginUser} 
                    onAdd={user => this.addUser(user)} 
                    onUpdateUser={user => this.updateUser(user)}
                    onUpdateEmail={user => this.updateEmail(user)}
                    onRemove={id => this.removeUser(id)}/>
      </Tab.Pane>
    );
  }
}

UserSettingTab.propTypes = {
  organization: PropTypes.object,
  fetchOrganization: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserSettingTab;
