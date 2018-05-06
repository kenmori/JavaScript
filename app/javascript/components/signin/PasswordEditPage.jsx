import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Image } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordEditPage extends PureComponent {
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
      alert('パスワードが一致しません。');
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
        <main className='center'>
          <Image as='h1' src={logo_image} title='Resily' />
          <p>アカウントに再設定する新しいパスワードを入力してください。</p>
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
            <div>
              <Button positive onClick={this.editPassword.bind(this)}>再設定する</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}

PasswordEditPage.propTypes = {
  // container
  passwordEditedPath: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
  editPassword: PropTypes.func.isRequired,
  // component
}

export default PasswordEditPage
