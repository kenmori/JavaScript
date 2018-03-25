import Home from '../components/Home';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import userActions from '../actions/users';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state, { match: { params } }) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  const currentUser = state.users.find((u) => u.get('id') === state.current.get('userId'));
  return {
    okrHash: params.okrHash,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    isSelectedLoginUser: state.current.get('userId') === state.loginUser.get('id'),
    objectiveOrder: currentUser ? currentUser.get('objectiveOrder') : null,
    objectiveIds: objectiveIds,
    objectives: denormalizeObjectives(objectiveIds, state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetched: state.objectives.get('isFetched'),
    fetchedObjectiveId,
    fetchedObjective: fetchedObjectiveId && denormalizeObjective(fetchedObjectiveId, state.entities),
    entities: state.entities,
    isAdmin: state.loginUser.get('isAdmin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withAllKeyResults) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, withAllKeyResults));
    },
    openOkrModal: (objectiveId, keyResultId) => {
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
    },
    closeOkrModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
    },
    updateUserObjectiveOrder: (user) => {
      dispatch(userActions.updateUser(user, false))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
