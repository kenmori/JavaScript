import UserAvatar from '../components/util/UserAvatar'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    openImageModal: (id, data) => {
      dispatch(dialogActions.openImageModal(id, data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatar)
