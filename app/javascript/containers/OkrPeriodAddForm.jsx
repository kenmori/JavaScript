import OkrPeriodAddForm from '../components/setting/OkrPeriodAddForm'
import { connect } from 'react-redux'
import okrPeriodActions from '../actions/okrPeriods'

const mapStateToProps = (state) => {
  const organization = state.organization.get('current')
  return {
    organizationId: organization.get('id'),
    okrSpan: organization.get('okrSpan'),
    okrPeriods: state.okrPeriods,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOkrPeriod: okrPeriod => {
      dispatch(okrPeriodActions.addOkrPeriod(okrPeriod))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrPeriodAddForm)
