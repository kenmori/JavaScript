import { connect } from "react-redux";
import PasswordReset from "../components/pages/PasswordReset";
import deviseActions from "../actions/devise";

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
