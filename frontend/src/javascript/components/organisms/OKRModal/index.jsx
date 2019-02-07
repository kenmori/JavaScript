import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import ModalLayout from "../../templates/ModalLayout";
import history from "../../../utils/history";
import OKRSideBar from "../OKRSideBar";
import ObjectiveTab from "./ObjectiveTab";
import KeyResultTab from "./KeyResultTab";

class OKRModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      isDirty: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.removedObjectiveId === this.props.objectiveId) {
      history.push("/");
    } else if (nextProps.removedKeyResultId === this.props.keyResultId) {
      this.props.openOKRModal(this.props.objectiveId, null);
    }
  }

  setDirty = isDirty => this.setState({ isDirty });

  isNotExistMember(users, targetUser) {
    return !users.find(item => item.get("id") === targetUser.get("id"));
  }

  selectableObjectiveMembers(users, objective) {
    if (this.isNotExistMember(users, objective.get("owner"))) {
      users = users.push(objective.get("owner"));
    }
    return users;
  }

  selectableKeyResultMembers(users, keyResult) {
    if (this.isNotExistMember(users, keyResult.get("owner"))) {
      users = users.push(keyResult.get("owner"));
    }
    keyResult.get("members").forEach(item => {
      if (this.isNotExistMember(users, item)) {
        users = users.push(item);
      }
    });

    return users;
  }

  handleClose = () => {
    const { confirm, closeModal } = this.props;
    const { isDirty } = this.state;

    if (isDirty) {
      confirm({
        content: "編集中の内容を破棄します。よろしいですか？",
        onConfirm: () => {
          this.setState({ isDirty: false });
          closeModal();
        },
      });
    } else {
      closeModal();
    }
  };

  handleMenuChange = ({ _, objectiveId, keyResultId }) => {
    const { openOKRModal } = this.props;

    if (objectiveId) {
      openOKRModal(objectiveId, null);
    } else {
      openOKRModal(null, keyResultId);
    }
  };

  render() {
    const {
      loginUserId,
      keyResultId,
      objective,
      users,
      keyResultCommentLabels,
      objectiveCandidates,
      parentKeyResultCandidates,
      isOpen,
      isAdmin,
      isObjectiveOwner,
      isFetchedObjectiveCandidates,
      isFetchedKeyResultCandidates,
      closeModal,
      updateObjective,
      disableObjective,
      removeObjective,
      updateKeyResult,
      disableKeyResult,
      removeKeyResult,
      updateKeyResultOrder,
      openObjectiveModal,
      openKeyResultModal,
      openOKRModal,
      confirm,
      showToast,
      fetchObjectiveHistory,
      fetchKeyResultHistory,
    } = this.props;
    const { isDirty } = this.state;
    if (!objective) {
      return null;
    }

    const keyResult = objective
      .get("keyResults")
      .find(keyResult => keyResult.get("id") === keyResultId);
    const isKeyResultOwner =
      keyResult && keyResult.getIn(["owner", "id"]) === loginUserId;
    const name = keyResult ? keyResult.get("name") : objective.get("name");

    return (
      <ModalLayout title={name} isOpen={isOpen} handleClose={closeModal}>
        <div className="okr-modal-content">
          <div className="okr-body">
            <OKRSideBar
              objective={objective}
              keyResultId={keyResultId}
              keyResultOrder={objective.get("keyResultIds")}
              openKeyResultModal={openKeyResultModal}
              updateKeyResultOrder={updateKeyResultOrder}
              canMoveKeyResult={isObjectiveOwner}
              onChange={this.handleMenuChange}
              showToast={showToast}
            />
            <div className="okr-main">
              {keyResult ? (
                <KeyResultTab
                  loginUserId={loginUserId}
                  users={this.selectableKeyResultMembers(users, keyResult)}
                  keyResult={keyResult}
                  keyResultCommentLabels={keyResultCommentLabels}
                  objectiveCandidates={objectiveCandidates}
                  isObjectiveOwner={isObjectiveOwner}
                  isKeyResultOwner={isKeyResultOwner}
                  isFetchedObjectiveCandidates={isFetchedObjectiveCandidates}
                  isDirty={isDirty}
                  updateKeyResult={updateKeyResult}
                  disableKeyResult={disableKeyResult}
                  removeKeyResult={removeKeyResult}
                  openObjectiveModal={openObjectiveModal}
                  fetchKeyResultHistory={fetchKeyResultHistory}
                  openOKRModal={openOKRModal}
                  setDirty={this.setDirty}
                  confirm={confirm}
                />
              ) : (
                <ObjectiveTab
                  objective={objective}
                  users={this.selectableObjectiveMembers(users, objective)}
                  parentKeyResultCandidates={parentKeyResultCandidates}
                  loginUserId={loginUserId}
                  isAdmin={isAdmin}
                  isObjectiveOwner={isObjectiveOwner}
                  isFetchedKeyResultCandidates={isFetchedKeyResultCandidates}
                  updateObjective={updateObjective}
                  disableObjective={disableObjective}
                  removeObjective={removeObjective}
                  openOKRModal={openOKRModal}
                  confirm={confirm}
                  setDirty={this.setDirty}
                  fetchObjectiveHistory={fetchObjectiveHistory}
                />
              )}
            </div>
          </div>
        </div>
      </ModalLayout>
    );
  }
}

OKRModal.propTypes = {
  objectiveId: PropTypes.number,
  objective: ImmutablePropTypes.map,
  keyResultId: PropTypes.number,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  objectiveCandidates: ImmutablePropTypes.list.isRequired,
  parentKeyResultCandidates: ImmutablePropTypes.list.isRequired,
  removedObjectiveId: PropTypes.number,
  removedKeyResultId: PropTypes.number,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedObjectiveCandidates: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  openOKRModal: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  openKeyResultModal: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  disableObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  disableKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  fetchObjectiveHistory: PropTypes.func.isRequired,
  fetchKeyResultHistory: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default OKRModal;
