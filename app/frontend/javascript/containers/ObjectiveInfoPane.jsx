import ObjectiveInfoPane from '../components/okrmodal/ObjectiveInfoPane'
import { connect } from 'react-redux'
import objectiveActions from '../actions/objectives'

const mapStateToProps = state => {
  return {
    isAdmin: state.loginUser.get('isAdmin'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disableObjective: objective => {
      dispatch(objectiveActions.disableObjective(objective.get('id'), !objective.get('disabled')))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveInfoPane)
