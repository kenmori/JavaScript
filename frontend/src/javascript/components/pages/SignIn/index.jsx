import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, Image, Segment, Message } from "semantic-ui-react";
import DocumentTitle from "react-document-title";
import DefaultLayout from "../../templates/DefaultLayout";
import logo_image from "../../../images/logo_large.png";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  signIn = () =>
    this.props.signIn(
      this.state.email,
      this.state.password,
      this.props.location.state,
    );

  render() {
    return (
      <DefaultLayout>
        <DocumentTitle title="ログイン - Resily">
          {this.renderBody()}
        </DocumentTitle>
      </DefaultLayout>
    );
  }

  renderBody() {
    const { email } = this.state;
    return (
      <div className="sign-in">
        <Image as="h1" src={logo_image} title="Resily" />
        <Segment raised compact padded="very">
          <Form className="sign-in__form">
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
            />
            <Form.Input
              inline
              label="パスワード"
              type="password"
              name="current-password"
              autoComplete="current-password"
              placeholder="英数字8文字以上"
              icon="lock"
              iconPosition="left"
              onChange={(e, { value }) => this.setState({ password: value })}
            />
          </Form>
        </Segment>
        <Button
          positive
          className="sign-in__submit"
          content="ログインする"
          onClick={this.signIn}
        />
        <Message className="sign-in__link" size="small">
          <p>
            <Link to={{ pathname: "/users/password/reset", state: { email } }}>
              パスワードを忘れた方はこちら
            </Link>
          </p>
        </Message>
      </div>
    );
  }
}

SignIn.propTypes = {
  // container
  signIn: PropTypes.func.isRequired,
  // component
};

export default SignIn;
