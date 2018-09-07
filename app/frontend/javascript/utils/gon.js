import { camelizeKeys } from 'humps'
import { fromJS } from 'immutable'

const gon = camelizeKeys(Object.assign({}, window.gon))
export default fromJS(gon)
