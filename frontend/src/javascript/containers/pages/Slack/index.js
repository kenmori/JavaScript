import { connect } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router";
import appActions from "../../../actions/apps";
import Slack from "./Slack";

const mapStateToProps = (_, { location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  return {
    code: query.code,
  };
};

const mapDispatchToProps = dispatch => ({
  integrateSlack: code => dispatch(appActions.addSlackIntegration(code)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Slack));
