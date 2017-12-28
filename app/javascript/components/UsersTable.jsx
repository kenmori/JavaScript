import React, { Component } from 'react';
import { Button, Image, Input, Checkbox, Table } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import EditableText from './utils/EditableText';
import Avatar from '../containers/Avatar';

const rollOptions = [
  { key: 'user', value: 'user', text: 'ユーザー' },
  { key: 'admin', value: 'admin', text: '管理者' },
];

class UsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: null,
      users: this.getUsers(props.users),
      direction: null,
      editableId: null,
      emails: this.getEmails(props.users),
    };
    this.firstNameInputs = [];
    this.lastNameInputs = [];
    this.emailInputs = [];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: this.getUsers(nextProps.users),
      emails: this.getEmails(nextProps.users),
    });
  }

  changeEmail = (id, email) => {
    if(confirm('メールアドレスを変更しますか？')) {
      const notLogout = id !== this.props.loginUser.get('id');
      this.props.onUpdateEmail({id, email, notLogout});
    } else {
      this.setState({
        emails: this.state.emails
      });
    }
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
      return `${user.get('unconfirmedEmail')}（unconfirmed_email）`;
    }

    if (!user.get('confirmedAt')) {
      return `${user.get('email')}（unconfirmed_email）`;
    }

    return user.get('email');
  }

  sort = (event) => {
    const column = event.target.getAttribute('name');

    if (this.state.column !== column) {
      const sortedUsers = this.state.users.sort((a, b) => {
        if (typeof a.get(column) === 'string') {
          return a.get(column).localeCompare(b.get(column));
        } else {
          if (a.get(column) < b.get(column)) { return -1; }
          if (a.get(column) > b.get(column)) { return 1; }
          if (a.get(column) === b.get(column)) { return 0; }
        }
      });
      this.setState({
        column: column,
        users: sortedUsers,
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      users: this.state.users.reverse(),
      direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  filter = () => {
    const keyword = this.searchInput.inputRef.value;
    this.setState({
      users: this.props.users.filter(user => (
        user.get('firstName').includes(keyword) || user.get('lastName').includes(keyword) || user.get('email').includes(keyword)
      ))
    })
  };

  addUser = () => {
    if(confirm('入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。ユーザーを追加しますか？')) {
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
    }
  };

  removeUser = (id, name) => () => {
    if (confirm(`ユーザー ${name} を削除しますか？`)) {
      this.props.onRemove(id);
    }
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
        <Input icon="search" placeholder="ユーザーを検索&#8230;" className="search" onChange={this.filter}
               ref={node => { this.searchInput = node; }}/>

        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell disabled/>
              <Table.HeaderCell sorted={column === 'id' ? direction : null} onClick={this.sort} name="id">
                No
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={this.sort} name="lastName">
                姓
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'firstName' ? direction : null} onClick={this.sort} name="firstName">
                名
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={this.sort} name="email">
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'roll' ? direction : null} onClick={this.sort} name="roll">
                権限
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              users.map(user => {
                const id = user.get('id');
                const index = user.get('index');
                const readOnly = id !== this.state.editableId;
                const className = readOnly ? 'readonly' : '';
                const open = readOnly ? false : undefined;
                const lastName = user.get('lastName');
                const firstName = user.get('firstName');
                const isAdmin = user.get('isAdmin');
                const name = `${lastName} ${firstName}`;
                return (
                  <Table.Row key={id}>
                    <Table.Cell><Avatar user={user} isChangeableImage={true} /></Table.Cell>
                    <Table.Cell>{index}</Table.Cell>
                    <Table.Cell>
                      <EditableText value={lastName} saveValue={lastName => this.props.onUpdateUser({id, lastName})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <EditableText value={firstName} saveValue={firstName => this.props.onUpdateUser({id, firstName})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <EditableText value={this.state.emails[id]} saveValue={(email) => this.changeEmail(id, email)}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox label='管理者' defaultChecked={isAdmin} onChange={(event, {checked}) => this.props.onUpdateUser({id, admin: checked})} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <div>
                        {id !== this.props.loginUser.get('id') && <Button icon="trash" onClick={this.removeUser(id, name)} title="削除" negative/>}
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
