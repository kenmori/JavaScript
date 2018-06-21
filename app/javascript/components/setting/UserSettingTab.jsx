import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Table, Input, Checkbox, Button, Divider } from 'semantic-ui-react';
import UsersTable from './UsersTable';

class UserSettingTab extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      admin: false,
      keyword: '',
      showDisabledUsers: false,
    };
  }

  addUser = () => {
    const { firstName, lastName, email, admin } = this.state
    this.props.confirm({
      content: `${email} に確認メールを送信します。メール中の URL がクリックされると処理が完了します。ユーザーを追加しますか？`,
      onConfirm: () => {
        this.props.addUser({ firstName, lastName, email, admin })
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
        })
      },
    });
  };

  handleFirstNameChange = (e, { value }) => this.setState({ firstName: value })

  handleLastNameChange = (e, { value }) => this.setState({ lastName: value })

  handleEmailChange = (e, { value }) => this.setState({ email: value })

  handleAdminChange = (e, { checked }) => this.setState({ admin: checked })

  handleKeywordChange = (e, { value }) => this.setState({ keyword: value })

  handleShowDisabledUsersClick = () => this.setState({ showDisabledUsers: true })

  render() {
    if (this.props.users.size === 0) return null;
    const { firstName, lastName, email, admin } = this.state
    const enabledUsers = this.props.users.filter(user => !user.get('disabled'));
    const disabledUsers = this.props.users.filter(user => user.get('disabled'));
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        <Table singleLine sortable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input value={lastName} maxLength="255" placeholder="姓" onChange={this.handleLastNameChange} />
              </Table.Cell>
              <Table.Cell>
                <Input value={firstName} maxLength="255" placeholder="名" onChange={this.handleFirstNameChange} />
              </Table.Cell>
              <Table.Cell>
                <Input type="email" value={email} maxLength="255" placeholder="name@example.com"  onChange={this.handleEmailChange} />
              </Table.Cell>
              <Table.Cell>
                <Checkbox label='管理者' checked={admin} onChange={this.handleAdminChange} />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button icon="plus" content="追加する" onClick={this.addUser}/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Input icon="search" placeholder="ユーザーを検索&#8230;" onChange={this.handleKeywordChange} />

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
            <Button content="無効なユーザーを表示する" onClick={this.handleShowDisabledUsersClick} />
        )}
      </Tab.Pane>
    );
  }
}

UserSettingTab.propTypes = {
  // container
  loginUserId: PropTypes.number.isRequired,
  organization: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  restoreUser: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
};

export default UserSettingTab;
