import React, { Component } from 'react';
import { Button, Image, Input, Checkbox, Table } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import AutoInput from './utils/AutoInput';
import Avatar from '../containers/Avatar';

class UsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: 'index',
      users: this.getUsers(props.users),
      direction: 'ascending',
      emails: this.getEmails(props.users),
      keyword: null,
    };
    this.firstNameInputs = [];
    this.lastNameInputs = [];
    this.emailInputs = [];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: this.getSortedUsers(this.getUsers(nextProps.users), this.state.column, this.state.direction),
      emails: this.getEmails(nextProps.users),
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

  addUser = () => {
    this.props.confirm({
      content: '入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。ユーザーを追加しますか？',
      onConfirm: () => {
        this.props.onAdd({
          firstName: this.firstNameInputs[0].inputRef.value,
          lastName: this.lastNameInputs[0].inputRef.value,
          email: this.emailInputs[0].inputRef.value,
          admin: this.isAdminInputs.inputRef.checked,
          noPasswordRequired: true,
        });
        this.lastNameInputs[0].inputRef.value = '';
        this.firstNameInputs[0].inputRef.value = '';
        this.emailInputs[0].inputRef.value = '';
        this.isAdminInputs.inputRef.checked = false;
      },
    });
  };

  removeUser = user => () => {
    this.props.confirm({
      content: `ユーザー ${user.get('lastName')} ${user.get('firstName')} を削除しますか？`,
      onConfirm: () => this.props.onRemove(user.get('id')),
    });
  };

  render() {
    const { column, users, direction } = this.state;
    return (
      <div className="users-table">
        <Table singleLine sortable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input type="text" maxLength="255" required ref={node => { this.lastNameInputs[0] = node; }}
                       placeholder="姓"/>
              </Table.Cell>
              <Table.Cell>
                <Input type="text" maxLength="255" required ref={node => { this.firstNameInputs[0] = node; }}
                       placeholder="名"/>
              </Table.Cell>
              <Table.Cell>
                <Input type="email" maxLength="255" required ref={node => { this.emailInputs[0] = node; }}
                       placeholder="メールアドレス"/>
              </Table.Cell>
              <Table.Cell>
                <Checkbox label='管理者' defaultChecked={false} required ref={node => { this.isAdminInputs = node; }} />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button icon="plus" content="追加する" onClick={this.addUser}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Input icon="search" placeholder="ユーザーを検索&#8230;" onChange={(event, { value }) => this.setState({ keyword: value })} />

        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell disabled/>
              <Table.HeaderCell sorted={column === 'index' ? direction : null} onClick={() => this.sort('index')} />
              <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={() => this.sort('lastName')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={() => this.sort('email')}>
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'isAdmin' ? direction : null} onClick={() => this.sort('isAdmin')}>
                権限
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.getFilteredUsers(this.state.users, this.state.keyword).map(user => {
                const id = user.get('id');
                return (
                  <Table.Row key={id}>
                    <Table.Cell><Avatar user={user} isChangeableImage={true} /></Table.Cell>
                    <Table.Cell>{user.get('index')}</Table.Cell>
                    <Table.Cell>
                      <AutoInput value={user.get('lastName')} onCommit={lastName => this.props.onUpdateUser({id, lastName})}/>
                      <AutoInput value={user.get('firstName')} onCommit={firstName => this.props.onUpdateUser({id, firstName})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <AutoInput value={this.state.emails[id]} placeholder='name@example.com' onCommit={email => this.changeEmail(id, email)}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox label='管理者'
                                defaultChecked={user.get('isAdmin')}
                                onChange={(event, { checked }) => this.props.onUpdateUser({ id, admin: checked })}
                                disabled={id === this.props.loginUser.get('id')}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <div className='disabled-box'>
                        <Button icon='trash' title='削除' negative
                                onClick={this.removeUser(user)}
                                disabled={id === this.props.loginUser.get('id')}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  loginUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onUpdateEmail: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UsersTable;
