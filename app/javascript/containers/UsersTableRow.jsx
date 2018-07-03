import UsersTableRow from '../components/setting/UsersTableRow'
import { connect } from 'react-redux'
import organizationActions from '../actions/organizations'

const mapStateToProps = state => {
  return {
    organizationId: state.organizations.get('selected').get('id'),
    ownerId: state.organizations.get('selected').get('ownerId'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOrganizationOwner: (organizationId, user) => {
      dispatch(organizationActions.updateOrganizationOwner(organizationId, user.get('id')))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTableRow)
