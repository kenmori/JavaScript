import { connect } from "react-redux";
import PasswordResetPage from "../components/signin/PasswordResetPage";
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
)(PasswordResetPage);
