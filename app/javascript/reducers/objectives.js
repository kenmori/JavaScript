import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, objectiveId, isNew) {
  return state
    .update('ids', ids => ids.includes(objectiveId) ? ids : ids.insert(0, objectiveId))
    .update('selectedOkr', selectedOkr => isNew ? selectedOkr.merge({ objectiveId, keyResultId: null }) : selectedOkr);
}

function remove(state, objectiveId) {
  const objectiveIds = state.get('ids').filter(id => id !== objectiveId);
  const index = state.get('ids').indexOf(objectiveId);
  return state
    .set('ids', objectiveIds)
    .update('selectedOkr', selectedOkr => {
      const isRemoved = selectedOkr.get('objectiveId') === objectiveId;
      return isRemoved
        ? selectedOkr.merge({ objectiveId: objectiveIds.get(index, objectiveIds.last()), keyResultId: null })
        : selectedOkr;
    });
}

function addToCandidates(state, objectiveId) {
  return state.update('candidates', ids => ids.insert(0, objectiveId));
}

function removeFromCandidates(state, objectiveId) {
  return state.update('candidates', ids => ids.filter(id => id !== objectiveId));
}

export default handleActions({
    [ActionTypes.FETCH_OBJECTIVE]: state => {
      return state.set('isFetchedObjective', false);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: state => {
      return state.set('isFetchedObjective', true);
    },
    [ActionTypes.FETCH_OBJECTIVES]: (state, { payload }) => {
      return state.set('isFetchedObjectives', false);
    },
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      const objectiveIds = payload.get('result');
      return state
        .set('ids', objectiveIds)
        .mergeIn(['selectedOkr'], { objectiveId: objectiveIds.first(), keyResultId: null })
        .set('isFetchedObjectives', true);
    },
    [ActionTypes.FETCH_OBJECTIVE_CANDIDATES]: state => {
      return state.set('isFetchedCandidates', false);
    },
    [ActionTypes.FETCHED_OBJECTIVE_CANDIDATES]: (state, { payload }) => {
      return state.set('candidates', payload.get('result')).set('isFetchedCandidates', true);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      state = addToCandidates(state, objectiveId);

      const userId = payload.get('currentUserId');
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      return isMine ? add(state, objectiveId, payload.get('isNew')) : state;
    },
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      return isMine ? add(state, objectiveId) : remove(state, objectiveId);
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      state = removeFromCandidates(state, objectiveId);
      return remove(state, objectiveId);
    },
    [ActionTypes.UPDATED_USER]: (state, { payload }) => {
      let objectiveOrder = payload.user.get('objectiveOrder');
      if (!objectiveOrder) return state;
      objectiveOrder = JSON.parse(objectiveOrder);
      return state.update('ids', ids => ids.sortBy(id => objectiveOrder.indexOf(id)));
    },
    [ActionTypes.SELECT_OKR]: (state, { payload }) => {
      const { objectiveId, keyResultId } = payload;
      return state.mergeIn(['selectedOkr'], { objectiveId, keyResultId });
    },
  },
  fromJS({
    ids: [],
    candidates: [],
    selectedOkr: { objectiveId: null, keyResultId: null },
    isFetchedObjective: true,
    isFetchedObjectives: false,
    isFetchedCandidates: false,
  }),
);
