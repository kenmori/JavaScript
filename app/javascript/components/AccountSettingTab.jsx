import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Input } from 'semantic-ui-react';
import Avatar from '../containers/Avatar';
import EditableText from './utils/EditableText';

class AccountSettingTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null
    }
  }

  changeEmail = (id, email) => {
    if(confirm('emailを変更すると指定のメールアドレスへ確認のメールを送信いたします。 確認のメールにありますURLをクリックすると、変更が完了いたします。')) {
      this.props.updateEmail({id, email});
    } else {
      this.setState({
        email: this.props.user.get('email'),
      });
    }
  }

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
    this.props.openAvatarImageModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  deleteAvatar = (event) => {
    if (confirm('アイコンを削除します。')) {
      this.props.deleteAvatar({id: this.props.user.get('id'), removeAvatar: true});
    }
  }

  componentDidMount() {
    this.setState({
      email: this.props.user.get('email'),
    });
  }

  render() {
    const user = this.props.user;
    if (!user || !this.state.email) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="account-setting-tab">
        <dl>
          <dt>名前</dt>
          <dd>
            <EditableText value={user.get('lastName')} saveValue={lastName => this.props.updateUser({id: user.get('id'), lastName})}/>
            <EditableText value={user.get('firstName')} saveValue={firstName => this.props.updateUser({id: user.get('id'), firstName})}/>
          </dd>

          <dt>メールアドレス</dt>
          <dd><EditableText value={this.state.email} saveValue={(email) => this.changeEmail(user.get('id'), email)}/></dd>

          <dt>会社名</dt>
          <dd><EditableText value={user.get('organizationName')} saveValue={name => this.props.updateUser({id: user.get('id'), organizationName: name})}/></dd>

          <dt>画像</dt>
          <dd><Avatar user={user} size="large" /></dd>
          <dd>
            <div className="avatar-img-button">
              <label className="file-button">
                <input type="file" style={{display: "none"}} onChange={this.changeAvatarImage} />
              </label>
              <Button className="change-button" content="アイコンを変更する" positive />
              {user.get('avatarUrl') && <Button className="change-button" content="アイコンを削除する" negative onClick={this.deleteAvatar} />}
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
