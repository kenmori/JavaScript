import OkrCard from '../components/OkrMap/OkrCard';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  return {
    objectives: denormalizeObjectives(state.objectives.get('items'), state.entities),
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
