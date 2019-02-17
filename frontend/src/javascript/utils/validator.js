import moment from "moment";

export const validateObjectiveName = value =>
  value ? undefined : "Objective を入力してください";

export const validateIsolatedObjectiveId = (
  value,
  _,
  { isolatedObjectives },
) => {
  const isIsolatedObjective = isolatedObjectives.some(
    objective => objective.get("id") === value,
  );
  return isIsolatedObjective ? undefined : "孤立 Objective を選択してください";
};

export const validatePreviousObjectiveId = (
  value,
  _,
  { previousObjectives, previousAllObjectives, isAdmin },
) => {
  const targetObjectives = isAdmin ? previousAllObjectives : previousObjectives
  const isPreviousObjective = targetObjectives.some(
    objective => objective.get("id") === value,
  );
  return isPreviousObjective ? undefined : "前期 Objective を選択してください";
};

export const validateParentKeyResultId = value =>
  value && value !== -1 ? undefined : "上位 Key Result を選択してください";

export const validateKeyResultName = value =>
  value ? undefined : "KeyResult を入力してください";

export const validateTargetValue = (value, { valueUnit }) => {
  if (value) {
    if (value < 0) {
      return "目標値は0以上の数値を入力してください";
    }
    if (!/^[0-9０-９]+([.．][0-9０-９]*)?$/.test(value)) {
      return "目標値は数値を入力してください";
    }
  } else if (valueUnit) {
    return "目標値を入力してください";
  }
  return undefined;
};

export const validateExpiredDate = value =>
  moment(value, "YYYY/M/D").isValid() ? undefined : "期限が不正です";

export const normalizeExpiredDate = value => {
  const expiredDate =
    typeof value === "string" ? moment(value, "YYYY/M/D") : value;
  return expiredDate ? expiredDate.format("YYYY-MM-DD") : null;
};
