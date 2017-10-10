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
      column: 'id',
      users: props.users,
      direction: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users,
    });
  }

  sort = clickedColumn => () => {
    const { column, users, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        users: _.sortBy(users, [clickedColumn]),
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      users: users.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
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
      first_name: this.firstNameInput.inputRef.value,
      last_name: this.lastNameInput.inputRef.value,
      email: this.emailInput.inputRef.value,
      password: "testtest",
    });
    this.lastNameInput.inputRef.value = '';
    this.firstNameInput.inputRef.value = '';
    this.emailInput.inputRef.value = '';
  };

  editUser = id => () => {
    alert("Sorry, this is not implemented yet.");
  };

  removeUser = id => () => {
    this.props.onRemove(id);
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
              <Table.HeaderCell sorted={column === 'id' ? direction : null} onClick={this.sort('id')}>
                ID
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={this.sort('lastName')}>
                姓
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'firstName' ? direction : null} onClick={this.sort('firstName')}>
                名
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={this.sort('email')}>
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'roll' ? direction : null} onClick={this.sort('roll')}>
                役割
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              _.map(users, user => (
                <Table.Row key={user.get('id')}>
                  <Table.Cell><Image src="" avatar/></Table.Cell>
                  <Table.Cell><a href={'/users/' + user.get('id')}>{user.get('id')}</a></Table.Cell>
                  <Table.Cell>
                    <Input type="text" defaultValue={user.get('lastName')} readOnly={true} className="readonly"/>
                  </Table.Cell>
                  <Table.Cell>
                    <Input type="text" defaultValue={user.get('firstName')} readOnly={true} className="readonly"/>
                  </Table.Cell>
                  <Table.Cell>
                    <Input type="email" defaultValue={user.get('email')} readOnly={true} className="readonly"/>
                  </Table.Cell>
                  <Table.Cell>
                    <Select options={rollOptions} defaultValue={'user'} open={false} className="readonly"/>
                  </Table.Cell>
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
                <Input type="text" maxLength="255" required ref={node => { this.lastNameInput = node; }}
                       placeholder="姓"/>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input type="text" maxLength="255" required ref={node => { this.firstNameInput = node; }}
                       placeholder="名"/>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Input type="email" maxLength="255" required ref={node => { this.emailInput = node; }}
                       placeholder="メールアドレス"/>
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
  users: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default UsersTable;
