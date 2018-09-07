import ImageModal from '../components/modal/ImageModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'
import usersActions from '../actions/users'
import organizationActions from '../actions/organization'

const mapStateToProps = state => {
  return {
    isOpen: state.dialogs.getIn(['image', 'isOpen']),
    id: state.dialogs.getIn(['image', 'id']),
    data: state.dialogs.getIn(['image', 'data']),
    isAvatar: state.dialogs.getIn(['image', 'type']) === 'avatar',
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateImage: (id, image, isAvatar) => {
      if (isAvatar) {
        dispatch(usersActions.updateUser({ id, avatar: image }))
      } else {
        dispatch(organizationActions.updateOrganization({ id, logo: image }))
      }
    },
    closeModal: () => {
      dispatch(dialogActions.closeImageModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageModal)
