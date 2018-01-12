import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PasswordEditedPage extends Component {
  render() {
    return (
      <div className="password-edited">
        <main className="main-content">
          <h1>Resily</h1>
          <p>アカウントに新しいパスワードを再設定しました。</p>
          <p><a href="/">トップに戻る</a></p>
        </main>
      </div>
    );
  }
}
