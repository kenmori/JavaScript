import React from "react";
import { Form, Divider } from "semantic-ui-react";
import OkrSelect from "../../../form/OkrSelect";
import OkrList from "../../../form/OkrList";
import AutoInput from "../../../form/AutoInput";
import UserSelect from "../../../form/UserSelect";
import PopupButton from "../../../util/PopupButton";

const ObjectiveInfoPane = React.memo(
  ({
    objective,
    users,
    candidates,
    loginUserId,
    isAdmin,
    isObjectiveOwner,
    isFetchedCandidates,
    disableObjective,
    removeObjective,
    updateObjective,
    openOKRModal,
    confirm,
  }) => {
    const parentKeyResult = objective.get("parentKeyResult");
    const childObjectives =
      parentKeyResult && parentKeyResult.get("childObjectives");
    const isDisabled = objective.get("disabled");
    const handleNameCommit = name => updateObjective({ name });
    const handleOwnerChange = ownerId => {
      const updateObjectiveOwner = () =>
        updateObjective({ objectiveMember: { user: ownerId } });
      if (!isAdmin && isObjectiveOwner && ownerId !== loginUserId) {
        // O 責任者 (非管理者) が自分以外に変更しようとした場合
        confirm({
          content:
            "Objective 責任者を他ユーザーに変更すると自分では戻せなくなります。変更しますか？",
          onConfirm: updateObjectiveOwner,
        });
      } else {
        updateObjectiveOwner();
      }
    };
    const handleParentKeyResultChange = value =>
      updateObjective({ parentKeyResultId: value === -1 ? null : value });
    const handleRemoveClick = () => {
      let message = `Objective "${objective.get(
        "name",
      )}" を完全に削除しますか？`;
      const keyResults = objective.get("keyResults");
      if (!keyResults.isEmpty()) {
        message += "Objective に紐付く Key Result も削除されます。";
        const hasChild = keyResults.some(
          keyResult => !keyResult.get("childObjectiveIds").isEmpty(),
        );
        if (hasChild) {
          message +=
            "Key Result に紐付く下位 Objective は自動的に紐付きが解除されます。";
        }
      }
      message += " (この操作は元に戻せません)";
      confirm({
        content: message,
        onConfirm: () => removeObjective(objective.get("id")),
      });
    };
    const handleDisableClick = () => {
      const enabledOrDisabled = objective.get("disabled") ? "有効化" : "無効化";
      let message = `Objective "${objective.get(
        "name",
      )}" を${enabledOrDisabled}しますか？`;
      const keyResults = objective.get("keyResults");
      if (!keyResults.isEmpty()) {
        message += `Objective に紐付く Key Result も${enabledOrDisabled}されます。`;
        const hasChild = keyResults.some(
          keyResult => !keyResult.get("childObjectiveIds").isEmpty(),
        );
        if (hasChild) {
          message += `Key Result に紐付く全ての下位 OKR も自動的に${enabledOrDisabled}されます。`;
        }
      }
      confirm({
        content: message,
        onConfirm: () => disableObjective(objective),
      });
    };

    return (
      <Form>
        <Form.Field className="flex-field">
          <label>Objective</label>
          <div className="flex-field__item">
            <AutoInput
              value={objective.get("name")}
              onCommit={handleNameCommit}
            />
          </div>
        </Form.Field>
        <Form.Field className="flex-field">
          <label>責任者</label>
          <div className="flex-field__item">
            <UserSelect
              users={users}
              value={objective.getIn(["owner", "id"])}
              onChange={handleOwnerChange}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>上位 Key Result</label>
          <OkrSelect
            okrs={candidates}
            isObjective={false}
            value={objective.get("parentKeyResultId")}
            readOnly={!isObjectiveOwner}
            loading={!isFetchedCandidates}
            openOKRModal={openOKRModal}
            onChange={handleParentKeyResultChange}
          />
        </Form.Field>
        <Divider hidden />
        {childObjectives && !childObjectives.isEmpty() && (
          <Form.Field>
            <label>上位 Key Result に紐付く下位 Objective 一覧</label>
            <OkrList okrs={childObjectives} openOKRModal={openOKRModal} />
          </Form.Field>
        )}
        <Form.Group className="okr-buttons">
          <PopupButton
            icon="trash"
            tips="完全に削除する"
            negative
            inForm
            onClick={handleRemoveClick}
          />
          <Form.Button
            icon={isDisabled ? "undo" : "dont"}
            content={isDisabled ? "有効化する" : "無効化する"}
            onClick={handleDisableClick}
            negative={!isDisabled}
          />
        </Form.Group>
      </Form>
    );
  },
);

export default ObjectiveInfoPane;
