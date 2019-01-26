import { connect } from "react-redux";
import deviseActions from "../../../actions/devise";
import PasswordReset from "./PasswordReset";

const mapStateToProps = (state, { location }) => ({
  email: location.state && location.state.email,
  isCompleted: state.devise.get("isResetPasswordCompleted"),
});

const mapDispatchToProps = dispatch => ({
  sendEmail(email) {
    dispatch(deviseActions.resetPassword({ email }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordReset);
