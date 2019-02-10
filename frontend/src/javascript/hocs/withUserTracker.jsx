import React, { Component } from "react";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import mixpanel from "../utils/mixpanel";

export default function withUserTracker(WrappedComponent) {
  const HOC = class extends Component {
    componentDidMount() {
      const {
        email,
        userId,
        isAdmin,
        lastName,
        firstName,
        organizationId,
        organizationName,
      } = this.props;

      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
      mixpanel.identify(userId);
      mixpanel.people.set({
        $email: email,
        $first_name: firstName,
        $last_name: lastName,
        Admin: isAdmin,
        OrganizationId: organizationId,
        Organization: organizationName,
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(state => ({
    userId: state.loginUser.get("id"),
    email: state.loginUser.get("email"),
    isAdmin: state.loginUser.get("isAdmin"),
    lastName: state.loginUser.get("lastName"),
    firstName: state.loginUser.get("firstName"),
    organizationId: state.organization.get("current").get("id"),
    organizationName: state.organization.get("current").get("name"),
  }))(HOC);
}
