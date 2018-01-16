import OkrCard from '../components/OkrMap/OkrCard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    currentObjectiveId: state.current.get('objectiveId'),
    currentKeyResultId: state.current.get('keyResultId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openOkrFormModal: (objectiveId, selectedOkr) => {
      dispatch(dialogActions.openOkrFormModal(objectiveId, selectedOkr));
    },
    openKeyResultFormModal: (objective) => {
      dispatch(dialogActions.openKeyResultFormModal(objective));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);
