import KeyResultFormModal from '../components/KeyResultFormModal';
import { connect } from 'react-redux';
import actions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  return {
    isOpen: state.dialogs.getIn(['keyResultForm', 'isOpen']),
    objective: state.dialogs.getIn(['keyResultForm', 'objective']),
    users: state.users,
    okrPeriodId: state.current.get('okrPeriodId'),
    okrPeriods: state.okrPeriods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addKeyResult: (keyResult) => {
      dispatch(actions.addKeyResult(keyResult, this.currentUserId));
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