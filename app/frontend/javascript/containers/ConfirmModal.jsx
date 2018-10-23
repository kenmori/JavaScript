import ConfirmModal from '../components/modal/ConfirmModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  const confirm = state.dialogs.get('confirm')
  return {
    isOpen: confirm.get('isOpen'),
    content: confirm.get('content'),
    onCancel: confirm.get('onCancel'),
    onConfirm: confirm.get('onConfirm')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(dialogActions.closeConfirmModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmModal)
