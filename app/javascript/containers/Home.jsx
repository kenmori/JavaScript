import Home from '../components/Home';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state, { match: { params } }) => {
  this.entities = state.entities;
  return {
    okrHash: params.okrHash,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openOkrModal: (objectiveId, keyResultId) => {
      if (keyResultId) {
        objectiveId = this.entities.keyResults.getIn([keyResultId, 'objectiveId']);
      }
      const hasObjectiveId = this.entities.objectives.has(objectiveId);
      const hasKeyResultId = this.entities.keyResults.has(keyResultId);
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId, hasObjectiveId, hasKeyResultId));
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
