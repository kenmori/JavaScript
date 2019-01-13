import { connect } from "react-redux";
import SignInPage from "../components/signin/SignInPage";
import deviseActions from "../actions/devise";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password, location) => {
    dispatch(deviseActions.signIn({ email, password, rememberMe: true }, location));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInPage);
