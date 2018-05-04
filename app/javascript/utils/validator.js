import moment from 'moment'

export const validateObjectiveName = value => {
  return value ? undefined : 'Objective を入力してください'
}

export const validateObjectiveId = prefix => value => {
  return value ? undefined : `${prefix} Objective を選択してください`
}

export const validateParentKeyResultId = value => {
  return (value && value !== -1) ? undefined : '上位 Key Result を選択してください'
}

export const validateKeyResultName = value => {
  return value ? undefined : 'KeyResult を入力してください'
}

export const validateTargetValue = (value, { valueUnit }) => {
  if (value) {
    if (value < 0) {
      return '目標値は0以上の数値を入力してください'
    } else if (!/^[0-9０-９]+([.．][0-9０-９]*)?$/.test(value)) {
      return '目標値は数値を入力してください'
    }
  } else if (valueUnit) {
    return '目標値を入力してください'
  }
  return undefined
}

export const validateExpiredDate = value => {
  return moment(value, 'YYYY/M/D').isValid() ? undefined : '期限が不正です'
}

export const normalizeExpiredDate = value => {
  const expiredDate = (typeof value === 'string') ? moment(value, 'YYYY/M/D') : value
  return expiredDate ? expiredDate.format('YYYY-MM-DD') : null
}
