import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Image, Table } from 'semantic-ui-react';

class UsersTable extends Component {

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
                  <Table.Cell>{user.get('id')}</Table.Cell>
                  <Table.Cell>{user.get('name')}</Table.Cell>
                  <Table.Cell>{user.get('email')}</Table.Cell>
                  <Table.Cell>ユーザー</Table.Cell>
                  <Table.Cell>
                    <Button icon="edit"/>
                    <Button icon="remove"/>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default UsersTable;
