import Home from '../components/Home';
import { connect } from 'react-redux';
import { getOkrId } from '../utils/linker';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const getOkrModalState = (params) => {
  const {
    okrHash,
    keyResultId,
    entities,
    isOpenOkrModal,
    isOpenErrorModal,
  } = params;
  let objectiveId = params.objectiveId;
  let hasKeyResultToOpen = false;

  if (!okrHash) {
    return {
      isVoid: true
    }
  }

  if (keyResultId) {
    hasKeyResultToOpen = entities.keyResults.has(keyResultId);
    if(hasKeyResultToOpen) {
      objectiveId = entities.keyResults.getIn([keyResultId, 'objectiveId']);
    }
  }

  return { 
    ...params,
    objectiveId,
    isInvalidOkr: !objectiveId && !keyResultId,
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  const { objectiveId, keyResultId } = getOkrId(params.okrHash);
  
  const okrModalState = getOkrModalState({
    okrType: objectiveId ? 'objective' : (keyResultId ? 'keyResult' : null),
    objectiveId,
    keyResultId,
    okrHash: params.okrHash,
    entities: state.entities,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
    isOpenErrorModal: state.dialogs.getIn(['error', 'isOpen']),
  });

  return {
    okrModalState,
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
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
    fetchObjective: (objectiveId) => {
      dispatch(objectiveActions.fetchObjective(objectiveId));
    },
    fetchKeyResult: (keyResultId) => {
      dispatch(keyResultActions.fetchKeyResult(keyResultId));
    },
    openOkrModal: (objectiveId, keyResultId) => {
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
    },
    openErrorModal: (messages) => {
      dispatch(dialogActions.openErrorModal(messages))
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal());
    },
    changeCurrentOkr: objectiveId => {
      dispatch(currentActions.changeCurrentOkr(objectiveId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
