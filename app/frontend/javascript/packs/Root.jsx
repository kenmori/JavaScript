import 'babel-polyfill'
import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker.min.css'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/default.css'
import '../../stylesheet/application'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Home from '../containers/Home'
import configureStore from '../stores/index'
import { Router, Switch, Route } from 'react-router-dom'
import history from '../utils/history'
import ReactGA from '../utils/ga'
import SignUpPage from '../containers/SignUpPage'
import PasswordResetPage from '../containers/PasswordResetPage'
import PasswordSetPage from '../containers/PasswordSetPage'
import SignInPage from '../containers/SignInPage'
import SettingsPage from '../containers/SettingsPage'
import Loading from '../containers/Loading'
import Toast from '../containers/Toast'
import ErrorModal from '../containers/ErrorModal'
import ConfirmModal from '../containers/ConfirmModal'

const store = configureStore()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})

document.addEventListener('DOMContentLoaded', () => {
  const bodyElement = document.createElement('div')
  bodyElement.setAttribute('id', 'body')

  ReactDOM.render(
    <Provider store={store}>
      <div id='root'>
        <Router history={history}>
          <Switch>
            <Route exact path='/users/sign_up' component={SignUpPage}/>
            <Route exact path='/users/password/reset' component={PasswordResetPage}/>
            <Route exact path='/users/password/edit' component={PasswordSetPage}/>
            <Route exact path='/users/confirmation' component={PasswordSetPage}/>
            <Route exact path='/users/sign_in' component={SignInPage}/>
            <Route exact path='/settings' component={SettingsPage}/>
            <Route exact path='/settings/:name' component={SettingsPage}/>
            <Route exact path='/okr/:okrHash' component={Home}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>
        <Loading />
        <Toast />
        <ErrorModal />
        <ConfirmModal />
      </div>
    </Provider>,
    document.body.appendChild(bodyElement),
  )
})
