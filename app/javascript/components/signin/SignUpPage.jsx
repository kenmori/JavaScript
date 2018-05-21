import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, Input, Select, Image, Divider } from 'semantic-ui-react';
import moment from 'moment';
import logo_image from '../../images/logo_large.png';
import DatePicker from '../form/DatePicker';

class SignUpPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('month'),
      endDate: moment().add(2, 'months').endOf('month'),
      endDateChanged: false,
      okrSpan: 3
    };
  }

  addUser = () => {
    this.props.addUser({
      last_name: this.lastNameInput.inputRef.value,
      first_name: this.firstNameInput.inputRef.value,
      email: this.emailInput.inputRef.value,
      password: this.passwordInput.inputRef.value,
      admin: true,
      organization_name: this.organizationInput.inputRef.value,
      organization_uniq_name: this.organizationUniqNameInput.inputRef.value,
      month_start: this.state.startDate.format('YYYY/MM/DD'),
      month_end: this.state.endDate.format('YYYY/MM/DD'),
      okr_span: this.state.okrSpan
    })
  }
  componentWillUpdate(props = this.props) {
    if (props.isCompleted) {
      props.history.push(props.signUpCompleted)
    }
  }
  render() {
    return (
      <div className="sign-up">
        <main className='center'>
          <Image as='h1' src={logo_image} title='Resily' />
          <Form className="user-form">
            <Form.Group className='text-input-group'>
              <Form.Field inline>
                <div>組織名</div>
                <Input
                  type='text'
                  size='mini'
                  placeholder='会社名やチーム名など'
                  ref={(node) => { this.organizationInput = node; }}
                  onBlur={() => {
                    let organization = this.organizationInput.inputRef.value;
                    if (organization.length && !this.organizationUniqNameInput.inputRef.value.length) {
                      this.organizationUniqNameInput.inputRef.value = organization.match(/[a-z0-9_-]+/gi).join('').toLowerCase();
                    }
                  }}
                />
              </Form.Field>
              <Form.Field inline>
                <div>組織ID</div>
                <Input type='text' size='mini' placeholder='英数字、ハイフン、アンダースコア' ref={(node) => { this.organizationUniqNameInput = node; }} />
              </Form.Field>
              <Divider hidden />
              <Form.Field inline>
                <div>管理者</div>
                <Input type='text' className='last-name' size='mini' placeholder='姓' ref={(node) => { this.lastNameInput = node; }} />
                <Input type='text' className='first-name' size='mini' placeholder='名' ref={(node) => { this.firstNameInput = node; }} />
              </Form.Field>
              <Form.Field inline>
                <div>メールアドレス</div>
                <Input
                  type='email'
                  size='mini'
                  placeholder='name@example.com'
                  ref={(node) => { this.emailInput = node; }}
                  onBlur={() => {
                    let email = this.emailInput.inputRef.value;
                    if (email.length && !this.organizationUniqNameInput.inputRef.value.length) {
                      let orgName = email.includes('@') ? email.split('@').slice(1).join('') : email;
                      this.organizationUniqNameInput.inputRef.value = orgName.replace(/\./g, '').toLowerCase();
                    }
                  }}
                />
              </Form.Field>
              <Form.Field inline>
                <div>パスワード</div>
                <Input type='password' size='mini' placeholder='英数字8文字以上' ref={(node) => { this.passwordInput = node; }} />
              </Form.Field>
              <Divider hidden />
              <Form.Field inline>
                <div>開始日</div>
                <DatePicker
                  dateFormat="YYYY/M/D"
                  locale="ja"
                  selected={this.state.startDate}
                  onChange={(date) => {
                    if (this.state.endDateChanged) {
                      this.setState({
                        startDate: date
                      })
                    } else {
                      // 終了日をユーザーが変更していない場合、計算し直す
                      const endDate = date.clone().add(this.state.okrSpan, 'months').subtract(1, 'days');
                      this.setState({
                        startDate: date,
                        endDate
                      });
                    }
                  }}
                />
              </Form.Field>
              <Form.Field inline>
                <div>終了日</div>
                <DatePicker
                  dateFormat="YYYY/M/D"
                  locale="ja"
                  selected={this.state.endDate}
                  onChange={(date) => {
                    this.setState({
                      endDate: date,
                      endDateChanged: true
                    })
                  }}
                />
              </Form.Field>
              <Form.Field inline>
                <div>OKR 周期</div>
                <Select
                  defaultValue={this.state.okrSpan}
                  options={[
                    { key: 1, value: 1, text: '1ヶ月間' },	
                    { key: 3, value: 3, text: '3ヶ月間' },	
                    { key: 6, value: 6, text: '半年間' },	
                    { key: 12, value: 12, text: '1年間' }
                  ]}
                  onChange={(event, data) => {
                    const okrSpan = data.value;
                    if (this.state.endDateChanged) {
                      this.setState({ okrSpan });
                    } else {
                      // 終了日をユーザーが変更していない場合、計算し直す
                      const endDate = this.state.startDate.clone().add(okrSpan, 'months').subtract(1, 'days');
                      this.setState({
                        okrSpan,
                        endDate
                      });
                    }
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Divider hidden />
            <div>
              <Button positive onClick={this.addUser}>登録する</Button>
            </div>
          </Form>
        </main>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  // container
  signUpCompleted: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  addUser: PropTypes.func.isRequired,
  // component
}

export default SignUpPage