import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Image, Input, Select, Table } from 'semantic-ui-react';

const rollOptions = [
  { key: 'user', value: 'user', text: 'ユーザー' },
  { key: 'admin', value: 'admin', text: '管理者' },
];

class UsersTable extends Component {

  addUser = () => () => {
    this.props.onAdd({
      name: this.nameInput.inputRef.value,
      email: this.emailInput.inputRef.value,
      password: "testtest",
    });
    this.nameInput.inputRef.value = '';
    this.emailInput.inputRef.value = '';
  };

  editUser = id => () => {
    alert("Sorry, this is not implemented yet.");
  };

  removeUser = id => () => {
    this.props.onRemove(id);
  };

  render() {
    return (
      <div className="users-table">
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell/>
              <Table.HeaderCell>
                ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell>
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell>
                役割
              </Table.HeaderCell>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              _.map(data, user => (
                <Table.Row key={user.get('id')}>
                  <Table.Cell><Image src="" avatar/></Table.Cell>
                  <Table.Cell><a href={'/users/' + user.get('id')}>{user.get('id')}</a></Table.Cell>
                  <Table.Cell>{user.get('name')}</Table.Cell>
                  <Table.Cell>{user.get('email')}</Table.Cell>
                  <Table.Cell>ユーザー</Table.Cell>
                  <Table.Cell>
                    <Button icon="edit" onClick={this.editUser(user.get('id'))}/>
                    <Button icon="remove" onClick={this.removeUser(user.get('id'))}/>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell/>
              <Table.HeaderCell/>
              <Table.HeaderCell>
                <Input type="text" maxLength="255" required ref={node => { this.nameInput = node; }}/>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input type="email" maxLength="255" required ref={node => { this.emailInput = node; }}/>
              </Table.HeaderCell>
              <Table.HeaderCell><Select options={rollOptions} defaultValue={rollOptions[0].value}/></Table.HeaderCell>
              <Table.HeaderCell><Button icon="plus" content="追加" onClick={this.addUser()}/></Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  data: React.PropTypes.array.isRequired,
  onAdd: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default UsersTable;
