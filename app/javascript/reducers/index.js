import { combineReducers } from 'redux';
import keyResults from './keyResults';
import objectives from './objectives';
import users from './users';
import okrSettings from './okrSettings';
import dialogs from './dialogs';
import loginUser from './loginUser';
import okrPeriod from './okrPeriod';
import signUp from './signUp';
import password from './password';
import loading from './loading';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  okrSettings,
  dialogs,
  loginUser,
  okrPeriod,
  signUp,
  password,
  loading,
});

export default reducers;
