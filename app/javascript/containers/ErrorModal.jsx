import ErrorModal from '../components/ErrorModal';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['error', 'isOpen']),
    message: state.dialogs.getIn(['error', 'message']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(dialogActions.closeErrorModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);
