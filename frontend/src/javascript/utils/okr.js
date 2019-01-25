import avatar_image from "../images/avatar.png";

export const OkrTypes = {
  TASK: "task",
  OBJECTIVE: "objective",
  KEY_RESULT: "keyResult",
};

// O/KR 選択ドロップダウンに指定する O/KR 一覧データを返す
export const okrOptions = (okrs, withNone) => {
  let options = okrs.map(okr => ({
    key: okr.get("id"),
    value: okr.get("id"),
    text: (okr.get("disabled") ? "[無効] " : "") + okr.get("name"),
    image: {
      avatar: true,
      src: okr.getIn(["owner", "avatarUrl"]) || avatar_image,
    },
  }));
  if (withNone) {
    // なしの選択肢を追加
    options = options.insert(0, {
      key: -1,
      value: -1,
      text: "なし",
    });
  }
  return options.toArray();
};

const getParentKeyResult = (objective, entities) => {
  const parentKeyResultId = objective.get("parentKeyResultId");
  if (parentKeyResultId) {
    return entities.keyResults.get(parentKeyResultId);
  }
  return null;
};

const getParentObjective = (objective, entities) => {
  const parentKeyResult = getParentKeyResult(objective, entities);
  if (parentKeyResult) {
    return entities.objectives.get(parentKeyResult.get("objectiveId"));
  }
  return null;
};

export const isChildObjective = (objective, ownerId, entities) => {
  const parentObjective = getParentObjective(objective, entities);
  return parentObjective
    ? parentObjective.getIn(["owner", "id"]) === ownerId
    : false;
};

export const isChildObjectiveById = (objectiveId, ownerId, entities) => {
  const objective = entities.objectives.get(objectiveId);
  return isChildObjective(objective, ownerId, entities);
};

export const isObjectiveKeyResult = (keyResult, ownerId) => {
  const objective = keyResult.get("objective");
  return objective ? objective.getIn(["owner", "id"]) === ownerId : false;
};

export const isMemberKeyResult = (keyResult, ownerId) =>
  keyResult.getIn(["owner", "id"]) !== ownerId;

export const isMemberKeyResultById = (keyResultId, ownerId, entities) => {
  const keyResult = entities.keyResults.get(keyResultId);
  return isMemberKeyResult(keyResult, ownerId);
};

export const isMemberObjectiveById = (objectiveId, entities) => {
  if (objectiveId) {
    const objective = entities.objectives.get(objectiveId);
    if (objective) {
      const parentKeyResult = getParentKeyResult(objective, entities);
      if (parentKeyResult) {
        const ownerId = objective.getIn(["owner", "id"]);
        return parentKeyResult
          .get("members")
          .some(member => member.get("id") === ownerId);
      }
    }
  }
  return false;
};

export const getObjectiveByKeyResultId = (keyResultId, entities) => {
  const keyResult = entities.keyResults.get(keyResultId);
  return entities.objectives.get(keyResult.get("objectiveId"));
};

export const getEnabledObjective = (
  objectiveId,
  showDisabledOkrs,
  entities,
) => {
  const objective = entities.objectives.get(objectiveId);
  if (showDisabledOkrs) {
    return objective;
  }
  const parentKeyResult = entities.keyResults.get(
    objective.get("parentKeyResultId"),
  );
  return parentKeyResult && parentKeyResult.get("disabled")
    ? objective.set("parentKeyResultId", null)
    : objective;
};

export const getEnabledObjectiveIds = (
  objectiveIds,
  showDisabledOkrs,
  entities,
) =>
  showDisabledOkrs
    ? objectiveIds
    : objectiveIds.filter(id => !entities.objectives.getIn([id, "disabled"]));

export const getEnabledKeyResultIds = (
  keyResultIds,
  showDisabledOkrs,
  entities,
) =>
  showDisabledOkrs
    ? keyResultIds
    : keyResultIds.filter(id => !entities.keyResults.getIn([id, "disabled"]));

// KR 一覧に紐付いている子 O が全て disabled の場合は true
export const isDisabledChildObjectives = (keyResultIds, entities) =>
  keyResultIds.every(keyResultId => {
    const keyResult = entities.keyResults.get(keyResultId);
    return keyResult.get("childObjectiveIds").every(childObjectiveId => {
      const childObjective = entities.objectives.get(childObjectiveId);
      return childObjective.get("disabled");
    });
  });

export function formatChangeLog(diffs) {
  let message = "";

  for (const e of diffs) {
    message += `**${e.get("column")}**を \`${e.get(
      "before",
    )}\` から \`${e.get("after")}\` へ変更\n`;
  }

  return message;
}
