import Fetcher from '../components/Fetcher'
import { connect } from 'react-redux'
import organizationActions from '../actions/organization'
import objectiveActions from '../actions/objectives'
import currentActions from '../actions/current'
import dialogActions from '../actions/dialogs'
import { getOkrId } from '../utils/linker'

const mapStateToProps = state => {
  return {
    organizationId: state.organization.getIn(['current', 'id']),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    isFetchedOrganization: state.organization.get('isFetched'),
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganization: id => {
      dispatch(organizationActions.fetchOrganization(id))
    },
    fetchOkrs: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, true))
    },
    selectOkrPeriod: okrHash => {
      const { objectiveId, keyResultId } = getOkrId(okrHash)
      dispatch(currentActions.selectOkrPeriodByOkr(objectiveId, keyResultId))
    },
    openOkrModal: okrHash => {
      const { objectiveId, keyResultId } = getOkrId(okrHash)
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId))
    },
    closeOkrModal: () => {
      dispatch(dialogActions.closeOkrModal())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fetcher)
