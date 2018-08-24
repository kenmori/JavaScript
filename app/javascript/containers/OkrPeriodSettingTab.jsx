import OkrPeriodSettingTab from '../components/setting/OkrPeriodSettingTab'
import { connect } from 'react-redux'
import okrPeriodActions from '../actions/okrPeriods'
import dialogActions from '../actions/dialogs'

const mapStateToProps = (state) => {
  return {
    okrPeriods: state.okrPeriods,
    okrPeriodId: state.current.get('okrPeriodId'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.updateOkrPeriod(okrPeriod))
    },
    removeOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.removeOkrPeriod(okrPeriod))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodSettingTab)
