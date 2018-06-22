import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Input, Checkbox, Button } from 'semantic-ui-react'

class UserAddForm extends PureComponent {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      admin: false,
    }
  }

  handleAddClick = () => {
    const { firstName, lastName, email, admin } = this.state
    const addUser = skipNotification => () => {
      this.props.addUser({ firstName, lastName, email, admin, skipNotification })
      this.setState({ firstName: '', lastName: '', email: '' }) // admin はリセットしない
    }
    this.props.confirm({
      content: `${email} に確認メールを送信しますか？メール中の URL がクリックされると処理が完了します。確認メールはあとから再送信できます。`,
      onConfirm: addUser(false),
      onCancel: addUser(true),
    })
  }

  handleFirstNameChange = (e, { value }) => this.setState({ firstName: value })

  handleLastNameChange = (e, { value }) => this.setState({ lastName: value })

  handleEmailChange = (e, { value }) => this.setState({ email: value })

  handleAdminChange = (e, { checked }) => this.setState({ admin: checked })

  render() {
    const { firstName, lastName, email, admin } = this.state
    return (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                value={lastName}
                maxLength="255"
                placeholder="姓"
                onChange={this.handleLastNameChange}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={firstName}
                maxLength="255"
                placeholder="名"
                onChange={this.handleFirstNameChange}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                type="email"
                value={email}
                maxLength="255"
                placeholder="name@example.com"
                onChange={this.handleEmailChange}
              />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                label='管理者'
                checked={admin}
                onChange={this.handleAdminChange}
              />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Button icon="plus" content="追加する" onClick={this.handleAddClick} disabled={!email} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

UserAddForm.propTypes = {
  // container
  // component
  addUser: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
}

export default UserAddForm
