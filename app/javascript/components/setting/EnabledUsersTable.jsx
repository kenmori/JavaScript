import React, { Component } from 'react';
import { Button, Input, Checkbox, Table } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import Avatar from '../../containers/Avatar';

export default (props) => {
  const { 
    column, 
    users, 
    direction, 
    keyword,
    sort,
    onUpdateUser,
    changeEmail,
    loginUser,
    removeUser,
    getFilteredUsers
  } = props;
  return (
    <div className="users-table">
      <Table singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell disabled/>
            <Table.HeaderCell sorted={column === 'index' ? direction : null} onClick={() => sort('index')} />
            <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={() => sort('lastName')}>
              名前
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={() => sort('email')}>
              メールアドレス
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'isAdmin' ? direction : null} onClick={() => sort('isAdmin')}>
              権限
            </Table.HeaderCell>
            <Table.HeaderCell disabled/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getFilteredUsers(users, keyword).map(user => {
              const id = user.get('id');
              return (
                <Table.Row key={id}>
                  <Table.Cell><Avatar user={user} isChangeableImage={true} /></Table.Cell>
                  <Table.Cell>{user.get('index')}</Table.Cell>
                  <Table.Cell>
                    <AutoInput value={user.get('lastName')} onCommit={lastName => onUpdateUser({id, lastName})}/>
                    <AutoInput value={user.get('firstName')} onCommit={firstName => onUpdateUser({id, firstName})}/>
                  </Table.Cell>
                  <Table.Cell>
                    <AutoInput value={user.get('email')} placeholder='name@example.com' onCommit={email => changeEmail(id, email)}/>
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox label='管理者'
                              defaultChecked={user.get('isAdmin')}
                              onChange={(event, { checked }) => onUpdateUser({ id, admin: checked })}
                              disabled={id === loginUser.get('id')}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <div className='disabled-box'>
                      <Button icon='trash' title='削除' negative
                              onClick={removeUser(user)}
                              disabled={id === loginUser.get('id')}
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
