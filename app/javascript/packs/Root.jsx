import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import configureStore from '../stores/index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
import SignUpPage from '../containers/SignUpPage';
import SignUpCompletedPage from '../containers/SignUpCompletedPage';
import PasswordRecoverPage from '../containers/PasswordRecoverPage';
import PasswordRecoverdPage from '../containers/PasswordRecoverdPage';
import PasswordEditPage from '../containers/PasswordEditPage';
import PasswordEditedPage from '../containers/PasswordEditedPage';
import SignInPage from '../containers/SignInPage';
import SettingsPage from '../components/SettingsPage';
import Loading from '../containers/Loading';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path='/users/sign_up' component={SignUpPage}/>
            <Route exact path='/users/sign_up/completed' component={SignUpCompletedPage}/>
            <Route exact path='/users/password/recover' component={PasswordRecoverPage}/>
            <Route exact path='/users/password/recover/completed' component={PasswordRecoverdPage}/>
            <Route exact path='/users/password/edit' component={PasswordEditPage}/>
            <Route exact path='/users/password/edit/completed' component={PasswordEditedPage}/>
            <Route exact path='/users/sign_in' component={SignInPage}/>
            <Route exact path='/settings' component={SettingsPage}/>
            <Route path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
        <Loading />
      </div>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
