import ObjectiveCommentModal from '../components/modal/ObjectiveCommentModal'
import { connect } from 'react-redux'
import dialogActions from '../actions/dialogs'
import objectiveActions from '../actions/objectives'

const mapStateToProps = state => {
  const objectiveComment = state.dialogs.get('objectiveComment')
  return {
    isOpen: objectiveComment.get('isOpen'),
    commentLabel: objectiveComment.get('commentLabel')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params))
    },
    closeModal: () => {
      dispatch(dialogActions.closeObjectiveCommentModal())
    },
    updateObjective: objective => {
      dispatch(objectiveActions.updateObjective(objective))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveCommentModal)
