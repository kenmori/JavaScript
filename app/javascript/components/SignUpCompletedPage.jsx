import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import logo_image from '../images/logo_large.png';

export default class SignUpCompletedPage extends Component {
  render() {
    return (
      <div className="sign-up-completed">
        <main className="main-content">
          <Image as='h1' src={logo_image} title='Resily' />
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
