import Toast from '../components/Toast';
import { connect } from 'react-redux';
import toastActions from '../actions/toasts';

const mapStateToProps = (state) => {
  return {
    message: state.toasts.get('message'),
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
