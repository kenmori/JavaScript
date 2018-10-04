import InfoPane from '../components/okrmodal/InfoPane'
import { connect } from 'react-redux'
import keyResultActions from '../actions/keyResults'

const mapStateToProps = (state, { keyResult }) => {
  return {
    isKeyResultOwner: keyResult.getIn(['owner', 'id']) === state.loginUser.get('id'),
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
)(InfoPane)
