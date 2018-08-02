import Fetcher from '../components/Fetcher'
import { connect } from 'react-redux'
import organizationActions from '../actions/organizations'
import objectiveActions from '../actions/objectives'

const mapStateToProps = state => {
  return {
    organizationId: state.organizations.get('selected').get('id'),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    isFetchedOrganization: state.organizations.get('isFetched'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganization: id => {
      dispatch(organizationActions.fetchOrganization(id))
    },
    fetchOkrs: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fetcher)
