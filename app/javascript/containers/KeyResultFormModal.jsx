import KeyResultFormModal from '../components/KeyResultFormModal';
import { connect } from 'react-redux';
import actions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['keyResultForm', 'isOpen']),
    objective: state.dialogs.getIn(['keyResultForm', 'objective'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addKeyResult: (objectiveId, name) => {
      dispatch(actions.addKeyResult(objectiveId, name));
    },
    closeModal: () => {
      dispatch(dialogActions.closeKeyResultFormModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultFormModal);