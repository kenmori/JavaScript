import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "../containers/templates/Home";
import SignUp from "../containers/templates/SignUp";
import PasswordReset from "../containers/templates/PasswordReset";
import PasswordSet from "../containers/templates/PasswordSet";
import SignIn from "../containers/templates/SignIn";
import Settings from "../containers/templates/Settings";
import Meeting from "../containers/templates/Meeting";
import Timeline from "../containers/templates/Timeline";
import Slack from "../containers/templates/Slack";
import history from "../utils/history";
import { isAuthenticated } from "../utils/auth";
import withPageTracker from "../hocs/withPageTracker";

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
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/users/sign_up" component={SignUp} />
      <Route exact path="/users/password/reset" component={PasswordReset} />
      <Route exact path="/users/password/edit" component={PasswordSet} />
      <Route exact path="/users/confirmation" component={PasswordSet} />
      <PrivateRoute
        exact
        path="/settings"
        component={withPageTracker(Settings)}
      />
      <PrivateRoute
        exact
        path="/settings/:name"
        component={withPageTracker(Settings)}
      />
      <PrivateRoute
        exact
        path="/meetings/:objectiveId(\d+)"
        component={withPageTracker(Meeting)}
      />
      <PrivateRoute
        exact
        path="/timeline"
        component={withPageTracker(Timeline)}
      />
      <PrivateRoute
        exact
        path="/objectives/:objectiveId(\d+)"
        component={withPageTracker(Home)}
      />
      <PrivateRoute
        exact
        path="/key_results/:keyResultId(\d+)"
        component={withPageTracker(Home)}
      />
      <PrivateRoute
        exact
        path="/applications/slack/auth"
        component={withPageTracker(Slack)}
      />
      <PrivateRoute path="/" component={withPageTracker(Home)} />
    </Switch>
  </Router>
);
