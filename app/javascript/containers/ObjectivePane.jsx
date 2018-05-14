import ObjectivePane from '../components/okrmodal/ObjectivePane'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    isAdmin: state.loginUser.get('isAdmin'),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectivePane)
