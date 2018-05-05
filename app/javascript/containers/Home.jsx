import Home from '../components/Home';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state, { match: { params } }) => {
  return {
    okrHash: params.okrHash,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openOkrModal: (objectiveId, keyResultId) => {
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
    },
    closeOkrModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
