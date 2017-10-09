import { combineReducers } from 'redux';
import keyResults from './keyReuslts';
import objectives from './objectives';
import users from './users';
import okrSettings from './okrSettings';
import dialogs from './dialogs';
import loginUser from './loginUser';
import okrPeriod from './okrPeriod';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  okrSettings,
  dialogs,
  loginUser,
  okrPeriod
});

export default reducers;
