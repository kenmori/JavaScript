import React, { PureComponent } from 'react';
import { Image, Segment } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class SignUpCompletedPage extends PureComponent {
  render() {
    return (
      <div className="sign-up-completed">
        <Image as="h1" src={logo_image} title="Resily"/>

        <Segment raised compact padded="very">
          入力されたメールアドレスに確認メールを送信しました。<br/>
          メール中の URL がクリックされると処理が完了します。
        </Segment>

        <p className="link"><a href="/">トップに戻る</a></p>
      </div>
    );
  }
}

SignUpCompletedPage.propTypes = {
  // container
  // component
}

export default SignUpCompletedPage
