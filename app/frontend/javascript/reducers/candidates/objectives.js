import { Map } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../../constants/actionTypes'

function merge(state, { payload }) {
  const objectives = payload.getIn(['entities', 'objectives'])
  if (!objectives) return state
  return state.mergeWith(
    (oldVal, newVal) => oldVal.merge(newVal),
    objectives.mapKeys(key => parseInt(key)) // normalize により id が string になるため int へ変換する
  )
}

export default handleActions(
  {
    [ActionTypes.FETCHED_OBJECTIVE_CANDIDATES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      state = merge(state, { payload })
      const objectiveId = payload.get('result').first()
      return state.delete(objectiveId)
    },
    [ActionTypes.DISABLED_OBJECTIVE]: merge,
    [ActionTypes.DISABLED_KEY_RESULT]: merge
  },
  Map()
)
