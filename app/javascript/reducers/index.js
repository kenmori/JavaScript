import { combineReducers } from 'redux';
import keyResults from './keyReuslts';
import objectives from './objectives';
import users from './users';
import dialogs from './dialogs';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  dialogs
});

export default reducers;