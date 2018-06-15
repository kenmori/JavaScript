import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Image } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordRecoverPage extends PureComponent {
  send = () => {
    this.props.send(this.emailInput.inputRef.value);
  }
  componentWillUpdate(props = this.props) {
    if (props.isRecovered) {
      props.history.push(props.passwordRecoveredPath)
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
                <Input type='email' size='mini' placeholder='name@example.com' ref={(node) => {this.emailInput = node;}}
                       defaultValue={this.props.location.state && this.props.location.state.email} />
              </Form.Field>
            </Form.Group>
            <div>
              <Button positive onClick={this.send}>送信する</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}

PasswordRecoverPage.propTypes = {
  // container
  passwordRecoveredPath: PropTypes.string.isRequired,
  isRecovered: PropTypes.bool.isRequired,
  send: PropTypes.func.isRequired,
  // component
}

export default PasswordRecoverPage