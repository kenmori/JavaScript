import React, { Component } from 'react';
import { Button, Input, Checkbox, Table } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import Avatar from '../../containers/Avatar';

export default (props) => {
  return (
    <div className="users-table">
      <h3 className="users-table__title">無効化されたユーザー</h3>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell disabled/>
            <Table.HeaderCell/>
            <Table.HeaderCell>
              名前
            </Table.HeaderCell>
            <Table.HeaderCell>
              メールアドレス
            </Table.HeaderCell>
            <Table.HeaderCell>
              権限
            </Table.HeaderCell>
            <Table.HeaderCell disabled/>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.users.map(user => {
              const id = user.get('id');
              return (
                <Table.Row key={id}>
                  <Table.Cell><Avatar user={user} isChangeableImage={false} /></Table.Cell>
                  <Table.Cell>{user.get('index')}</Table.Cell>
                  <Table.Cell>{user.get('lastName')} {user.get('firstName')}</Table.Cell>
                  <Table.Cell>{user.get('email')}</Table.Cell>
                  <Table.Cell>
                    <Checkbox label='管理者'
                              defaultChecked={user.get('isAdmin')}
                              disabled={true}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <div className='disabled-box'>
                      <Button icon='recycle' title='復元' negative
                              onClick={props.restoreUser(user)}
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