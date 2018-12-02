import CommentModal from '../components/modal/CommentModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'
import keyResultActions from '../actions/keyResults'

const mapStateToProps = state => {
  const comment = state.dialogs.get('comment')
  console.log({comment})
  return {
    isOpen: comment.get('isOpen'),
    commentLabel: comment.get('commentLabel')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    },
    closeModal: () => {
      dispatch(dialogActions.closeCommentModal())
    },
    updateKeyResult: keyResult => {
      dispatch(keyResultActions.updateKeyResult(keyResult))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModal)
