import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, CustomCalendar, Form, Input } from 'semantic-ui-react';

export default class SignIn extends Component {
  signIn() {
    this.props.signIn(this.emailInput.inputRef.value, this.passwordInput.inputRef.value, this.rememberMeCheckBox.state.checked);
  }

  render() {
    return (
      <div className='sign-in'>
        <main style={{ margin: 30, flexDirection: 'column' }} className='flex flex-center '>
          <h1 className='center'>Resily</h1>
          <Form>
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input type='email' size='mini' placeholder='メールアドレスを入力してください' ref={(node) => {this.emailInput = node;}}/>
              </Form.Field>
              <Form.Field inline>
                <div>パスワード</div>
                <Input type='password' size='mini' placeholder='パスワードを入力してください' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Checkbox label={<label>ログイン情報を保存する</label>} ref={(node) => {this.rememberMeCheckBox = node;}}/>
            </Form.Field>
            <div className="user-create-link">新規ユーザー登録は<Link to="/users/sign_up">こちら</Link></div>
            <div className="user-create-link">パスワードを忘れた方は<Link to="/users/password/recover">こちら</Link></div>
            <div className='center'>
              <Button negative onClick={this.signIn.bind(this)}>ログイン</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
