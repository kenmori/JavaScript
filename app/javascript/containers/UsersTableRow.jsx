import UsersTableRow from '../components/setting/UsersTableRow'
import { connect } from 'react-redux'
import organizationActions from '../actions/organization'
import userActions from '../actions/users'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  return {
    organizationId: state.organization.get('current').get('id'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOrganizationOwner: (organizationId, user) => {
      dispatch(organizationActions.updateOrganizationOwner(organizationId, user.get('id')))
    },
    disableUser: user => {
      dispatch(userActions.disableUser(user.get('id'), !user.get('disabled')))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTableRow)
