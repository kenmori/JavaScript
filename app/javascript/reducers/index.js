import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import entities from './entities';
import candidates from './candidates';
import objectives from './objectives';
import keyResults from './keyResults';
import users from './users';
import dialogs from './dialogs';
import loginUser from './loginUser';
import current from './current';
import organization from './organization';
import okrPeriods from './okrPeriods';
import devise from './devise';
import loading from './loading';
import toasts from './toasts';

const reducers = combineReducers({
  form: formReducer,
  entities,
  candidates,
  objectives,
  keyResults,
  users,
  dialogs,
  loginUser,
  current,
  organization,
  okrPeriods,
  devise,
  loading,
  toasts,
});

export default reducers;
