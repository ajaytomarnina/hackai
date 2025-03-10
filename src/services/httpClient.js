import axios from "axios";
import { baseUrl } from "constants/Network";


const isProdEnvironment = process.env.REACT_APP_NODE_ENV === "production";
axios.defaults.baseURL = baseUrl.api;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;

const getTimeout = () => 20000;

function requestInterceptor(request) {
  return request;
}

function responseInterceptor(response) {
  return response;
}

function handleResponseError(e) {
  if (!isProdEnvironment)
    console.log("httpClient.error", e.config.url, JSON.stringify(e));

  const error = e;
  error.log = e.message;


  return Promise.reject(error);
}

axios.interceptors.request.use(requestInterceptor);

axios.interceptors.response.use(responseInterceptor, handleResponseError);

const httpClient = {
  get: (
    path,
    params = {},
    headers = {},
    options = {},
  ) =>
    axios.get(path, {
      timeout: getTimeout(),
      params,
      headers,
      ...options,
    }),
  post: (path, data, params = {}, headers = {}) =>
    axios.post(path, data, {
      timeout: getTimeout(),
      params,
      headers,
    }),
  patch: (path, data, params = {}, headers = {}) =>
    axios.patch(path, data, {
      timeout: getTimeout(),
      params,
      headers,
    }),
  put: (path, data, params = {}, headers = {}) =>
    axios.put(path, data, {
      timeout: getTimeout(),
      params,
      headers,
    }),

  delete: (path, data, params = {}, headers = {}) =>
    axios.delete(path, {
      timeout: getTimeout(),
      data,
      params,
      headers,
      withCredentials: true
    }),
};

export default httpClient;
