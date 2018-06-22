import OptionModal from '../components/modal/OptionModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  return {
    isOpen: state.dialogs.getIn(['option', 'isOpen']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(dialogActions.closeOptionModal())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionModal)
