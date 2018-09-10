import AccountSettingTab from '../components/setting/AccountSettingTab'
import { connect } from 'react-redux'
import loginUserActions from '../actions/loginUser'
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
    openImageModal: (id, data) => {
      dispatch(dialogActions.openImageModal(id, data))
    },
    deleteAvatar: id => {
      dispatch(userActions.updateUser({id, removeAvatar: true}))
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    },
    updateUserSetting: userSetting => {
      dispatch(loginUserActions.updateUserSetting(userSetting))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingTab)
