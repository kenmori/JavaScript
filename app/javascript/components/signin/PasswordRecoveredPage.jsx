import React, { PureComponent } from 'react';
import { Image, Segment, Message } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordRecoveredPage extends PureComponent {
  render() {
    return (
      <div className="password-recover completed">
        <Image as="h1" src={logo_image} title="Resily" />

        <Segment raised compact padded="very">
          入力されたメールアドレスにメールを送信しました。<br />
          メールが届かない場合はアドレスを確かめて送信し直してください。
        </Segment>

        <Message className="password-recover__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

PasswordRecoveredPage.propTypes = {
  // container
  // component
}

export default PasswordRecoveredPage
