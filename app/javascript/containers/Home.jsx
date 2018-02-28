import Home from '../components/Home';
import { connect } from 'react-redux';
import { hashids, OKR_TYPE_ID } from '../utils/hashids';
import history from '../utils/history';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import currentActions from '../actions/current';
import { denormalizeObjective, denormalizeObjectives, denormalizeKeyResults } from "../schemas";

const mapStateToProps = (state, { match: { params } }) => {
  const objectiveIds = state.objectives.get('ids');
  const fetchedObjectiveId = state.objectives.get('fetchedObjective');
  const allKeyResults = denormalizeKeyResults(state.keyResults.get('allIds'), state.entities);
  const [okrTypeId, okrId] = hashids.decode(params.okrHash);
  let objectiveId = okrTypeId === OKR_TYPE_ID.OBJECTIVE ? okrId : null;
  const keyResultId = okrTypeId === OKR_TYPE_ID.KEY_RESULT ? okrId : null;
  const okrType = okrTypeId === OKR_TYPE_ID.OBJECTIVE ? 'objective' : okrTypeId === OKR_TYPE_ID.KEY_RESULT ? 'keyResult' : null;
  
  if (!allKeyResults.isEmpty() && !!keyResultId) {
    const targetKeyResults = allKeyResults.find(item => item.get('id') === keyResultId);
    if(targetKeyResults) {
      objectiveId = targetKeyResults.get('objectiveId')
    } else {
      history.push('/');
    }
  }

  return {
    okrType,
    objectiveId,
    keyResultId,
    hasOkrHashId: params.okrHash,
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    objectiveIds: objectiveIds,
    objectives: denormalizeObjectives(objectiveIds, state.entities),
    keyResults: denormalizeKeyResults(state.keyResults.get('ids'), state.entities),
    isFetched: state.objectives.get('isFetched'),
    fetchedObjectiveId: fetchedObjectiveId,
    fetchedObjective: fetchedObjectiveId && denormalizeObjective(fetchedObjectiveId, state.entities),
    entities: state.entities,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOkrs: (okrPeriodId, userId, withAllKeyResults) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, withAllKeyResults));
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
