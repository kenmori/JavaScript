import { connect } from "react-redux";
import appActions from "../../../actions/apps";
import AppSettingTab from "../../../components/organisms/AppSettingTab";

const mapStateToProps = state => ({
  slackEnabled: state.apps.get("slackEnabled"),
});

const mapDispatchToProps = dispatch => ({
  onSegregate: () => dispatch(appActions.removeSlackIntegration()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSettingTab);
