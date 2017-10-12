import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Image, Input, Select, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const rollOptions = [
  { key: 'user', value: 'user', text: 'ユーザー' },
  { key: 'admin', value: 'admin', text: '管理者' },
];

class UsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: null,
      users: props.users,
      direction: null,
      editableId: null,
    };
    this.firstNameInputs = [];
    this.lastNameInputs = [];
    this.emailInputs = [];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users,
    });
  }

  sort = (event) => {
    const column = event.target.getAttribute('name');

    if (this.state.column !== column) {
      const sortedUsers = this.state.users.sort((a, b) => {
        if (typeof a.get(column) === 'string') {
          return a.get(column).localeCompare(b.get(column));
        } else {
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          if (a === b) { return 0; }
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
      users: _.filter(this.props.users, user => {
        return user.get('firstName').includes(keyword) || user.get('lastName').includes(keyword) || user.get('email').includes(keyword);
      })
    })
  };

  addUser = () => () => {
    this.props.onAdd({
      first_name: this.firstNameInputs[0].inputRef.value,
      last_name: this.lastNameInputs[0].inputRef.value,
      email: this.emailInputs[0].inputRef.value,
      password: "testtest",
    });
    this.lastNameInputs[0].inputRef.value = '';
    this.firstNameInputs[0].inputRef.value = '';
    this.emailInputs[0].inputRef.value = '';
  };

  editUser = id => () => {
    this.setState({
      editableId: id
    });
  };

  editUserOk = () => {
    const id = this.state.editableId;
    this.props.onUpdate({
      id: id,
      firstName: this.firstNameInputs[id].inputRef.value,
      lastName: this.lastNameInputs[id].inputRef.value,
      email: this.emailInputs[id].inputRef.value,
    });
    this.setState({
      editableId: null
    });
  };

  editUserCancel = () => {
    const id = this.state.editableId;
    this.firstNameInputs[id].inputRef.value = this.firstNameInputs[id].inputRef.defaultValue;
    this.lastNameInputs[id].inputRef.value = this.lastNameInputs[id].inputRef.defaultValue;
    this.emailInputs[id].inputRef.value = this.emailInputs[id].inputRef.defaultValue;
    this.setState({
      editableId: null
    });
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
        <Input icon="search" placeholder="ユーザーを検索&#8230;" className="search" onChange={this.filter}
               ref={node => { this.searchInput = node; }}/>

        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell disabled/>
              <Table.HeaderCell sorted={column === 'id' ? direction : null} onClick={this.sort} name="id">
                ID
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
                役割
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              _.map(users, user => {
                const id = user.get('id');
                const readOnly = id !== this.state.editableId;
                const className = readOnly ? 'readonly' : '';
                const open = readOnly ? false : undefined;
                const lastName = user.get('lastName');
                const firstName = user.get('firstName');
                const name = `${lastName} ${firstName}`;
                return (
                  <Table.Row key={id}>
                    <Table.Cell><Image src="" avatar/></Table.Cell>
                    <Table.Cell><a href={`/users/${id}`}>{id}</a></Table.Cell>
                    <Table.Cell>
                      <Input type="text" defaultValue={lastName} readOnly={readOnly} className={className}
                             ref={node => { this.lastNameInputs[id] = node; }}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Input type="text" defaultValue={firstName} readOnly={readOnly} className={className}
                             ref={node => { this.firstNameInputs[id] = node; }}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Input type="email" defaultValue={user.get('email')} readOnly={readOnly} className={className}
                             ref={node => { this.emailInputs[id] = node; }}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Select options={rollOptions} defaultValue={'user'} open={open} className={className}/>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {readOnly ? (
                        <div>
                          <Button icon="pencil" onClick={this.editUser(id)} title="編集"/>
                          <Button icon="user delete" onClick={this.removeUser(id, name)} title="削除" negative/>
                        </div>
                      ) : (
                        <div>
                          <Button icon="cancel" onClick={this.editUserCancel} title="キャンセル"/>
                          <Button icon="check" onClick={this.editUserOk} title="OK" positive/>
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell/>
              <Table.HeaderCell/>
              <Table.HeaderCell>
                <Input type="text" maxLength="255" required ref={node => { this.lastNameInputs[0] = node; }}
                       placeholder="姓"/>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input type="text" maxLength="255" required ref={node => { this.firstNameInputs[0] = node; }}
                       placeholder="名"/>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input type="email" maxLength="255" required ref={node => { this.emailInputs[0] = node; }}
                       placeholder="メールアドレス"/>
              </Table.HeaderCell>
              <Table.HeaderCell><Select options={rollOptions} defaultValue={rollOptions[0].value}/></Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                <Button icon="plus" content="追加" onClick={this.addUser()}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UsersTable;
