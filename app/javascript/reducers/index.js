import { combineReducers } from 'redux';
import keyResults from './keyReuslts';
import objectives from './objectives';
import users from './users';
import okrSettings from './okrSettings';
import dialogs from './dialogs';
import loginUser from './loginUser';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  okrSettings,
  dialogs,
  loginUser
});

export default reducers;
