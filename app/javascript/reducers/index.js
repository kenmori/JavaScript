import { combineReducers } from 'redux';
import entities from './entities';
import objectives from './objectives';
import keyResults from './keyResults';
import users from './users';
import dialogs from './dialogs';
import loginUser from './loginUser';
import current from './current';
import organizations from './organizations';
import okrPeriods from './okrPeriods';
import signUp from './signUp';
import password from './password';
import loading from './loading';

const reducers = combineReducers({
  entities,
  objectives,
  keyResults,
  users,
  dialogs,
  loginUser,
  current,
  organizations,
  okrPeriods,
  signUp,
  password,
  loading,
});

export default reducers;
