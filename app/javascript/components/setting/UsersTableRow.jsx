import React, { PureComponent } from 'react';
import { Button, Checkbox, Table, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AutoInput from '../form/AutoInput';
import UserAvatar from '../../containers/UserAvatar';

class UsersTableRow extends PureComponent {

  render() {
    const { user, isLoginUser, updateUser, changeEmail, resendEmail, removeUser, restoreUser } = this.props;
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
                     onCommit={lastName => updateUser({ lastName })} />
          <AutoInput value={user.get('firstName')}
                     placeholder='名'
                     readOnly={disabled}
                     onCommit={firstName => updateUser({ firstName })} />
        </Table.Cell>
        <Table.Cell>
          <AutoInput value={user.get('email')}
                     placeholder='name@example.com'
                     readOnly={disabled}
                     onCommit={email => changeEmail(email)} />
          {user.get('unconfirmedEmail') && (
            disabled
              ? <Label pointing='left' icon='mail' content='確認中' />
              : <Label pointing='left' icon='mail' content='確認中' as='a' onClick={() => resendEmail(user)} />
          )}
        </Table.Cell>
        <Table.Cell>
          <Checkbox label='管理者'
                    defaultChecked={user.get('isAdmin')}
                    onChange={(event, { admin }) => updateUser({ admin })}
                    disabled={disabled || isLoginUser}
          />
        </Table.Cell>
        <Table.Cell textAlign="center">
          {disabled
            ? <Button icon='recycle' title='有効化' onClick={() => restoreUser(user)} />
            : (
              <div className={isLoginUser ? 'disabled-box' : ''}>
                <Button icon='trash' title='無効化' negative onClick={() => removeUser(user)} disabled={isLoginUser} />
              </div>
            )
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

UsersTableRow.propTypes = {
  user: PropTypes.object.isRequired,
  isLoginUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  resendEmail: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  restoreUser: PropTypes.func.isRequired,
};

export default UsersTableRow;
