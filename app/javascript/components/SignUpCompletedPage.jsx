import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Input } from 'semantic-ui-react';

export default class SignUpCompletedPage extends Component {
  render() {
    return (
      <div className="sign-up-completed">
        <main className="main-content">
          <h1>Resily</h1>
          <p>
            入力されたメールアドレスに確認メールを送信しました。<br />
            メール中の URL がクリックされると処理が完了します。
          </p>
          <p><a href="/">トップに戻る</a></p>
        </main>
      </div>
    );
  }
}
