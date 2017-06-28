import OKRSettingPage from '../components/OKRSettingPage';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    keyResults: state.keyResults,
    objectives: state.objectives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch: () => {
      dispatch(objectiveActions.fetchObjectives());
    },
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OKRSettingPage);