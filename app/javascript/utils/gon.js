import { camelizeKeys } from 'humps';
import { fromJS } from 'immutable';

let gon = camelizeKeys(Object.assign({}, window.gon));
export default fromJS(gon);
