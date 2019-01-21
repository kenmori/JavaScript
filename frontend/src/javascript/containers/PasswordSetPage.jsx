import { connect } from "react-redux";
import qs from "qs";
import PasswordSet from "../components/pages/PasswordSet";
import deviseActions from "../actions/devise";

const mapStateToProps = (state, { location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  return {
    token: {
      resetPasswordToken: query.reset_password_token,
      confirmationToken: query.confirmation_token,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  setPassword(password, passwordConfirmation, token) {
    dispatch(
      deviseActions.setPassword({ password, passwordConfirmation, ...token }),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordSet);
