import OkrCard from '../components/map/OkrCard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    currentObjectiveId: state.objectives.get('selectedId'),
    currentKeyResultId: state.keyResults.get('selectedId'),
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
