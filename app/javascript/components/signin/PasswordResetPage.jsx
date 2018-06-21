import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Image, Segment, Message } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordResetPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { email: props.email }
  }

  sendEmail = () => this.props.sendEmail(this.state.email)

  completedView = () => {
    return (
      <div className="password-reset completed">
        <Image as="h1" src={logo_image} title="Resily" />

        <Segment raised compact padded="very">
          {this.state.email} にメールを送信しました。<br />
          メールが届かない場合はアドレスを確かめて送信し直してください。
        </Segment>

        <Message className="password-reset__link" size="small">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    )
  }

  render() {
    if (this.props.isCompleted) {
      return this.completedView()
    }
    return (
      <div className="password-reset">
        <Image as='h1' src={logo_image} title='Resily' />

        <Message content="パスワードを再設定するためのメールを送信します。" />

        <Segment raised compact padded="very">
          <Form>
            <Form.Input
              inline
              label="メールアドレス"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@example.com"
              icon="mail"
              iconPosition="left"
              onChange={(e, { value }) => this.setState({ email: value })}
              defaultValue={this.props.email}
            />
          </Form>
        </Segment>

        <Button positive className="password-reset__submit" content="送信する" onClick={this.sendEmail} />

        <Message className="password-reset__link" size="small">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

PasswordResetPage.propTypes = {
  // container
  email: PropTypes.string,
  isCompleted: PropTypes.bool.isRequired,
  sendEmail: PropTypes.func.isRequired,
  // component
}

export default PasswordResetPage
