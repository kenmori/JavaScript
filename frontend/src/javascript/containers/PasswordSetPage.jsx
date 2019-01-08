import { connect } from "react-redux";
import queryString from "query-string";
import PasswordSetPage from "../components/signin/PasswordSetPage";
import deviseActions from "../actions/devise";

const mapStateToProps = (state, { location }) => {
  const query = queryString.parse(location.search);
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
)(PasswordSetPage);
