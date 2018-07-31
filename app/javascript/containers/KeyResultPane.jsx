import KeyResultPane from '../components/okrmodal/KeyResultPane'
import { connect } from 'react-redux'
import keyResultActions from '../actions/keyResults'

const mapStateToProps = (state, { keyResult }) => {
  return {
    isKeyResultOwner: keyResult.get('owner').get('id') === state.loginUser.get('id'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disableKeyResult: keyResult => {
      dispatch(keyResultActions.disableKeyResult(keyResult.get('id'), !keyResult.get('disabled')))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultPane)
