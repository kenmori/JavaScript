import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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

export default function Router() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/users/sign_up" component={SignUpPage} />
        <Route
          exact
          path="/users/password/reset"
          component={PasswordResetPage}
        />
        <Route exact path="/users/password/edit" component={PasswordSetPage} />
        <Route exact path="/users/confirmation" component={PasswordSetPage} />
        <Route exact path="/users/sign_in" component={SignInPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/settings/:name" component={SettingsPage} />
        <Route exact path="/okr/:okrHash" component={Home} />
        <Route exact path="/meetings/:objectiveHash" component={MeetingPage} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
