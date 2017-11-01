import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Input } from 'semantic-ui-react';

export default class SignIn extends Component {
  render() {
    return (
      <div className="sign-up">
        <main>
          <h1 className="center">Resily</h1>
          <Form className="user-form">
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>性</div>
                <Input type='text' size='mini' ref={(node) => {this.emailInput = node;}}/>
              </Form.Field>
              <Form.Field inline>
                <div>名</div>
                <Input type='text' size='mini' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input type='email' size='mini' placeholder='name@example.com' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
              <Form.Field inline>
                <div>パスワード</div>
                <Input type='password' size='mini' placeholder='英数字8文字以上' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <div className="center">
              <Button negative>登録</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
