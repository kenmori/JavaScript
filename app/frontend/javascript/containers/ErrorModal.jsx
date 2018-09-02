import ErrorModal from '../components/modal/ErrorModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = (state) => {
  const error = state.dialogs.get('error')
  return {
    isOpen: error.get('isOpen'),
    message: error.get('message'),
    onClose: error.get('onClose'),
    onCloseBefore: error.get('onCloseBefore'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(dialogActions.closeErrorModal())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal)
