import AccountSettingTab from '../components/setting/AccountSettingTab'
import { connect } from 'react-redux'
import userActions from '../actions/users'
import dialogActions from '../actions/dialogs'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(userActions.updateUser(user))
    },
    updateEmail: (id, email) => {
      dispatch(userActions.updateUser({ id, email }))
    },
    updatePassword: user => {
      dispatch(userActions.updatePassword(user))
    },
    openAvatarModal: (targetId, imageData) => {
      dispatch(dialogActions.openAvatarModal(targetId, imageData))
    },
    deleteAvatar: id => {
      dispatch(userActions.updateUser({id, removeAvatar: true}))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab)
