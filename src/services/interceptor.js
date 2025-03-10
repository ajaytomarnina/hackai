import { DEFAULT_INTERCEPTOR_CONFIG } from '../constants/Network';


let requestInterceptorRef = null;
let responseInterceptorRef = null;

/**
 * @function getDefaultHeaders
 * @description generate default headers which can be send with every request
 */
const getDefaultHeaders = () => {
  // const token = utils.getDataFromLocalStorage(TOKEN);
  let headers = {
  };
  // if (token) {
  //   headers = {
  //     // Authorization: `Bearer ${token}`,
  //   };
  // }
  return headers;
};

/**
 * @function getDefaultParams
 * @description generate default params which can be send with every GET request
 */
const getDefaultParams = () => {
  return '';
};

/**
 * @function getDefaultBody
 * @description generate default body which can be send with every POST request
 */
const getDefaultBody = () => {
  return {};
};

/**
 * @function jsonToFormData
 * @param {object} jsonObj
 * @description convert Json object to FormData
 */
const jsonToFormData = (jsonObj = {}) => {
  const formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  for (const formValue of Object.entries(jsonObj)) {
    const [dKey, dVal] = formValue;
    formData.append(dKey, dVal);
  }
  return formData;
};

/**
 * @function formatApiError
 * @param {number} status
 * @param {object} data
 * @description return API error
 */
const formatApiError = (status, data, options) => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ status, data, options });
};

/**
 * @function onRequest
 * @param {AxiosRequestConfig} config
 * @description on axois response
 */
const onRequest = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.options = { ...DEFAULT_INTERCEPTOR_CONFIG, ...config.options };

  // eslint-disable-next-line no-param-reassign
  config.headers = { ...getDefaultHeaders(), ...config.headers };

  if (config.method === 'get') {
    const defaultParams = getDefaultParams();
    if (defaultParams) {
      // eslint-disable-next-line no-param-reassign
      config.url += config.url.includes('?')
        ? `&${defaultParams}`
        : `?${defaultParams}`;
    }
  } else {
    const defaultBody = getDefaultBody();
    // eslint-disable-next-line no-param-reassign
    config.data = { ...defaultBody, ...config.data };

    // generate FormData form JSON object
    if (config.options.hasFormData) {
      // eslint-disable-next-line no-param-reassign
      config.data = jsonToFormData(config.data);
    }
  }

  // show default loader
  if (config.options.defaultLoader) {
    // configureStore.dispatch(showLoader());
  }

  if (config.data === undefined) {
    // eslint-disable-next-line no-param-reassign
    config.data = null;
  }
  return config;
};

/**
 * @function onResponseSuccess
 * @param {AxiosResponse} resp
 * @description on axois success response
 */
const onResponseSuccess = (resp) => {
  const { options } = resp.config;
  const { data } = resp;

  if (options.fullResponse) {
    return resp;
  }

  return { data, options };
};

/**
 * @function onResponseError
 * @param {AxiosError} resp
 * @description on axois error response
 */
const onResponseError = (err) => {
  const { options } = err.config || {};
  const { data, status } = err.response || { status: 0 };

  return formatApiError(status, data, options);
};

/**
 * @function registerNetworkInterceptor
 * @param {AxiosInstance} instance_
 * @description register interceptor
 */
const registerNetworkInterceptor = (instance_) => {
  // handle default configuration in request interceptor
  requestInterceptorRef = instance_.interceptors.request.use(onRequest);

  // handle default configuration in response interceptor
  responseInterceptorRef = instance_.interceptors.response.use(
    onResponseSuccess,
    onResponseError
  );
};

/**
 * @function deregisterNetworkInterceptor
 * @param {AxiosInstance} instance_
 * @description de-register interceptor
 */
const deregisterNetworkInterceptor = (instance_) => {
  // handle default configuration in request interceptor
  instance_.interceptors.request.eject(requestInterceptorRef);

  // handle default configuration in response interceptor
  instance_.interceptors.response.eject(responseInterceptorRef);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register: registerNetworkInterceptor,
  deregister: deregisterNetworkInterceptor,
};
