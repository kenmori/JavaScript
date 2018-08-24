import React from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import SortableComponent from '../util/SortableComponent'
import UsersTableRow from '../../containers/UsersTableRow'

class UsersTable extends SortableComponent {

  static NUMBER_TO_DISPLAY = 50

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      activePage: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps)
    this.setState({
      activePage: this.props.keyword !== nextProps.keyword ? 1 : this.state.activePage,
    })
  }

  updateUser = id => values => this.props.onUpdateUser({ id, ...values })

  changeEmail = id => email => {
    this.props.confirm({
      content: `${email} に確認メールを送信します。メール中の URL がクリックされると処理が完了します。メールアドレスを変更しますか？`,
      onConfirm: () => this.props.onUpdateEmail(id, email),
      onCancel: () => this.forceUpdate(), // 入力内容を破棄する
    })
  }

  resendEmail = user => {
    this.props.confirm({
      content: `${user.get('email')} に確認メールを再送信しますか？`,
      onConfirm: () => this.props.onResendEmail(user.get('id')),
    })
  }

  getFilteredUsers = (users, keyword) => {
    if (!keyword) return users
    keyword = keyword.toLowerCase()
    return users.filter(user => user.get('searchText').includes(keyword))
  }

  handlePageChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const { users, activePage } = this.state
    const filteredUsers = this.getFilteredUsers(users, this.props.keyword)
    const begin = (activePage - 1) * UsersTable.NUMBER_TO_DISPLAY
    const end = Math.min(filteredUsers.size, activePage * UsersTable.NUMBER_TO_DISPLAY)
    const totalPages = Math.ceil(filteredUsers.size / UsersTable.NUMBER_TO_DISPLAY)
    return (
      <div className="users-table">
        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={this.isSorted('index')} onClick={this.handleSort('index')} textAlign='center' />
              <Table.HeaderCell disabled />
              <Table.HeaderCell sorted={this.isSorted('lastName')} onClick={this.handleSort('lastName')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('email')} onClick={this.handleSort('email')}>
                メールアドレス
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('isAdmin')} onClick={this.handleSort('isAdmin')}>
                権限
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('isOwner')} onClick={this.handleSort('isOwner')}>
                代表者
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('signInAt')} onClick={this.handleSort('signInAt')}>
                最終ログイン
              </Table.HeaderCell>
              <Table.HeaderCell disabled />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredUsers.slice(begin, end).map(user => {
              const id = user.get('id')
              return (
                <UsersTableRow
                  key={id}
                  user={user}
                  isLoginUser={id === this.props.loginUserId}
                  updateUser={this.updateUser(id)}
                  changeEmail={this.changeEmail(id)}
                  resendEmail={this.resendEmail}
                />
              )
            })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>{`${begin + 1} - ${end} / ${filteredUsers.size} 人`}</Table.HeaderCell>
              <Table.HeaderCell colSpan='5' textAlign='right'>
                {totalPages > 0 && (
                  <Pagination
                    activePage={activePage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={totalPages}
                    prevItem={activePage === 1 ? null : undefined}
                    nextItem={activePage === totalPages ? null : undefined}
                    onPageChange={this.handlePageChange}
                  />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}

UsersTable.propTypes = {
  // container
  // component
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number,
  onUpdateUser: PropTypes.func,
  onUpdateEmail: PropTypes.func,
  onResendEmail: PropTypes.func,
  confirm: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
}

UsersTable.defaultProps = {
  key: 'users',
}

export default UsersTable
