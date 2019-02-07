import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import Home from "../containers/pages/Home";
import SignUp from "../containers/pages/SignUp";
import PasswordReset from "../containers/pages/PasswordReset";
import PasswordSet from "../containers/pages/PasswordSet";
import SignIn from "../containers/pages/SignIn";
import Settings from "../containers/pages/Settings";
import Meeting from "../containers/pages/Meeting";
import Timeline from "../containers/pages/Timeline";
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
      <PrivateRoute path="/" component={withPageTracker(Home)} />
    </Switch>
  </Router>
);
