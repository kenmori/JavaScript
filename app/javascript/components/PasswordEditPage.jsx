import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default class PasswordEditPage extends Component {
  editPassword() {
    const passwordVal = this.passwordInput.inputRef.value;
    const passwordValConfirm = this.passwordInputConfirm.inputRef.value;
    if (passwordVal === passwordValConfirm) {
      this.props.editPassword(
        passwordVal,
        this.props.location.search.split('reset_password_token=')[1].split('=')[0]
      );
    } else {
      //TODO: エラーメッセージを出す
      alert('パスワードが一致しません');
    }
  }
  componentWillUpdate(props = this.props) {
    if (props.isEdited) {
      props.history.push(props.passwordEditedPath)
    }
  }
  render() {
    return (
      <div className='password-edit'>
        <main>
          <h1 className='center'>Resily</h1>
          <Form>
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>新しいパスワード</div>
                <Input type='password' size='mini' placeholder='英数字8文字以上' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
              <Form.Field inline>
                <div>新しいパスワード（確認用）</div>
                <Input type='password' size='mini' placeholder='英数字8文字以上' ref={(node) => {this.passwordInputConfirm = node;}}/>
              </Form.Field>
            </Form.Group>
            <div className='center'>
              <Button negative onClick={this.editPassword.bind(this)}>再設定</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
