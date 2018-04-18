import Dashboard from '../components/dashboard/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import userActions from '../actions/users';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";
import { canMoveObjective } from "../utils/okr";

const mapStateToProps = state => {
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  return {
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    canMoveObjective: canMoveObjective(state),
    selectedObjectiveId: state.objectives.get('selectedId'),
    objectives: denormalizeObjectives(state.objectives.get('ids'), state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    fetchedObjectiveId,
    fetchedObjective: fetchedObjectiveId && denormalizeObjective(fetchedObjectiveId, state.entities),
    entities: state.entities,
    isAdmin: state.loginUser.get('isAdmin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withAll) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, withAll));
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
    updateObjectiveOrder: (user) => {
      dispatch(userActions.updateUser(user, false))
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
