import OkrCard from '../components/map/OkrCard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  const selectedOkr = state.objectives.get('selectedOkr');
  return {
    selectedObjectiveId: selectedOkr.get('objectiveId'),
    selectedKeyResultId: selectedOkr.get('keyResultId'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrCard);
