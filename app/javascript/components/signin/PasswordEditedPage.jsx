import React, { PureComponent } from 'react';
import { Image, Segment, Message } from 'semantic-ui-react';
import logo_image from '../../images/logo_large.png';

class PasswordEditedPage extends PureComponent {
  render() {
    return (
      <div className="password-edit complete">
        <Image as="h1" src={logo_image} title="Resily" />

        <Segment raised compact padded="very">
          アカウントに新しいパスワードを再設定しました。
        </Segment>

        <Message className="password-edit__link">
          <p><a href="/">トップに戻る</a></p>
        </Message>
      </div>
    );
  }
}

PasswordEditedPage.propTypes = {
  // container
  // component
}

export default PasswordEditedPage
