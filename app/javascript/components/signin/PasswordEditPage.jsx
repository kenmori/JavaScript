import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Image, Segment, Message } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordEditPage extends PureComponent {

  constructor() {
    super()
    this.state = {
      password: '',
      passwordConfirmation: '', // null だとバリデーション対象から外れるため空文字列を指定する
    }
  }

  editPassword = () => this.props.editPassword(this.state.password, this.state.passwordConfirmation, this.props.token)  

  render() {
    return (
      <div className="password-edit">
        <Image as="h1" src={logo_image} title="Resily" />

        <Message content="アカウントに再設定する新しいパスワードを入力してください。" />

        <Segment raised compact padded="very">
          <Form className="password-edit__form">
            <Form.Input
              inline
              label="新しいパスワード"
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
              label="新しいパスワード (確認用)"
              type="password"
              placeholder="英数字8文字以上"
              icon="lock"
              iconPosition="left"
              onChange={(e, { value }) => this.setState({ passwordConfirmation: value })}
            />
          </Form>
        </Segment>

        <Button positive className="password-edit__submit" content="再設定する" onClick={this.editPassword} />

        <Message className="password-edit__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

PasswordEditPage.propTypes = {
  // container
  token: PropTypes.string.isRequired,
  editPassword: PropTypes.func.isRequired,
  // component
}

export default PasswordEditPage
