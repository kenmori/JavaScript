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
import Timeline from "../containers/Timeline";
import history from "../utils/history";
import { isAuthenticated } from "../utils/auth";
import withTracker from "../hocs/withTracker";

ReactGA.initialize(process.env.GA_TRACKING_CODE);

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
              pathname: "/login",
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
      <PrivateRoute
        exact
        path="/settings"
        component={withTracker(SettingsPage)}
      />
      <PrivateRoute
        exact
        path="/settings/:name"
        component={withTracker(SettingsPage)}
      />
      <PrivateRoute exact path="/okr/:okrHash" component={withTracker(Home)} />
      <PrivateRoute
        exact
        path="/meetings/:objectiveHash"
        component={withTracker(MeetingPage)}
      />
      <PrivateRoute exact path="/timeline" component={withTracker(Timeline)} />
      <PrivateRoute path="/" component={withTracker(Home)} />
    </Switch>
  </Router>
);
