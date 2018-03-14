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
    fetchedObjectiveId,
    fetchedKeyResultId,
    allObjectives,
    allKeyResults,
    isFetchingObjective,
    isFetchingKeyResult,
    currentObjectiveId,
    currentKeyResultId,
    isOpenOkrModal,
    isOpenErrorModal,
  } = params;
  let objectiveId = params.objectiveId;
  let isRemovedObjective = false;
  let objectiveIdOfRemovedKeyResult = null;
  let needFetchingObjective = false
  let needFetchingKeyResult = false;
  let targetObjective = null;
  let targetKeyResults = null;
  
  const hasOkrModalResource = okrHash && !allObjectives.isEmpty() && !allKeyResults.isEmpty();
  const isFetchingResources = hasOkrModalResource && (isFetchingKeyResult || isFetchingObjective);

  if (!hasOkrModalResource || isFetchingResources) {
    return {
      isVoid: true
    }
  }

  if (keyResultId) {
    targetKeyResults = allKeyResults.find(item => item.get('id') === keyResultId);
    if(targetKeyResults) {
      objectiveId = targetKeyResults.get('objectiveId')
    } else {
      needFetchingKeyResult = !fetchedKeyResultId && !isFetchingKeyResult;
      objectiveIdOfRemovedKeyResult = keyResultId === currentKeyResultId ? currentObjectiveId : null;
    }
  }

  if (objectiveId) {
    targetObjective = allObjectives.find(item => item.get('id') === objectiveId);
    needFetchingObjective = !targetObjective && !fetchedObjectiveId && !isFetchingObjective;
    isRemovedObjective = objectiveId === currentObjectiveId && !targetObjective;
  }

  return { 
    ...params,
    objectiveId,
    needFetchingObjective,
    needFetchingKeyResult,
    isRemovedObjective,
    objectiveIdOfRemovedKeyResult,
    canDisplayOkrModal: !!(targetObjective || (keyResultId && targetKeyResults)),
    isInvalidOkr: (!objectiveId && !keyResultId) || fetchedObjectiveId === -1 || fetchedKeyResultId === -1,
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  const fetchedObjective = fetchedObjectiveId > 0 && denormalizeObjective(fetchedObjectiveId, state.entities);
  const { objectiveId, keyResultId } = getOkrId(params.okrHash);
  
  const okrModalState = getOkrModalState({
    okrType: objectiveId ? 'objective' : (keyResultId ? 'keyResult' : null),
    objectiveId,
    keyResultId,
    fetchedObjectiveId,
    okrHash: params.okrHash,
    allObjectives: denormalizeObjectives(state.objectives.get('allIds'), state.entities),
    allKeyResults: denormalizeKeyResults(state.keyResults.get('allIds'), state.entities),
    fetchedKeyResultId: state.keyResults.get('fetchedKeyResult'),
    isFetchingObjective: state.objectives.get('isFetchingObjective'),
    isFetchingKeyResult: state.keyResults.get('isFetchingKeyResult'),
    currentObjectiveId: state.dialogs.getIn(['okrForm', 'objectiveId']),
    currentKeyResultId: state.dialogs.getIn(['okrForm', 'keyResultId']),
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
    fetchedObjective,
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
    resetObjective: () => {
      dispatch(objectiveActions.resetObjective());
    },
    resetKeyResult: () => {
      dispatch(keyResultActions.resetKeyResult());
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
