import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import configureStore from '../stores/index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
import SignInPage from '../containers/SignInPage';
import SettingsPage from '../components/SettingsPage';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/users/sign_in' component={SignInPage}/>
          <Route exact path='/settings' component={SettingsPage}/>
          <Route path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
