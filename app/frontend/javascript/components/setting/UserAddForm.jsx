import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

class UserAddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      admin: false,
    };
  }

  handleAddClick = () => {
    const { firstName, lastName, email, admin } = this.state;
    const addUser = skipNotification => () => {
      this.props.addUser({
        firstName,
        lastName,
        email,
        admin,
        skipNotification,
      });
      this.setState({ firstName: "", lastName: "", email: "" }); // admin はリセットしない
    };
    this.props.confirm({
      content: `${email} に確認メールを送信しますか？メール中の URL がクリックされると処理が完了します。確認メールはあとから再送信できます。`,
      onConfirm: addUser(false),
      onCancel: addUser(true),
    });
  };

  handleFirstNameChange = (e, { value }) => this.setState({ firstName: value });

  handleLastNameChange = (e, { value }) => this.setState({ lastName: value });

  handleEmailChange = (e, { value }) => this.setState({ email: value });

  handleAdminChange = (e, { checked }) => this.setState({ admin: checked });

  render() {
    const { firstName, lastName, email, admin } = this.state;
    return (
      <Form className="user-add-form">
        <Form.Group inline>
          <label>名前</label>
          <Form.Input
            value={lastName}
            maxLength="255"
            placeholder="姓"
            onChange={this.handleLastNameChange}
          />
          <Form.Input
            value={firstName}
            maxLength="255"
            placeholder="名"
            onChange={this.handleFirstNameChange}
          />
        </Form.Group>

        <Form.Input
          inline
          label="メールアドレス"
          type="email"
          value={email}
          maxLength="255"
          placeholder="name@example.com"
          onChange={this.handleEmailChange}
        />

        <Form.Checkbox
          label="管理者"
          checked={admin}
          onChange={this.handleAdminChange}
        />

        <Form.Button
          icon="plus"
          content="追加する"
          onClick={this.handleAddClick}
          disabled={!email}
        />
      </Form>
    );
  }
}

UserAddForm.propTypes = {
  // container
  // component
  addUser: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default UserAddForm;
