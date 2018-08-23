import Hashids from 'hashids'
import history from './history'

const URL_TYPE = {
  OBJECTIVE: 0,
  KEY_RESULT: 1,
  COMMENT: 2,
}

const hashids = new Hashids("NDRGMTdGMEIyRUM0RjJFQTk0Mjg0NDk2MEMyODY4RkQ2QUZFQUYzNg==")

export const openObjective = objectiveId => {
  history.push(`/okr/${hashids.encode(URL_TYPE.OBJECTIVE, objectiveId)}`)
}

export const openKeyResult = keyResultId => {
  history.push(`/okr/${hashids.encode(URL_TYPE.KEY_RESULT, keyResultId)}`)
}

export const goToRoot = () => {
  history.push('/')
}

export const getOkrId = okrHash => {
  const [urlType, okrId] = hashids.decode(okrHash)
  return {
    objectiveId: urlType === URL_TYPE.OBJECTIVE ? okrId : null,
    keyResultId: urlType === URL_TYPE.KEY_RESULT ? okrId : null,
  }
}
