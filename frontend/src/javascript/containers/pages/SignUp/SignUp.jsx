import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Input,
  Image,
  Segment,
  Message,
} from "semantic-ui-react";
import moment from "moment";
import logo_image from "../../../images/logo_large.png";
import DatePicker from "../../../components/form/DatePicker";
import OkrSpanSelect from "../../../components/form/OkrSpanSelect";
import LoginLayout from "../../../components/layouts/LoginLayout";

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    const startDate = moment().startOf("month");
    const okrSpan = 3;
    this.state = {
      organizationName: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      startDate,
      endDate: this.getEndDate(startDate, okrSpan),
      endDateChanged: false,
      okrSpan,
    };
  }

  getEndDate = (startDate, okrSpan) =>
    startDate
      .clone()
      .add(okrSpan, "months")
      .subtract(1, "days");

  addOrganization = () => {
    this.props.addOrganization(
      {
        name: this.state.organizationName,
        okrSpan: this.state.okrSpan,
      },
      {
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password,
        admin: true,
      },
      {
        startDate: this.state.startDate.format("YYYY-MM-DD"),
        endDate: this.state.endDate.format("YYYY-MM-DD"),
      },
    );
  };

  completedView = () => (
    <div className="sign-in">
      <Image as="h1" src={logo_image} title="Resily" />

      <Segment raised compact padded="very">
        {this.state.email} に確認メールを送信しました。
        <br />
        メール中の URL がクリックされると処理が完了します。
      </Segment>

      <Message className="sign-in__link" size="small">
        <p>
          <a href="/login">トップに戻る</a>
        </p>
      </Message>
    </div>
  );

  render() {
    return (
      <LoginLayout title="新規ユーザー登録">{this.renderBody()}</LoginLayout>
    );
  }

  renderBody() {
    const { hasValidToken, isCompleted } = this.props;
    if (!hasValidToken) {
      return <Redirect to="/login" />;
    }
    if (isCompleted) {
      return this.completedView();
    }
    return (
      <div className="sign-in">
        <Image as="h1" src={logo_image} title="Resily" />

        <Segment raised compact padded="very">
          <Form className="sign-in__form">
            <Form.Group>
              <Form.Input
                inline
                label="組織名"
                name="organization"
                autoComplete="organization"
                placeholder="会社名やチーム名など"
                icon="building"
                iconPosition="left"
                onChange={(e, { value }) =>
                  this.setState({ organizationName: value })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Field inline>
                <label>管理者</label>
                <Input
                  className="last-name"
                  name="family-name"
                  autoComplete="family-name"
                  placeholder="姓"
                  onChange={(e, { value }) =>
                    this.setState({ lastName: value })
                  }
                />
                <Input
                  className="first-name"
                  name="given-name"
                  autoComplete="family-name"
                  placeholder="名"
                  onChange={(e, { value }) =>
                    this.setState({ firstName: value })
                  }
                />
              </Form.Field>
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
            </Form.Group>

            <Form.Group>
              <Form.Field inline>
                <label>OKR 期間</label>
                <DatePicker
                  dateFormat="YYYY/M/D"
                  locale="ja"
                  selected={this.state.startDate}
                  onChange={date => {
                    const startDate = date || this.state.startDate;
                    if (this.state.endDateChanged) {
                      this.setState({ startDate });
                    } else {
                      // 終了日をユーザーが変更していない場合、計算し直す
                      this.setState({
                        startDate,
                        endDate: this.getEndDate(startDate, this.state.okrSpan),
                      });
                    }
                  }}
                />
                <span className="sign-in__between">-</span>
                <DatePicker
                  dateFormat="YYYY/M/D"
                  locale="ja"
                  selected={this.state.endDate}
                  onChange={date => {
                    const endDate = date || this.state.endDate;
                    this.setState({ endDate, endDateChanged: true });
                  }}
                />
              </Form.Field>
              <OkrSpanSelect
                value={this.state.okrSpan}
                inForm
                onChange={okrSpan => {
                  if (this.state.endDateChanged) {
                    this.setState({ okrSpan });
                  } else {
                    // 終了日をユーザーが変更していない場合、計算し直す
                    this.setState({
                      okrSpan,
                      endDate: this.getEndDate(this.state.startDate, okrSpan),
                    });
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Segment>

        <Button
          positive
          className="sign-in__submit"
          content="登録する"
          onClick={this.addOrganization}
        />

        <Message className="sign-in__link" size="small">
          <p>
            <a href="/login">トップに戻る</a>
          </p>
        </Message>
      </div>
    );
  }
}

SignUp.propTypes = {
  // container
  hasValidToken: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  addOrganization: PropTypes.func.isRequired,
  // component
};

export default SignUp;
