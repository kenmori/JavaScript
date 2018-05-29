import React, { PureComponent } from 'react';
import { Image } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordEditedPage extends PureComponent {
  render() {
    return (
      <div className="password-edited">
        <main className="main-content">
          <Image as='h1' src={logo_image} title='Resily' />
          <p>アカウントに新しいパスワードを再設定しました。</p>
          <p><a href="/">トップに戻る</a></p>
        </main>
      </div>
    );
  }
}

PasswordEditedPage.propTypes = {
  // container
  // component
}

export default PasswordEditedPage
