import { combineReducers } from 'redux';
import keyResults from './keyReuslts';
import objectives from './objectives';
import users from './users';
import settings from './settings';
import dialogs from './dialogs';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  settings,
  dialogs
});

export default reducers;