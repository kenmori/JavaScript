import React, { PureComponent } from 'react';
import { Button, Checkbox, Table, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import AutoInput from '../form/AutoInput';
import UserAvatar from '../../containers/UserAvatar';

class UsersTableRow extends PureComponent {

  handleLastNameCommit = lastName => this.props.updateUser({ lastName })

  handleFirstNameCommit = firstName => this.props.updateUser({ firstName })

  handleEmailCommit = email => this.props.changeEmail(email)

  handleResendClick = user => () => this.props.resendEmail(user)

  handleAdminChange = (event, { checked }) => this.props.updateUser({ admin: checked })

  handleRestoreClick = user => () => this.props.restoreUser(user)

  handleRemoveClick = user => () => this.props.removeUser(user)

  render() {
    const { user, isLoginUser } = this.props;
    const disabled = user.get('disabled');
    return (
      <Table.Row>
        <Table.Cell textAlign='center'>{user.get('index')}</Table.Cell>
        <Table.Cell textAlign='center'>
          <UserAvatar user={user} size='large' withInitial={false} editable={!disabled} />
        </Table.Cell>
        <Table.Cell>
          <AutoInput value={user.get('lastName')}
                     placeholder='姓'
                     readOnly={disabled}
                     onCommit={this.handleLastNameCommit} />
          <AutoInput value={user.get('firstName')}
                     placeholder='名'
                     readOnly={disabled}
                     onCommit={this.handleFirstNameCommit} />
        </Table.Cell>
        <Table.Cell>
          <AutoInput value={user.get('email')}
                     placeholder='name@example.com'
                     readOnly={disabled}
                     onCommit={this.handleEmailCommit} />
          {user.get('isConfirming') && (
            disabled
              ? <Label pointing='left' icon='mail' content='確認中' />
              : <Label pointing='left' icon='mail' content='確認中' as='a' onClick={this.handleResendClick(user)} />
          )}
        </Table.Cell>
        <Table.Cell>
          <Checkbox label='管理者'
                    defaultChecked={user.get('isAdmin')}
                    onChange={this.handleAdminChange}
                    disabled={disabled || isLoginUser}
          />
        </Table.Cell>
        <Table.Cell textAlign="center">
          {disabled
            ? <Button icon='undo' content='有効化する' onClick={this.handleRestoreClick(user)} />
            : (
              <div className={isLoginUser ? 'disabled-box' : ''}>
                <Button icon='dont' content='無効化する' negative onClick={this.handleRemoveClick(user)} disabled={isLoginUser} />
              </div>
            )
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

UsersTableRow.propTypes = {
  // container
  // component
  user: ImmutablePropTypes.map.isRequired,
  isLoginUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  restoreUser: PropTypes.func.isRequired,
};

export default UsersTableRow;
