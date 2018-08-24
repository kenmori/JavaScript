import UserAvatar from '../components/util/UserAvatar'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    openAvatarModal: (targetId, imageData) => {
      dispatch(dialogActions.openAvatarModal(targetId, imageData))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatar)
