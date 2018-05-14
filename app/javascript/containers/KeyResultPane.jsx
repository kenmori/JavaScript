import KeyResultPane from '../components/okrmodal/KeyResultPane'
import { connect } from 'react-redux'

const mapStateToProps = (state, { keyResult }) => {
  return {
    isKeyResultOwner: keyResult.get('owner').get('id') === state.loginUser.get('id'),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultPane)
