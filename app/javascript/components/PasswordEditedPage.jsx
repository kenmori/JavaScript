import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PasswordEditedPage extends Component {
  render() {
    return (
      <div className="password-edited">
        <main className="main-content">
          パスワードを変更しました<br />
          <a href="/">ホーム</a>
        </main>
      </div>
    );
  }
}
