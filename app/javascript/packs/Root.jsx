import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Home from '../containers/Home';
import configureStore from '../stores/index';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
import SignUpPage from '../containers/SignUpPage';
import SignUpCompletedPage from '../components/signin/SignUpCompletedPage';
import PasswordRecoverPage from '../containers/PasswordRecoverPage';
import PasswordRecoverdPage from '../components/signin/PasswordRecoverdPage';
import PasswordEditPage from '../containers/PasswordEditPage';
import PasswordEditedPage from '../components/signin/PasswordEditedPage';
import SignInPage from '../containers/SignInPage';
import SettingsPage from '../containers/SettingsPage';
import Loading from '../containers/Loading';
import Toast from '../containers/Toast';
import ErrorModal from '../containers/ErrorModal';
import Confirm from '../containers/Confirm';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div id='root'>
        <Router history={history}>
          <Switch>
            <Route exact path='/users/sign_up' component={SignUpPage}/>
            <Route exact path='/users/sign_up/completed' component={SignUpCompletedPage}/>
            <Route exact path='/users/password/recover' component={PasswordRecoverPage}/>
            <Route exact path='/users/password/recover/completed' component={PasswordRecoverdPage}/>
            <Route exact path='/users/password/edit' component={PasswordEditPage}/>
            <Route exact path='/users/password/edit/completed' component={PasswordEditedPage}/>
            <Route exact path='/users/sign_in' component={SignInPage}/>
            <Route exact path='/settings' component={SettingsPage}/>
            <Route exact path='/settings/:name' component={SettingsPage}/>
            <Route exact path='/okr/objectives/:objectiveId' component={Home}/>
            <Route exact path='/okr/objectives/:objectiveId/keyResults/:keyResultId' component={Home}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
        <Loading />
        <Toast />
        <ErrorModal />
        <Confirm />
      </div>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
