import { combineReducers } from 'redux'
import keyResults from './keyResults'
import objectives from './objectives'

const reducers = combineReducers({
  keyResults,
  objectives
})

export default reducers
