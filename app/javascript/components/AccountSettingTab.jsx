import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Image, Input } from 'semantic-ui-react';

class AccountSettingTab extends Component {

  changePassword = () => {
    this.oldPasswordInput.inputRef.value = '';
    this.newPasswordInput.inputRef.value = '';
    this.confirmPasswordInput.inputRef.value = '';
  };

  render() {
    const user = this.props.user;
    if (!user) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="account-setting-tab">
        <dl>
          <dt>名前</dt>
          <dd>{user.last_name} {user.first_name}</dd>

          <dt>メールアドレス</dt>
          <dd>{user.email}</dd>

          <dt>画像</dt>
          <dd><Image src="" avatar/></dd>

          <dt>パスワード</dt>
          <dd>
            <dl>
              <dt>現在のパスワード</dt>
              <dd><Input type="password" ref={node => { this.oldPasswordInput = node; }}/></dd>
              <dt>新しいパスワード</dt>
              <dd><Input type="password" ref={node => { this.newPasswordInput = node; }}/></dd>
              <dt>新しいパスワード (確認用)</dt>
              <dd><Input type="password" ref={node => { this.confirmPasswordInput = node; }}/></dd>
              <dd><Button content="パスワードを変更する" onClick={this.changePassword}/></dd>
            </dl>
          </dd>
        </dl>
      </Tab.Pane>
    );
  }
}

AccountSettingTab.propTypes = {};

export default AccountSettingTab;
