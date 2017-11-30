import { combineReducers } from 'redux';
import keyResults from './keyResults';
import objectives from './objectives';
import users from './users';
import okrSettings from './okrSettings';
import dialogs from './dialogs';
import loginUser from './loginUser';
import organization from './organization';
import okrPeriod from './okrPeriod';
import okrPeriods from './okrPeriods';
import signUp from './signUp';
import password from './password';
import loading from './loading';
import userSetting from './userSetting';

const reducers = combineReducers({
  keyResults,
  objectives,
  users,
  okrSettings,
  dialogs,
  loginUser,
  organization,
  okrPeriod,
  okrPeriods,
  signUp,
  password,
  loading,
  userSetting,
});

export default reducers;
