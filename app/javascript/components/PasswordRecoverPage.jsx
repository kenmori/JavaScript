import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default class SignIn extends Component {
  send() {
    this.props.send(this.emailInput.inputRef.value);
  }

  render() {
    return (
      <div className='password-recover'>
        <main>
          <h1 className='center'>Resily</h1>
          <Form>
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input type='email' size='mini' placeholder='メールアドレスを入力してください' ref={(node) => {this.emailInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <div className='center'>
              <Button negative onClick={this.send.bind(this)}>送信</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
