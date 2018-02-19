import React, { Component } from 'react';
import { Button, Input, Checkbox, Table } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import AutoInput from '../form/AutoInput';
import Avatar from '../../containers/Avatar';
import EnabledUsersTable from './EnabledUsersTable';
import DisabledUsersTable from './DisabledUsersTable';

class UsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: 'index',
      users: this.getUsers(props.users),
      disabledUsers: this.getUsers(props.disabledUsers),
      direction: 'ascending',
      emails: this.getEmails(props.users),
      keyword: props.keyword,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: this.getSortedUsers(this.getUsers(nextProps.users), this.state.column, this.state.direction),
      disabledUsers: this.getSortedUsers(this.getUsers(nextProps.disabledUsers), this.state.column, this.state.direction),
      emails: this.getEmails(nextProps.users),
      keyword: nextProps.keyword
    });
  }

  changeEmail = (id, email) => {
    this.props.confirm({
      content: '入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。メールアドレスを変更しますか？',
      onConfirm: () => {
        const notLogout = id !== this.props.loginUser.get('id');
        this.props.onUpdateEmail({ id, email, notLogout });
      },
      onCancel: () => this.setState({ emails: this.state.emails }),
    });
  }

  getUsers = (users) => (
    users.map((item, index) => {
      return item.merge(Map({index: index + 1}));
    })
  )

  getEmails = (users) => (
    users.reduce((prev, next) => { 
      prev[next.get('id')] = this.getEmail(next);
      return prev;
    }, {})
  )

  getEmail =(user) => {
    if (user.get('unconfirmedEmail')) {
      return `${user.get('unconfirmedEmail')}（確認中）`;
    }

    if (!user.get('confirmedAt')) {
      return `${user.get('email')}（確認中）`;
    }

    return user.get('email');
  }

  getSortedUsers = (users, column, direction) => {
    const sortedUsers = users.sort((a, b) => {
      if (typeof a.get(column) === 'string') {
        return a.get(column).localeCompare(b.get(column));
      } else {
        if (a.get(column) < b.get(column)) { return -1; }
        if (a.get(column) > b.get(column)) { return 1; }
        if (a.get(column) === b.get(column)) { return 0; }
      }
    });
    return direction === 'ascending' ? sortedUsers : sortedUsers.reverse();
  }

  sort = (column) => {
    const direction = this.state.column !== column ? 'ascending'
      : this.state.direction === 'ascending' ? 'descending' : 'ascending';
    this.setState({
      column: column,
      users: this.getSortedUsers(this.state.users, column, direction),
      direction: direction,
    });
  };

  getFilteredUsers = (users, keyword) => {
    return keyword ? users.filter(user => (
      user.get('firstName').includes(keyword) || user.get('lastName').includes(keyword) || user.get('email').includes(keyword)
    )) : users;
  }

  removeUser = user => () => {
    this.props.confirm({
      content: `ユーザー ${user.get('lastName')} ${user.get('firstName')} を削除しますか？`,
      onConfirm: () => this.props.onRemove(user.get('id')),
    });
  };

  restoreUser = user => () => {
    this.props.confirm({
      content: `ユーザー ${user.get('lastName')} ${user.get('firstName')} を復元しますか？`,
      onConfirm: () => this.props.onRestore(user.get('id')),
    });
  };

  render() {
    const users = this.state.users.map((user) => {
      user.set('email', this.state.emails[user.get('id')]);
      return user;
    });
    const disabledUsers = this.state.disabledUsers.map((user) => {
      user.set('email', this.state.emails[user.get('id')]);
      return user;
    });
    return (
      <div className="users-table">
        <EnabledUsersTable 
          users={users}
          column={this.state.column} 
          direction={this.state.direction} 
          loginUser={this.props.loginUser}
          keyword={this.state.keyword}
          removeUser={this.removeUser}
          getFilteredUsers={this.getFilteredUsers}
          onUpdateUser={this.props.onUpdateUser}
          changeEmail={this.changeEmail}
          sort={this.sort}
        />
        { !!disabledUsers.length && 
          <DisabledUsersTable 
            users={disabledUsers} 
            column={this.state.column} 
            direction={this.state.direction} 
            restoreUser={this.restoreUser}
          />
        }
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array,
  disabledUsers: PropTypes.array,
  loginUser: PropTypes.object,
  onUpdateUser: PropTypes.func,
  onUpdateEmail: PropTypes.func,
  onRemove: PropTypes.func,
  onRestore: PropTypes.func,
  confirm: PropTypes.func,
  keyword: PropTypes.string,
};

export default UsersTable;
