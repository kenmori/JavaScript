import OkrModal from '../components/okrmodal/OkrModal';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import confirmActions from '../actions/confirm';
import { denormalizeObjective, denormalizeKeyResults } from '../schemas/index'

const enabledUsers = (users, objective, keyResults) => {
  if (!objective) {
    return {}
  }

  const isNotExist = (user) => !users.find(item => item.get('id') === user.get('id'));
  let addedUsers = fromJS([]);

  if (isNotExist(objective.get('owner'))) {
    users = users.push(objective.get('owner'));
  }

  keyResults.forEach((item) => {
    console.log(isNotExist(item.get('owner')))
    if (isNotExist(item.get('owner'))) {
      users = users.push(item.get('owner'));
    }
  })

  return users;
}

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  const objectiveId = state.dialogs.getIn(['okrForm', 'objectiveId']);
  const objective = objectiveId && denormalizeObjective(objectiveId, state.entities);
  const keyResults = denormalizeKeyResults(state.keyResults.get('allIds'), state.entities);
  console.log(1, enabledUsers(state.users.filter(user => !user.get('disabled')), objective, keyResults))
  return {
    isOpen: state.dialogs.getIn(['okrForm', 'isOpen']),
    objective,
    selectedOkr: state.dialogs.getIn(['okrForm', 'selectedOkr']),
    users: enabledUsers(state.users.filter(user => !user.get('disabled')), objective, keyResults),
    loginUser: state.loginUser,
    keyResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: (parentObjective, relatedKeyResult) => {
      dispatch(dialogActions.openObjectiveModal(parentObjective, relatedKeyResult));
    },
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    },
    updateObjective: (objective, oldParentObjectiveId = null, oldParentKeyResultId = null) => {
      const args = { currentUserId: this.currentUserId, oldParentObjectiveId, oldParentKeyResultId };
      dispatch(objectiveActions.updateObjective(objective, args));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult, this.currentUserId));
    },
    closeModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
    removeKeyResult: (id) => {
      dispatch(keyResultActions.removeKeyResult(id));
    },
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    showOkrPane: (okrType, targetId) => {
      if (okrType === 'objective') {
        dispatch(dialogActions.showOkrPane({ okrType }));
      } else {
        dispatch(dialogActions.showOkrPane({ okrType, targetId }));
      }
    },
    confirm: (conformParams) => {
      dispatch(confirmActions.openConfirm(conformParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrModal);
