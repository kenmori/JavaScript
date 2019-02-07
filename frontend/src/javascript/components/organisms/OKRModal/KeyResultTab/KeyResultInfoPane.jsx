import React from "react";
import { Form, Divider } from "semantic-ui-react";
import OkrSelect from "../../../form/OkrSelect";
import OkrList from "../../../form/OkrList";
import UserSelect from "../../../form/UserSelect";
import KeyResultMemberSelect from "../../../form/KeyResultMemberSelect";
import AutoInput from "../../../form/AutoInput";
import PopupButton from "../../../util/PopupButton";

const KeyResultInfoPane = React.memo(
  ({
    loginUserId,
    keyResult,
    users,
    candidates,
    isObjectiveOwner,
    isKeyResultOwner,
    isFetchedCandidates,
    openObjectiveModal,
    updateOkr,
    disableKeyResult,
    updateKeyResult,
    removeKeyResult,
    openOKRModal,
    confirm,
  }) => {
    const childObjectives = keyResult.get("childObjectives");
    const isOwner = isObjectiveOwner || isKeyResultOwner;
    const isDisabled = keyResult.get("disabled");
    const handleObjectiveChange = value => updateOkr({ objectiveId: value });
    const handleNameCommit = name => updateKeyResult({ name });
    const handleKeyResultMemberAdd = value =>
      updateKeyResult({
        member: { user: value, behavior: "add", role: "member" },
      });
    const handleKeyResultMemberRemove = value => {
      const removeAction = () =>
        updateKeyResult({
          member: { user: value, behavior: "remove" },
        });
      if (
        keyResult
          .get("childObjectives")
          .some(objective => objective.getIn(["owner", "id"]) === value)
      ) {
        const user = users.find(user => user.get("id") === value);
        confirm({
          content: `下位 Objective が紐付いています。関係者 "${user.get(
            "lastName",
          )} ${user.get("firstName")}" を削除しますか？`,
          onConfirm: removeAction,
        });
      } else {
        removeAction();
      }
    };
    const handleOwnerChange = ownerId => {
      const updateKeyResultOwner = () =>
        updateKeyResult({
          member: { user: ownerId, behavior: "add", role: "owner" },
        });
      if (!isObjectiveOwner && isKeyResultOwner && ownerId !== loginUserId) {
        // O 責任者でない KR 責任者 (非管理者) が自分以外に変更しようとした場合
        confirm({
          content:
            "Key Result 責任者を他ユーザーに変更すると自分では戻せなくなります。変更しますか？",
          onConfirm: updateKeyResultOwner,
        });
      } else {
        updateKeyResultOwner();
      }
    };
    const handleCreateClick = () => openObjectiveModal(keyResult);
    const handleRemoveClick = () => {
      let message = `Key Result "${keyResult.get(
        "name",
      )}" を完全に削除しますか？`;
      const hasChild = !keyResult.get("childObjectiveIds").isEmpty();
      if (hasChild) {
        message +=
          "Key Result に紐付く下位 Objective は自動的に紐付きが解除されます。";
      }
      message += " (この操作は元に戻せません)";
      confirm({
        content: message,
        onConfirm: () => removeKeyResult(keyResult.get("id")),
      });
    };
    const handleDisableClick = () => {
      const enabledOrDisabled = keyResult.get("disabled") ? "有効化" : "無効化";
      let message = `Key Result "${keyResult.get(
        "name",
      )}" を${enabledOrDisabled}しますか？`;
      const hasChild = !keyResult.get("childObjectiveIds").isEmpty();
      if (hasChild) {
        message += `Key Result に紐付く全ての下位 OKR も自動的に${enabledOrDisabled}されます。`;
      }
      confirm({
        content: message,
        onConfirm: () => disableKeyResult(keyResult),
      });
    };

    return (
      <Form>
        <Form.Field className="flex-field">
          <label>Key Result</label>
          <div className="flex-field__item">
            <AutoInput
              value={keyResult.get("name")}
              onCommit={handleNameCommit}
            />
          </div>
        </Form.Field>
        <Form.Field className="flex-field">
          <label>責任者</label>
          <div className="flex-field__item">
            <UserSelect
              users={users}
              value={keyResult.getIn(["owner", "id"])}
              onChange={handleOwnerChange}
            />
          </div>
        </Form.Field>
        <Form.Field className="flex-field">
          <label>関係者</label>
          <div className="flex-field__item key-result-members">
            <KeyResultMemberSelect
              users={users}
              members={keyResult.get("members").map(member => member.get("id"))}
              includedId={isOwner ? null : loginUserId}
              excludedId={keyResult.getIn(["owner", "id"])}
              add={handleKeyResultMemberAdd}
              remove={handleKeyResultMemberRemove}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>紐付く Objective</label>
          <OkrSelect
            okrs={candidates}
            value={keyResult.get("objectiveId")}
            readOnly={!isObjectiveOwner}
            loading={!isFetchedCandidates}
            openOKRModal={openOKRModal}
            onChange={handleObjectiveChange}
          />
        </Form.Field>
        <Divider hidden />
        {!childObjectives.isEmpty() && (
          <Form.Field>
            <label>下位 Objective 一覧</label>
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
          <Form.Button
            icon="plus"
            content="下位 OKR を作成する"
            onClick={handleCreateClick}
            positive
          />
        </Form.Group>
      </Form>
    );
  },
);

export default KeyResultInfoPane;
