import KeyResultFormModal from '../components/KeyResultFormModal';
import { connect } from 'react-redux';
import actions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import userActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['keyResultForm', 'isOpen']),
    objective: state.dialogs.getIn(['keyResultForm', 'objective']),
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addKeyResult: (keyResult) => {
      dispatch(actions.addKeyResult(keyResult));
    },
    closeModal: () => {
      dispatch(dialogActions.closeKeyResultFormModal());
    },
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyResultFormModal);