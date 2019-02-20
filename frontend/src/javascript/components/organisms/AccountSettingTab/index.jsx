import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Tab, Button, Input, Radio } from "semantic-ui-react";
import UserAvatar from "../../../containers/UserAvatar";
import AutoInput from "../../form/AutoInput";

class AccountSettingTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: props.loginUser.get("email") };
  }

  handleLastNameCommit = lastName =>
    this.props.updateUser({ id: this.props.loginUser.get("id"), lastName });

  handleFistNameCommit = firstName =>
    this.props.updateUser({ id: this.props.loginUser.get("id"), firstName });

  changeEmail = email => {
    this.setState({ email });
    this.props.confirm({
      content: `${email} に確認メールを送信します。メール中の URL がクリックされると処理が完了します。メールアドレスを変更しますか？`,
      onConfirm: () =>
        this.props.updateEmail(this.props.loginUser.get("id"), email),
      onCancel: () =>
        this.setState({ email: this.props.loginUser.get("email") }),
    });
  };

  changePassword = () => {
    this.props.updatePassword({
      id: this.props.loginUser.get("id"),
      currentPassword: this.currentPasswordInput.inputRef.value,
      password: this.passwordInput.inputRef.value,
      passwordConfirmation: this.passwordConfirmationInput.inputRef.value,
    });

    this.currentPasswordInput.inputRef.value = "";
    this.passwordInput.inputRef.value = "";
    this.passwordConfirmationInput.inputRef.value = "";
  };

  changeAvatarImage = event => {
    if (!event.target.files.length) {
      return;
    }
    this.props.openImageModal(
      this.props.loginUser.get("id"),
      event.target.files[0],
    );
    event.target.value = null;
  };

  clickFileInput = () => this.refs.fileInput.click();

  deleteAvatar = () => {
    this.props.confirm({
      content: "設定済みのアイコンを削除しますか？",
      onConfirm: () => this.props.deleteAvatar(this.props.loginUser.get("id")),
    });
  };

  updateNotifyEmail = (e, { checked, value }) => {
    this.props.updateUserSetting({ notifyRemindEmailEnabled: checked });
  };

  render() {
    const { loginUser } = this.props;
    const { email } = this.state;
    return (
      <Tab.Pane className="account-setting-tab">
        <dl>
          <dt>名前</dt>
          <dd>
            <AutoInput
              value={loginUser.get("lastName")}
              onCommit={this.handleLastNameCommit}
            />
            <AutoInput
              value={loginUser.get("firstName")}
              onCommit={this.handleFistNameCommit}
            />
          </dd>

          <dt>メールアドレス</dt>
          <dd>
            <AutoInput
              value={email}
              placeholder="name@example.com"
              onCommit={this.changeEmail}
            />
          </dd>

          <dt>メール通知</dt>
          <dd>
            <Radio
              className="green"
              toggle
              name="status"
              checked={loginUser
                .get("userSetting")
                .get("notifyRemindEmailEnabled")}
              onChange={this.updateNotifyEmail}
            />
          </dd>

          <dt>アバター</dt>
          <dd>
            <UserAvatar
              user={loginUser}
              size="huge"
              withInitial={false}
              editable
            />
          </dd>
          <dd>
            <input
              type="file"
              className="file-input"
              ref="fileInput"
              onChange={this.changeAvatarImage}
            />
            <Button content="変更する" positive onClick={this.clickFileInput} />
            {loginUser.get("avatarUrl") && (
              <Button content="削除する" negative onClick={this.deleteAvatar} />
            )}
          </dd>
        </dl>

        <dl>
          <dt>現在のパスワード</dt>
          <dd>
            <Input
              type="password"
              placeholder="英数字8文字以上"
              ref={node => {
                this.currentPasswordInput = node;
              }}
            />
          </dd>
          <dt>新しいパスワード</dt>
          <dd>
            <Input
              type="password"
              placeholder="英数字8文字以上"
              ref={node => {
                this.passwordInput = node;
              }}
            />
          </dd>
          <dt>新しいパスワード (確認用)</dt>
          <dd>
            <Input
              type="password"
              placeholder="英数字8文字以上"
              ref={node => {
                this.passwordConfirmationInput = node;
              }}
            />
          </dd>
          <dd>
            <Button
              content="パスワードを変更する"
              onClick={this.changePassword}
            />
          </dd>
        </dl>
      </Tab.Pane>
    );
  }
}

AccountSettingTab.propTypes = {
  // container
  loginUser: ImmutablePropTypes.map.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  openImageModal: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  updateUserSetting: PropTypes.func.isRequired,
  // component
};

export default AccountSettingTab;
