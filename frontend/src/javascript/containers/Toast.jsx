import { connect } from "react-redux";
import Toast from "../components/util/Toast";
import toastActions from "../actions/toasts";

const mapStateToProps = state => ({
  message: state.toasts.get("message"),
  type: state.toasts.get("type"),
});

const mapDispatchToProps = dispatch => ({
  clearToast: () => {
    dispatch(toastActions.clearToast());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
