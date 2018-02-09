import OkrCard from '../components/map/OkrCard';
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
    openOkrModal: (objectiveId, selectedOkr) => {
      dispatch(dialogActions.openOkrModal(objectiveId, selectedOkr));
    },
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);
