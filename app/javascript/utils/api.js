import fetch from 'isomorphic-fetch';
import { camelizeKeys, decamelizeKeys } from 'humps';
import queryString from 'querystring';
import { fromJS } from 'immutable';
import isObject from 'isobject';

const defaultHeaders = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

const csrfToken = document.getElementsByName('csrf-token').item(0).content;
const csrfHeaders = {
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'X-CSRF-Token': csrfToken,
  }
};

const handlerResponse = response => {
  if (response.status == 200 || response.status == 201 ) {
    return response.json().then(body => fromJS(camelizeKeys(body)))
  } else if(response.status == 204){
    return {}
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
};

const isIncludedFormData = (data) => {
  const values = Object.values(data);
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof File) {
      return true
    }
    if (isObject(values[i])) { return isIncludedFormData(values[i]) }
  }

  return false;
}

const setContentType = (data, headers) => {
  const headerData = Object.assign({}, headers);
  if (isIncludedFormData(data)) {
    delete headerData.headers['Content-Type'];
  } else {
    headerData.headers['Content-Type'] = 'application/json';
  }

  return headerData;
}

const toFormData = (data) => {
  const keys = Object.keys(data);
  if (keys.length !== 1) { throw new Error('invalid form parameters.'); }
  const formKey = keys[0];

  return Object.entries(data[formKey]).reduce((previous, current) => {
    const [key, value] = current;
    previous.append(`${formKey}[${key}]`, value);
    return previous;
  }, new FormData());
}

const bodyData = (data) => {
  return isIncludedFormData(data) ? toFormData(data) : JSON.stringify(decamelizeKeys(data));
}

const API = {
  get: (url, query = {}) => {
    if(Object.keys(query).length != 0) url += '?' +  queryString.stringify(decamelizeKeys(query));
    return fetch(url, { ...defaultHeaders, ...{ method: 'GET' } })
      .then(handlerResponse)
      .catch(error => ({ error }));
  },
  post: (url, data) => {
    return fetch(url, { ...setContentType(data, csrfHeaders), ...{ body: bodyData(data) }, ...{ method: 'POST' } })
      .then(handlerResponse)
      .catch(error => ({ error }));
  },
  put: (url, data) => {
    return fetch(url, { ...setContentType(data, csrfHeaders), ...{ body: bodyData(data) }, ...{ method: 'PUT' } })
      .then(handlerResponse)
      .catch(error => ({ error }));
  },
  delete: (url) => {
    return fetch(url, { ...csrfHeaders, ...{ method: 'DELETE' } })
      .then(handlerResponse)
      .catch(error => ({ error }));
  },
};

export default API;
