import { combineReducers } from 'redux';
import keyResults from './keyReuslts';
import objectives from './objectives';
import dialogs from './dialogs';

const reducers = combineReducers({
  keyResults,
  objectives,
  dialogs
});

export default reducers;