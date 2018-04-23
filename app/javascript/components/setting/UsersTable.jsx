import React, { Component } from 'react';
import { Button, Checkbox, Table, Label, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoInput from '../form/AutoInput';
import UserAvatar from '../../containers/UserAvatar';

class UsersTable extends Component {

  static NUMBER_TO_DISPLAY = 50;

  constructor(props) {
    super(props);
    this.state = {
      column: 'index',
      users: this.getUsers(props.users),
      direction: 'ascending',
      activePage: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePage: this.props.keyword !== nextProps.keyword ? 1 : this.state.activePage,
      users: this.getSortedUsers(this.getUsers(nextProps.users), this.state.column, this.state.direction),
    });
  }

  changeEmail = (id, email) => {
    this.props.confirm({
      content: `${email} に確認メールを送信します。メール中の URL がクリックされると処理が完了します。メールアドレスを変更しますか？`,
      onConfirm: () => {
        const notLogout = id !== this.props.loginUser.get('id');
        this.props.onUpdateEmail({ id, email, notLogout });
      },
      onCancel: () => this.forceUpdate(), // 入力内容を破棄する
    });
  }

  resendEmail = user => {
    this.props.confirm({
      content: `${user.get('email')} に確認メールを再送信しますか？`,
      onConfirm: () => this.props.onResendEmail(user.get('id')),
    });
  }

  getUsers = (users) => (
    users.map((user, index) =>
      user.set('index', index + 1)
        .set('email', user.get('unconfirmedEmail') || user.get('email'))
    )
  )

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
      content: `ユーザー "${user.get('lastName')} ${user.get('firstName')}" を無効化しますか？`,
      onConfirm: () => this.props.onRemove(user.get('id')),
    });
  };

  restoreUser = user => () => {
    this.props.confirm({
      content: `ユーザー "${user.get('lastName')} ${user.get('firstName')}" を有効化しますか？`,
      onConfirm: () => this.props.onRestore(user.get('id')),
    });
  };

  render() {
    const { column, direction, users, activePage } = this.state;
    const filteredUsers = this.getFilteredUsers(users, this.props.keyword);
    const begin = (activePage - 1) * UsersTable.NUMBER_TO_DISPLAY;
    const end = Math.min(filteredUsers.size, activePage * UsersTable.NUMBER_TO_DISPLAY);
    const totalPages = Math.ceil(filteredUsers.size / UsersTable.NUMBER_TO_DISPLAY);
    return (
      <div className="users-table">
        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'index' ? direction : null} onClick={() => this.sort('index')} textAlign='center' />
              <Table.HeaderCell disabled />
              <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={() => this.sort('lastName')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={() => this.sort('email')}>
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'isAdmin' ? direction : null} onClick={() => this.sort('isAdmin')}>
                権限
              </Table.HeaderCell>
              <Table.HeaderCell disabled />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredUsers.slice(begin, end).map(user => {
              const id = user.get('id');
              const isLoginUser = this.props.loginUser && id === this.props.loginUser.get('id');
              return (
                <Table.Row key={id}>
                  <Table.Cell textAlign='center'>{user.get('index')}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <UserAvatar user={user} size='large' withInitial={false} editable={!user.get('disabled')} />
                  </Table.Cell>
                  <Table.Cell>
                    <AutoInput value={user.get('lastName')}
                               placeholder='姓'
                               readOnly={user.get('disabled')}
                               onCommit={lastName => this.props.onUpdateUser({ id, lastName })} />
                    <AutoInput value={user.get('firstName')}
                               placeholder='名'
                               readOnly={user.get('disabled')}
                               onCommit={firstName => this.props.onUpdateUser({ id, firstName })} />
                  </Table.Cell>
                  <Table.Cell>
                    <AutoInput value={user.get('email')}
                               placeholder='name@example.com'
                               readOnly={user.get('disabled')}
                               onCommit={email => this.changeEmail(id, email)} />
                    {user.get('unconfirmedEmail') && (
                      user.get('disabled')
                        ? <Label pointing='left' icon='mail' content='確認中' />
                        : <Label pointing='left' icon='mail' content='確認中' as='a'
                                 onClick={() => this.resendEmail(user)} />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox label='管理者'
                              defaultChecked={user.get('isAdmin')}
                              onChange={(event, { checked }) => this.props.onUpdateUser({ id, admin: checked })}
                              disabled={user.get('disabled') || isLoginUser}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {user.get('disabled') ?
                      <Button icon='recycle' title='有効化'
                              onClick={this.restoreUser(user)}
                      />
                      :
                      <div className={isLoginUser ? 'disabled-box' : ''}>
                        <Button icon='trash' title='無効化' negative
                                onClick={this.removeUser(user)}
                                disabled={isLoginUser}
                        />
                      </div>
                    }
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6' textAlign='right'>
                {totalPages > 0 && (
                  <Pagination activePage={activePage} firstItem={null} lastItem={null} totalPages={totalPages}
                              prevItem={activePage === 1 ? null : undefined}
                              nextItem={activePage === totalPages ? null : undefined}
                              onPageChange={(e, { activePage }) => this.setState({ activePage })} />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  loginUser: PropTypes.object,
  onUpdateUser: PropTypes.func,
  onUpdateEmail: PropTypes.func,
  onResendEmail: PropTypes.func,
  onRemove: PropTypes.func,
  onRestore: PropTypes.func,
  confirm: PropTypes.func,
  keyword: PropTypes.string,
};

export default UsersTable;
