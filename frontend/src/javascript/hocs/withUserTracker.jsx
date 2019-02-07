import React, { Component } from "react";
import { connect } from "react-redux";
import ReactGA from "react-ga";

export default function withUserTracker(WrappedComponent) {
  const HOC = class extends Component {
    componentDidMount() {
      const { userId, organizationId, organizationName } = this.props;

      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(state => ({
    userId: state.current.get("userId"),
    organizationId: state.organization.get("current").get("id"),
    organizationName: state.organization.get("current").get("name"),
  }))(HOC);
}
