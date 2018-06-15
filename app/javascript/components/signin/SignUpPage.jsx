import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Image, Segment, Message } from 'semantic-ui-react';
import moment from 'moment';
import logo_image from '../../images/logo_large.png';
import DatePicker from '../form/DatePicker';

class SignUpPage extends PureComponent {

  constructor(props) {
    super(props);
    const startDate = moment().startOf('month')
    const okrSpan = 3
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

  componentWillUpdate(props = this.props) {
    if (props.isCompleted) {
      props.history.push(props.signUpCompleted)
    }
  }

  getEndDate = (startDate, okrSpan) => {
    return startDate.clone().add(okrSpan, 'months').subtract(1, 'days')
  }

  addOrganization = () => {
    this.props.addOrganization({
      name: this.state.organizationName,
      okrSpan: this.state.okrSpan,
    }, {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      admin: true,
    }, {
      monthStart: this.state.startDate.format('YYYY-MM-DD'),
      monthEnd: this.state.endDate.format('YYYY-MM-DD'),
    })
  }

  render() {
    return (
      <div className="sign-up">
        <Image as="h1" src={logo_image} title="Resily"/>

        <Segment raised compact padded="very">
          <Form>
            <Form.Group>
              <Form.Input
                inline
                label="組織名"
                name="organization"
                autoComplete="organization"
                placeholder="会社名やチーム名など"
                icon="building"
                iconPosition="left"
                onChange={(e, { value }) => this.setState({ organizationName: value })}
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
                  onChange={(e, { value }) => this.setState({ lastName: value })}
                />
                <Input
                  className="first-name"
                  name="given-name"
                  autoComplete="family-name"
                  placeholder="名"
                  onChange={(e, { value }) => this.setState({ firstName: value })}
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
                    const startDate = date || this.state.startDate
                    if (this.state.endDateChanged) {
                      this.setState({ startDate })
                    } else {
                      // 終了日をユーザーが変更していない場合、計算し直す
                      this.setState({
                        startDate,
                        endDate: this.getEndDate(startDate, this.state.okrSpan),
                      })
                    }
                  }}
                />
                <span className="between">-</span>
                <DatePicker
                  dateFormat="YYYY/M/D"
                  locale="ja"
                  selected={this.state.endDate}
                  onChange={date => {
                    const endDate = date || this.state.endDate
                    this.setState({ endDate, endDateChanged: true })}
                  }
                />
              </Form.Field>
              <Form.Select
                inline
                label="OKR 周期"
                defaultValue={this.state.okrSpan}
                options={[
                  { key: 1, value: 1, text: '1ヶ月間' },
                  { key: 3, value: 3, text: '3ヶ月間' },
                  { key: 6, value: 6, text: '半年間' },
                  { key: 12, value: 12, text: '1年間' }
                ]}
                onChange={(event, data) => {
                  const okrSpan = data.value
                  if (this.state.endDateChanged) {
                    this.setState({ okrSpan })
                  } else {
                    // 終了日をユーザーが変更していない場合、計算し直す
                    this.setState({
                      okrSpan,
                      endDate: this.getEndDate(this.state.startDate, okrSpan),
                    })
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Segment>

        <Button positive className="sign-up__submit" content="登録する" onClick={this.addOrganization} />

        <Message className="sign-up__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  // container
  signUpCompleted: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  addOrganization: PropTypes.func.isRequired,
  // component
}

export default SignUpPage
