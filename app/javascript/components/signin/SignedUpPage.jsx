import React, { PureComponent } from 'react';
import { Image, Segment, Message } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class SignedUpPage extends PureComponent {
  render() {
    return (
      <div className="sign-up completed">
        <Image as="h1" src={logo_image} title="Resily"/>

        <Segment raised compact padded="very">
          入力されたメールアドレスに確認メールを送信しました。<br/>
          メール中の URL がクリックされると処理が完了します。
        </Segment>

        <Message className="sign-up__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

SignedUpPage.propTypes = {
  // container
  // component
}

export default SignedUpPage
