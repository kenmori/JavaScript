import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Input } from 'semantic-ui-react';

export default class SignUpCompletedPage extends Component {
  render() {
    return (
      <div className="sign-up-completed">
        <main className="main-content">
          指定のメールアドレスへ確認のメールを送信いたしました。<br />
          確認のメールにありますURLをクリックすると、登録が完了いたします。
        </main>
      </div>
    );
  }
}
