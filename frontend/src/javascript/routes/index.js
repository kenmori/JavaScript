import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "../containers/Home";
import SignUpPage from "../containers/SignUpPage";
import PasswordResetPage from "../containers/PasswordResetPage";
import PasswordSetPage from "../containers/PasswordSetPage";
import SignInPage from "../containers/SignInPage";
import SettingsPage from "../containers/SettingsPage";
import MeetingPage from "../containers/MeetingPage";
import history from "../utils/history";

ReactGA.initialize(process.env.GA_TRACKING_CODE);
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/users/sign_in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={SignInPage} />
      <Route exact path="/users/sign_up" component={SignUpPage} />
      <Route exact path="/users/password/reset" component={PasswordResetPage} />
      <Route exact path="/users/password/edit" component={PasswordSetPage} />
      <Route exact path="/users/confirmation" component={PasswordSetPage} />
      <PrivateRoute exact path="/settings" component={SettingsPage} />
      <PrivateRoute exact path="/settings/:name" component={SettingsPage} />
      <PrivateRoute exact path="/okr/:okrHash" component={Home} />
      <PrivateRoute
        exact
        path="/meetings/:objectiveHash"
        component={MeetingPage}
      />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  </Router>
);
