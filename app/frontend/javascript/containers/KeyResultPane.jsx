import KeyResultPane from '../components/okrmodal/KeyResultPane'
import { connect } from 'react-redux'

const mapStateToProps = (state, { keyResult }) => {
  return {
    isKeyResultOwner: keyResult.getIn(['owner', 'id']) === state.loginUser.get('id'),
  }
}

export default connect(
  mapStateToProps
)(KeyResultPane)
