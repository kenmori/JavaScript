import OkrList from '../components/OkrList';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrList);
