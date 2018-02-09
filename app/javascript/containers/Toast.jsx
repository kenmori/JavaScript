import Toast from '../components/util/Toast';
import { connect } from 'react-redux';
import toastActions from '../actions/toasts';

const mapStateToProps = (state) => {
  return {
    message: state.toasts.get('message'),
    type: state.toasts.get('type'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearToast: () => {
      dispatch(toastActions.clearToast());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
