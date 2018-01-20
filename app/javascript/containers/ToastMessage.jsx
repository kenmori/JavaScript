import ToastMessage from '../components/ToastMessage';
import { connect } from 'react-redux';
import toastActions from '../actions/toasts';

const mapStateToProps = (state) => {
  return {
    successMessage: state.toasts.get('successMessage'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => {
      dispatch(toastActions.clearSuccessMessage());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastMessage);