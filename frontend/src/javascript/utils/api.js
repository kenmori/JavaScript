import fetch from "isomorphic-fetch";
import { camelizeKeys, decamelizeKeys } from "humps";
import qs from "qs";
import { fromJS } from "immutable";
import isObject from "isobject";
import { saveAs } from "file-saver";
import { removeToken, getToken } from "./auth";

const apiEndpoint = "/api";

function generateAuthHeaders() {
  const credentials = {
    credentials: "same-origin",
  };
  let headers = {
    Accept: "application/json",
  };

  if (getToken()) {
    headers = Object.assign(headers, {
      Authorization: `Bearer ${getToken()}`,
    });
  }

  return {
    ...credentials,
    headers,
  };
}

function generateDownloadHeaders() {
  const credentials = {
    credentials: "same-origin",
  };
  let headers = {
    Accept:
      "text/csv,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  };

  if (getToken()) {
    headers = Object.assign(headers, {
      Authorization: `Bearer ${getToken()}`,
    });
  }

  return {
    ...credentials,
    headers,
  };
}

const handlerResponse = response => {
  if (
    response.status == 200 ||
    response.status == 201 ||
    response.status == 202
  ) {
    return response.json().then(body => fromJS(camelizeKeys(body)));
  }
  if (response.status == 204) {
    return {};
  }
  if (response.status == 401 && location.pathname !== "/login") {
    removeToken();
    location.href = "/login";
    return {};
  }

  return response.json().then(body => {
    throw new Error(body.errors.map(e => e.message).join());
  });
};

const isIncludedFormData = data => {
  const values = Object.values(data);
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof File) {
      return true;
    }
    if (isObject(values[i])) {
      return isIncludedFormData(values[i]);
    }
  }

  return false;
};

const setContentType = (data, headers) => {
  const headerData = Object.assign({}, headers);
  if (isIncludedFormData(data)) {
    delete headerData.headers["Content-Type"];
  } else {
    headerData.headers["Content-Type"] = "application/json";
  }

  return headerData;
};

const toFormData = data => {
  const keys = Object.keys(data);
  if (keys.length !== 1) {
    throw new Error("invalid form parameters.");
  }
  const formKey = keys[0];

  return Object.entries(data[formKey]).reduce((previous, current) => {
    const [key, value] = current;
    previous.append(`${formKey}[${key}]`, value);
    return previous;
  }, new FormData());
};

const bodyData = data =>
  isIncludedFormData(data)
    ? toFormData(data)
    : JSON.stringify(decamelizeKeys(data));

export function downloadFile(url, query = {}) {
  if (Object.keys(query).length != 0) {
    url += `?${qs.stringify(decamelizeKeys(query))}`;
  }

  return fetch(`${apiEndpoint}${url}`, {
    ...generateDownloadHeaders(),
    ...{ method: "GET" },
  })
    .then(async res => ({
      filename: res.headers
        .get("content-disposition")
        .split("filename=")[1]
        .replace(/^"|"$/g, ""),
      blob: await res.blob(),
    }))
    .then(({ filename, blob }) => saveAs(blob, filename))
    .catch(error => ({ error }));
}

const API = {
  get: (url, query = {}) => {
    if (Object.keys(query).length != 0)
      url += `?${qs.stringify(decamelizeKeys(query))}`;
    return fetch(`${apiEndpoint}${url}`, {
      ...generateAuthHeaders(),
      ...{ method: "GET" },
    })
      .then(handlerResponse)
      .catch(error => ({ error }));
  },
  post: (url, data) =>
    fetch(`${apiEndpoint}${url}`, {
      ...setContentType(data, generateAuthHeaders()),
      ...{ body: bodyData(data) },
      ...{ method: "POST" },
    })
      .then(handlerResponse)
      .catch(error => ({ error })),
  put: (url, data) =>
    fetch(`${apiEndpoint}${url}`, {
      ...setContentType(data, generateAuthHeaders()),
      ...{ body: bodyData(data) },
      ...{ method: "PUT" },
    })
      .then(handlerResponse)
      .catch(error => ({ error })),
  delete: url =>
    fetch(`${apiEndpoint}${url}`, {
      ...generateAuthHeaders(),
      ...{ method: "DELETE" },
    })
      .then(handlerResponse)
      .catch(error => ({ error })),
};

export default API;
