import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Input } from 'semantic-ui-react';
import UserAvatar from '../../containers/UserAvatar';
import AutoInput from '../form/AutoInput';

class AccountSettingTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null
    }
  }

  changeEmail = (id, email) => {
    if(confirm('入力したメールアドレスに確認メールを送信します。メール中の URL がクリックされると処理が完了します。メールアドレスを変更しますか？')) {
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
    this.props.openAvatarModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  deleteAvatar = (event) => {
    this.props.confirm({
      content: '設定済みのアイコンを削除しますか？',
      onConfirm: () => this.props.deleteAvatar({id: this.props.user.get('id'), removeAvatar: true}),
    });
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
            <span style={{marginRight: '5px'}}>
              <AutoInput value={user.get('lastName')} onCommit={lastName => this.props.updateUser({id: user.get('id'), lastName})}/>
            </span>
            <AutoInput value={user.get('firstName')} onCommit={firstName => this.props.updateUser({id: user.get('id'), firstName})}/>
          </dd>

          <dt>メールアドレス</dt>
          <dd><AutoInput value={this.state.email} placeholder='name@example.com' onCommit={email => this.changeEmail(user.get('id'), email)}/></dd>

          <dt>アバター</dt>
          <dd><UserAvatar user={user} size="huge" useDefault={true} /></dd>
          <dd>
            <div className="avatar-img-button">
              <label className="file-button">
                <input type="file" style={{display: "none"}} onChange={this.changeAvatarImage} />
              </label>
              <Button className="change-button" content="変更する" positive />
              {user.get('avatarUrl') && <Button className="change-button" content="削除する" negative onClick={this.deleteAvatar} />}
            </div>
          </dd>
          <dd>

          </dd>

          <dt>パスワード</dt>
          <dd>
            <dl>
              <dt>現在のパスワード</dt>
              <dd><Input type="password" placeholder='英数字8文字以上' ref={node => { this.currentPasswordInput = node; }}/></dd>
              <dt>新しいパスワード</dt>
              <dd><Input type="password" placeholder='英数字8文字以上' ref={node => { this.passwordInput = node; }}/></dd>
              <dt>新しいパスワード (確認用)</dt>
              <dd><Input type="password" placeholder='英数字8文字以上' ref={node => { this.passwordConfirmationInput = node; }}/></dd>
              <dd><Button content="パスワードを変更する" onClick={this.changePassword} /></dd>
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
