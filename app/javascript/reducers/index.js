import { combineReducers } from 'redux';
import entities from './entities';
import objectiveIds from './objectiveIds';
import users from './users';
import okrSettings from './okrSettings';
import dialogs from './dialogs';
import loginUser from './loginUser';
import menu from './menu';
import organizations from './organizations';
import okrPeriods from './okrPeriods';
import signUp from './signUp';
import password from './password';
import loading from './loading';

const reducers = combineReducers({
  entities,
  objectiveIds,
  users,
  okrSettings,
  dialogs,
  loginUser,
  menu,
  organizations,
  okrPeriods,
  signUp,
  password,
  loading,
});

export default reducers;
