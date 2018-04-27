import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Table, Input, Checkbox, Button, Divider } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      showDisabledUsers: false,
    };
  }

  addUser = () => {
    this.props.confirm({
      content: '入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。ユーザーを追加しますか？',
      onConfirm: () => {
        this.props.addUser({
          firstName: this.refs.firstName.inputRef.value,
          lastName: this.refs.lastName.inputRef.value,
          email: this.refs.email.inputRef.value,
          admin: this.refs.admin.inputRef.checked,
          noPasswordRequired: true,
        });
        this.refs.lastName.inputRef.value = '';
        this.refs.firstName.inputRef.value = '';
        this.refs.email.inputRef.value = '';
        this.refs.admin.inputRef.checked = false;
      },
    });
  };

  render() {
    if (this.props.users.size === 0) return null;
    const enabledUsers = this.props.users.filter(user => !user.get('disabled'));
    const disabledUsers = this.props.users.filter(user => user.get('disabled'));
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        <Table singleLine sortable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input type="text" maxLength="255" required ref='lastName' placeholder="姓" />
              </Table.Cell>
              <Table.Cell>
                <Input type="text" maxLength="255" required ref='firstName' placeholder="名" />
              </Table.Cell>
              <Table.Cell>
                <Input type="email" maxLength="255" required ref='email' placeholder="name@example.com" />
              </Table.Cell>
              <Table.Cell>
                <Checkbox label='管理者' required ref='admin' />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button icon="plus" content="追加する" onClick={this.addUser.bind(this)}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Input icon="search" placeholder="ユーザーを検索&#8230;"
               onChange={(event, { value }) => this.setState({ keyword: value })}
        />

        <UsersTable
          users={enabledUsers}
          loginUserId={this.props.loginUserId}
          onUpdateUser={this.props.updateUser}
          onUpdateEmail={this.props.updateEmail}
          onResendEmail={this.props.resendEmail}
          onRemove={this.props.removeUser}
          confirm={this.props.confirm}
          keyword={this.state.keyword}
        />

        <Divider />

        {disabledUsers.size > 0 && (
          this.state.showDisabledUsers ?
            <div>
              <h3>無効なユーザー</h3>
              <UsersTable
                users={disabledUsers}
                onRestore={this.props.restoreUser}
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
  users: PropTypes.object.isRequired,
};

export default UserSettingTab;
