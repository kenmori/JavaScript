import React, { Component } from 'react';
import { Button, Form, Input, Image } from 'semantic-ui-react';
import logo_image from '../images/logo_large.png';

export default class PasswordRecoverPage extends Component {
  send() {
    this.props.send(this.emailInput.inputRef.value);
  }
  componentWillUpdate(props = this.props) {
    if (props.isRecoverd) {
      props.history.push(props.passwordRecoverdPath)
    }
  }
  render() {
    return (
      <div className='password-recover'>
        <main className='center'>
          <Image as='h1' src={logo_image} title='Resily' />
          <p>パスワードを再設定するためのメールを送信します。</p>
          <Form>
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input type='email' size='mini' placeholder='name@example.com' ref={(node) => {this.emailInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <div>
              <Button positive onClick={this.send.bind(this)}>送信する</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
