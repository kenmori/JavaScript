import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Image, Segment, Message } from 'semantic-ui-react'
import logo_image from '../../images/logo_large.png'

class PasswordSetPage extends PureComponent {

  constructor() {
    super()
    this.state = {
      password: '',
      passwordConfirmation: '', // null だとバリデーション対象から外れるため空文字列を指定する
    }
  }

  setPassword = () => this.props.setPassword(this.state.password, this.state.passwordConfirmation, this.props.token)

  render() {
    return (
      <div className="password-set">
        <Image as="h1" src={logo_image} title="Resily" />

        <Message content="アカウントに設定するパスワードを入力してください。" />

        <Segment raised compact padded="very">
          <Form className="password-set__form">
            <Form.Input
              inline
              label="パスワード"
              type="password"
              name="new-password"
              autoComplete="new-password"
              placeholder="英数字8文字以上"
              icon="lock"
              iconPosition="left"
              onChange={(e, { value }) => this.setState({ password: value })}
            />

            <Form.Input
              inline
              label="パスワード (確認用)"
              type="password"
              placeholder="英数字8文字以上"
              icon="lock"
              iconPosition="left"
              onChange={(e, { value }) => this.setState({ passwordConfirmation: value })}
            />
          </Form>
        </Segment>

        <Button positive className="password-set__submit" content="設定する" onClick={this.setPassword} />

        <Message className="password-set__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    )
  }
}

PasswordSetPage.propTypes = {
  // container
  token: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  // component
}

export default PasswordSetPage
