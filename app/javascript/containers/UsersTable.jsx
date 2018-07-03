import UsersTable from '../components/setting/UsersTable'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    ownerId: state.organizations.get('selected').get('ownerId'),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable)
