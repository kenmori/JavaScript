import { connect } from "react-redux";
import deviseActions from "../../../actions/devise";
import SignIn from "./SignIn";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password, location) => {
    dispatch(
      deviseActions.signIn({ email, password, rememberMe: true }, location),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
