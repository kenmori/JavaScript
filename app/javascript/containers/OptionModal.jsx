import OptionModal from '../components/modal/OptionModal'
import { connect } from 'react-redux'
import loginUserActions from '../actions/loginUser'
import dialogActions from '../actions/dialogs'

const mapStateToProps = state => {
  return {
    isOpen: state.dialogs.getIn(['option', 'isOpen']),
    userSetting: state.loginUser.get('userSetting'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserSetting: userSetting => {
      dispatch(loginUserActions.updateUserSetting(userSetting))
    },
    closeModal: () => {
      dispatch(dialogActions.closeOptionModal())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionModal)
