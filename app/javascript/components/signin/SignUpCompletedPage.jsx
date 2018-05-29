import React, { PureComponent } from 'react';
import { Image } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class SignUpCompletedPage extends PureComponent {
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

SignUpCompletedPage.propTypes = {
  // container
  // component
}

export default SignUpCompletedPage
