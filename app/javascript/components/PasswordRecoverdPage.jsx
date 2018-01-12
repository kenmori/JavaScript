import React, { Component } from 'react';

export default class PasswordRecoverdPage extends Component {
  render() {
    return (
      <div className="password-recoverd">
        <main className="main-content">
          <h1>Resily</h1>
          <p>
            入力されたメールアドレスにメールを送信しました。<br />
            メールが届かない場合はアドレスを確かめて送信し直してください。
          </p>
          <p><a href="/">トップに戻る</a></p>
        </main>
      </div>
    );
  }
}
