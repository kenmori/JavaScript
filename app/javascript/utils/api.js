import fetch from "isomorphic-fetch";
import { camelizeKeys, decamelizeKeys } from "humps";
import { fromJS } from "immutable";

const format = (body) => {
  if (/\S/.test(body)) {
    return fromJS(camelizeKeys(body));
  } else {
    return body;
  }
};

const defaultHeaders = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
};

const csrfToken = document.getElementsByName("csrf-token").item(0).content;
const csrfHeaders = {
  credentials: "same-origin",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken
  }
};

const handlerResponse = response => {
  if (response.status == 200 || response.status == 201 ) {
    return response.json().then(body => format(body))
  } else if(response.status == 204){
    return {}
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error
  }
};

const API = {
  get: (url, query = {}) => {
    return fetch(url, { ...defaultHeaders, ...decamelizeKeys(query), ...{ method: "GET" } })
      .then(handlerResponse);
  },
  post: (url, data) => {
    return fetch(url, { ...csrfHeaders, ...{ body: JSON.stringify(decamelizeKeys(data)) }, ...{ method: "POST" } })
      .then(handlerResponse);
  },
  put: (url, data) => {
    return fetch(url, { ...csrfHeaders, ...{ body: JSON.stringify(decamelizeKeys(data)) }, ...{ method: "PUT" } })
      .then(handlerResponse);
  },
  delete: (url) => {
    return fetch(url, { ...csrfHeaders, ...{ method: "DELETE" } })
      .then(handlerResponse);
  },
};

export default API;