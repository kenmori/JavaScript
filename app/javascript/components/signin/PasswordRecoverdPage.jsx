import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

export default class PasswordRecoverdPage extends Component {
  render() {
    return (
      <div className="password-recoverd">
        <main className="main-content">
          <Image as='h1' src={logo_image} title='Resily' />
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
