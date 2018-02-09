import Confirm from '../components/modal/Confirm';
import { connect } from 'react-redux';
import confirmActions from '../actions/confirm';

const mapStateToProps = (state) => {
  return {
    open: state.confirm.get('open'),
    content: state.confirm.get('content'),
    onCancel: state.confirm.get('onCancel'),
    onConfirm: state.confirm.get('onConfirm'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close() {
      dispatch(confirmActions.closeConfirm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirm);
