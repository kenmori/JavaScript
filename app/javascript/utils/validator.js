export const validateObjectiveName = value => {
  return value ? undefined : 'Objective を入力してください'
}

export const validateObjectiveId = value => {
  return value ? undefined : '既存 Objective を入力してください'
}

export const validateParentKeyResultId = value => {
  return (value && value !== -1) ? undefined : '上位 Key Result を入力してください'
}

export const validateKeyResultName = value => {
  return value ? undefined : 'KeyResult を入力してください'
}

export const validateTargetValue = (value, { valueUnit }) => {
  return (value || !valueUnit) ? undefined : '目標値を入力してください'
}
