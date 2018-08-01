import React, { PureComponent } from 'react';
import { Button, Checkbox, Radio, Table, Label } from 'semantic-ui-react';
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

  handleOwnerChange = () => this.props.setOrganizationOwner(this.props.organizationId, this.props.user)

  handleDisableClick = () => {
    const { user, confirm, disableUser } = this.props
    const fullName = `${user.get('lastName')} ${user.get('firstName')}`
    const isDisabled = user.get('disabled')
    confirm({
      content: `ユーザー "${fullName}" を${isDisabled ? '有効化' : '無効化'}しますか？`,
      onConfirm: () => disableUser(user),
    })
  }

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
                    checked={user.get('isAdmin')}
                    onChange={this.handleAdminChange}
                    disabled={disabled || isLoginUser}
          />
        </Table.Cell>
        <Table.Cell>
          <Radio
            name="owner"
            checked={user.get('isOwner')}
            onChange={this.handleOwnerChange}
            disabled={disabled}
          />
        </Table.Cell>
        <Table.Cell>{user.get('signInAt')}</Table.Cell>
        <Table.Cell textAlign="center">
          {disabled
            ? <Button icon='undo' content='有効化する' onClick={this.handleDisableClick} />
            : (
              <div className={isLoginUser ? 'disabled-box' : ''}>
                <Button icon='dont' content='無効化する' negative onClick={this.handleDisableClick} disabled={isLoginUser} />
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
  organizationId: PropTypes.number.isRequired,
  setOrganizationOwner: PropTypes.func.isRequired,
  disableUser: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
  user: ImmutablePropTypes.map.isRequired,
  isLoginUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
};

export default UsersTableRow;
