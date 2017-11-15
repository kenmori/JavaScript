import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Input } from 'semantic-ui-react';
import Avatar from './Avatar';

class AccountSettingTab extends Component {


  changePassword = () => {
    this.props.updatePassword({
      id: this.props.user.id,
      currentPassword: this.currentPasswordInput.inputRef.value,
      password: this.passwordInput.inputRef.value,
      passwordConfirmation: this.passwordConfirmationInput.inputRef.value,
    });

    this.currentPasswordInput.inputRef.value = '';
    this.passwordInput.inputRef.value = '';
    this.passwordConfirmationInput.inputRef.value = '';
  };

  changeAvatarImage = (event) => {
    if (!event.target.files.length) { return; }
    this.props.openAvatarImageModal(event.target.files[0]);
    event.target.value = null;
  }

  deleteAvatar = (event) => {
    if (confirm('画像を削除します。')) {
      this.props.deleteAvatar({id: this.props.user.get('id'), removeAvatar: true});
    }
  }

  render() {
    const user = this.props.user;
    if (!user) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="account-setting-tab">
        <dl>
          <dt>名前</dt>
          <dd>{user.get('lastName')} {user.get('firstName')}</dd>

          <dt>メールアドレス</dt>
          <dd>{user.get('email')}</dd>

          <dt>画像</dt>
          <dd><Avatar path={user.get('avatarPath')} name={user.get('lastName')} size="large" /></dd>
          <dd>
            <div className="avatar-img-button">
              <label className="file-button">
                <input type="file" style={{display: "none"}} onChange={this.changeAvatarImage} />
              </label>
              <Button className="change-button" content="アイコンを変更する" positive />
              <Button className="change-button" content="アイコンを削除する" negative onClick={this.deleteAvatar} />
            </div>
          </dd>
          <dd>

          </dd>

          <dt>パスワード</dt>
          <dd>
            <dl>
              <dt>現在のパスワード</dt>
              <dd><Input type="password" ref={node => { this.currentPasswordInput = node; }}/></dd>
              <dt>新しいパスワード</dt>
              <dd><Input type="password" ref={node => { this.passwordInput = node; }}/></dd>
              <dt>新しいパスワード (確認用)</dt>
              <dd><Input type="password" ref={node => { this.passwordConfirmationInput = node; }}/></dd>
              <dd><Button content="パスワードを変更する" onClick={this.changePassword} positive /></dd>
            </dl>
          </dd>
        </dl>
      </Tab.Pane>
    );
  }
}

AccountSettingTab.propTypes = {
  updatePassword: PropTypes.func.isRequired,
};

export default AccountSettingTab;
