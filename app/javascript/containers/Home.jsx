import Home from '../components/Home';
import { connect } from 'react-redux';
import { hashids, OKR_TYPE_ID } from '../utils/hashids';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const getOkrModalStatuses = (params) => {
  const {
    okrId,
    keyResultId,
    fetchedObjectiveId,
    okrHash,
    allObjectives,
    allKeyResults,
    fetchedKeyResultId,
    isFetchingKeyResult,
    isFetchingObjective,
    currentObjectiveId,
    isOpenOkrModal,
    isOpenErrorModal,
  } = params;
  let objectiveIdOfRemovedKeyResult = false;
  let isRemovedObjective = false;
  let objectiveId = params.objectiveId;
  let canDisplayOkrModal;
  let needFetchKeyResult;
  let needFetchObjective;
  let targetObjective = null;
  let targetKeyResults = null;
  
  const hasOkrModalResource = okrHash && !allObjectives.isEmpty() && !allKeyResults.isEmpty();
  if (!hasOkrModalResource) {
    return { hasOkrModalResource };
  }

  if (keyResultId) {
    targetKeyResults = allKeyResults.find(item => item.get('id') === keyResultId);
    needFetchKeyResult = !targetKeyResults && !fetchedKeyResultId && !isFetchingKeyResult;
    if(targetKeyResults) {
      objectiveId = targetKeyResults.get('objectiveId')
    }
    // if(targetKeyResults) {
    //   objectiveId = targetKeyResults.get('objectiveId')
    // } else {
    //   objectiveIdOfRemovedKeyResult = currentObjectiveId
    // }
  }

  if (objectiveId) {
    targetObjective = allObjectives.find(item => item.get('id') === objectiveId);
    needFetchObjective = !targetObjective && !fetchedObjectiveId && !isFetchingObjective;
  }
  // isRemovedObjective = objectiveId && objectiveId === currentObjectiveId && !fetchedObjective;
  // cannotDisplayOkrModal = !targetObjective || (keyResultId && !targetKeyResults);
  canDisplayOkrModal = !!(targetObjective || (keyResultId && targetKeyResults));

  const isInvalidOkr = !okrId || fetchedObjectiveId === -1 || fetchedKeyResultId === -1;

  return { 
    ...params,
    objectiveId,
    isInvalidOkr,
    hasOkrModalResource,
    needFetchKeyResult,
    needFetchObjective,
    canDisplayOkrModal,
    isRemovedObjective,
    objectiveIdOfRemovedKeyResult,
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  const fetchedObjective = fetchedObjectiveId > 0 && denormalizeObjective(fetchedObjectiveId, state.entities);
  const [okrTypeId, okrId] = hashids.decode(params.okrHash);
  
  const okrModalStatuses = getOkrModalStatuses({
    okrId,
    okrType: okrTypeId === OKR_TYPE_ID.OBJECTIVE ? 'objective' : okrTypeId === OKR_TYPE_ID.KEY_RESULT ? 'keyResult' : null,
    keyResultId: okrTypeId === OKR_TYPE_ID.KEY_RESULT ? okrId : null,
    objectiveId: okrTypeId === OKR_TYPE_ID.OBJECTIVE ? okrId : null,
    fetchedObjectiveId,
    okrHash: params.okrHash,
    allObjectives: denormalizeObjectives(state.objectives.get('allIds'), state.entities),
    allKeyResults: denormalizeKeyResults(state.keyResults.get('allIds'), state.entities),
    fetchedKeyResultId: state.keyResults.get('fetchedKeyResult'),
    isFetchingKeyResult: state.keyResults.get('isFetchingKeyResult'),
    isFetchingObjective: state.objectives.get('isFetchingObjective'),
    currentObjectiveId: state.dialogs.getIn(['okrForm', 'objectiveId']),
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
    isOpenErrorModal: state.dialogs.getIn(['error', 'isOpen']),
  });

  return {
    okrModalStatuses,
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    objectiveIds: objectiveIds,
    objectives: denormalizeObjectives(objectiveIds, state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetched: state.objectives.get('isFetched'),
    fetchedObjectiveId,
    fetchedObjective,
    entities: state.entities,
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
    resetKeyResult: () => {
      dispatch(keyResultActions.resetKeyResult());
    },
    resetObjective: () => {
      dispatch(objectiveActions.resetObjective());
    },
    openErrorModal: (messages) => {
      dispatch(dialogActions.openErrorModal(messages))
    },
    openOkrModal: (objectiveId, okrType) => {
      dispatch(dialogActions.openOkrModal(objectiveId, okrType));
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
