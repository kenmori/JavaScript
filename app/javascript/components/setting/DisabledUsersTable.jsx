import React, { Component } from 'react';
import { Button, Input, Checkbox, Table } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import AutoInput from '../form/AutoInput';
import Avatar from '../../containers/Avatar';

class DisabledUsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: 'index',
      users: this.getUsers(props.users),
      direction: 'ascending',
      emails: this.getEmails(props.users),
      keyword: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: this.getSortedUsers(this.getUsers(nextProps.users), this.state.column, this.state.direction),
      emails: this.getEmails(nextProps.users),
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

  restoreUser = user => () => {
    this.props.confirm({
      content: `ユーザー ${user.get('lastName')} ${user.get('firstName')} を復元しますか？`,
      onConfirm: () => this.props.onRestore(user.get('id')),
    });
  };

  render() {
    const { column, users, disabledUsers, direction } = this.state;
    return (
      <div className="users-table">
        <h3 className="users-table__title">無効化されたユーザー</h3>
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
                    <Table.Cell><Avatar user={user} isChangeableImage={false} /></Table.Cell>
                    <Table.Cell>{user.get('index')}</Table.Cell>
                    <Table.Cell>{user.get('lastName')} {user.get('firstName')}</Table.Cell>
                    <Table.Cell>{this.state.emails[id]}</Table.Cell>
                    <Table.Cell>
                      <Checkbox label='管理者'
                                defaultChecked={user.get('isAdmin')}
                                disabled={true}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <div className='disabled-box'>
                        <Button icon='recycle' title='復元' negative
                                onClick={this.restoreUser(user)}
                                disabled={false}
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

DisabledUsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onRestore: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default DisabledUsersTable;
