import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Table, Input, Checkbox, Button, Divider } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends Component {
  constructor(props) {
    super(props);
    this.firstNameInputs = [];
    this.lastNameInputs = [];
    this.emailInputs = [];
    this.state = {
      keyword: '',
      showDisabledUsers: false,
    }
  }

  addUser = () => {
    this.props.confirm({
      content: '入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。ユーザーを追加しますか？',
      onConfirm: () => {
        this.props.addUser({
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

  updateUser = user => {
    this.props.updateUser(user);
  };

  updateEmail = user => {
    this.props.updateEmail(user);
  };

  removeUser = id => {
    this.props.removeUser(id);
  };

  restoreUser = id => {
    this.props.restoreUser(id);
  };

  render() {
    const users = Array.from(this.props.users);
    if (users.length === 0) {
      return null;
    }
    const enabledUsers = users.filter(user => !user.get('disabled'))
    const disabledUsers = users.filter(user => user.get('disabled'));
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
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
                <Button icon="plus" content="追加する" onClick={this.addUser.bind(this)}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Input icon="search" placeholder="ユーザーを検索&#8230;" onChange={(event, { value }) => this.setState({ keyword: value })} />

        <UsersTable
          users={enabledUsers}
          loginUser={this.props.loginUser}
          onUpdateUser={user => this.updateUser(user)}
          onUpdateEmail={user => this.updateEmail(user)}
          onRemove={id => this.removeUser(id)}
          confirm={this.props.confirm}
          keyword={this.state.keyword}
        />

        <Divider />

        {disabledUsers.length > 0 && (
          this.state.showDisabledUsers ?
            <div>
              <h3>無効なユーザー</h3>
              <UsersTable
                users={disabledUsers}
                onRestore={id => this.restoreUser(id)}
                confirm={this.props.confirm}
                keyword={this.state.keyword}
              />
            </div>
            :
            <Button content="無効なユーザーを表示する" onClick={() => this.setState({ showDisabledUsers: true })} />
        )}
      </Tab.Pane>
    );
  }
}

UserSettingTab.propTypes = {
  users: PropTypes.object,
  organization: PropTypes.object,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  restoreUser: PropTypes.func.isRequired,
};

export default UserSettingTab;
