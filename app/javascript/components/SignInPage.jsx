import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Image } from 'semantic-ui-react';
import logo_image from '../images/logo_large.png';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleEmailChange(value) {
    this.setState({
      email: value,
    });
  }

  signIn() {
    this.props.signIn(this.emailInput.inputRef.value, this.passwordInput.inputRef.value, true);
  }

  render() {
    return (
      <div className='sign-in'>
        <main style={{ margin: 30, flexDirection: 'column' }} className='flex flex-center '>
          <Image as='h1' src={logo_image} title='Resily' />
          <Form>
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input type='email' size='mini' placeholder='name@example.com' ref={(node) => {this.emailInput = node;}}
                       onChange={(event, { value }) => this.handleEmailChange(value)} />
              </Form.Field>
              <Form.Field inline>
                <div>パスワード</div>
                <Input type='password' size='mini' placeholder='英数字8文字以上' ref={(node) => {this.passwordInput = node;}}/>
              </Form.Field>
            </Form.Group>
            {/*<div className="user-create-link"><Link to="/users/sign_up">新規ユーザー登録はこちら</Link></div>*/}
            <div className="user-create-link">
              <Link to={{
                pathname: '/users/password/recover',
                state: { email: this.state.email },
              }}>パスワードを忘れた方はこちら</Link>
            </div>
            <div className='center'>
              <Button positive onClick={this.signIn.bind(this)}>ログインする</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}
