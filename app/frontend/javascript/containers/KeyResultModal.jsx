import KeyResultModal from '../components/keyresultmodal/KeyResultModal'
import { connect } from 'react-redux'
import actions from '../actions/keyResults'
import dialogActions from '../actions/dialogs'
import { getEnabledUsers } from '../utils/selector'

const mapStateToProps = (state) => {
  const currentOkrPeriodId = state.current.get('okrPeriodId')
  const currentOkrPeriod = state.okrPeriods.find(period => period.get('id') === currentOkrPeriodId)
  return {
    isOpen: state.dialogs.getIn(['keyResultForm', 'isOpen']),
    objective: state.dialogs.getIn(['keyResultForm', 'objective']),
    users: getEnabledUsers(state),
    initialExpiredDate: currentOkrPeriod && currentOkrPeriod.get('endDate'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addKeyResult: keyResult => {
      dispatch(actions.addKeyResult(keyResult))
    },
    closeModal: () => {
      dispatch(dialogActions.closeKeyResultModal())
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultModal)
