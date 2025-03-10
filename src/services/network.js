import networkInterceptor from 'services/interceptor'
import { baseUrl } from 'constants/Network'
import axios from 'axios'

const baseURL = baseUrl.api
const REQUEST_TIMEOUT = 200000

let instance = null

/**
 * @function getInstance
 * @description return axois instance
 */
const getInstance = async () => {
  if (!instance) {
    instance = await createInstance()
    networkInterceptor.register(instance)
  }
  return instance
}

/**
 * @function createInstance
 * @description create axios instance only once
 * ## We can create multiple such function to have a totally different instance of an axios (with different base url and config)
 */
const createInstance = async () => {
  instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: REQUEST_TIMEOUT,
  })

  return instance
}

/**
 * Use this to get a token to cancel an API call in mid.
 */
const getCancelToken = () => {
  const source = axios.CancelToken.source()
  return source
}

/**
 * @function applyCancelPromise
 * @param {CallableFunction} callback
 * @description Return new Promise with cancellation mechanism
 */
const applyCancelPromise = (callback) => {
  const cancelToken = getCancelToken()
  let isRequestComplete = false

  const requestCancelPromise = new Promise((resolve, reject) => {
    callback(cancelToken.token)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        isRequestComplete = true
      })
  })

  /**
   * @function abort
   * @description cancel the current request
   */
  const abort = () => {
    if (isRequestComplete) return
    cancelToken.cancel()
  }

  requestCancelPromise.abort = abort
  return requestCancelPromise
}

/**
 * @param {string} url
 * @param {*} body
 * @param {*} headers
 * @param {*} ConfigOptions
 * These config options can be passed to the api options
 * - errMsg: Error message to be shown in case of error
 * - hasFormData: to convert api data into form data
 * - fullResponse: to get the actual axios api response (only data object in the apu response is returned)
 * - hideDefaultError: to hide the default error message (use in case of custom conditional error message)
 * - onProgressCallback: to get the progress of the upload (in put and post requests)
 */
const get = (url, params = {}, headers = {}, options = {}) => {
  return applyCancelPromise((token) => {
    const urlParams = new URLSearchParams(params).toString()
    let newUrl = url
    if (urlParams) {
      newUrl = `${url}?${decodeURIComponent(urlParams)}`
    }

    // console.log('newUrl',newUrl)
    // console.log('urlParams',urlParams)
    return instance.get(newUrl, {
      headers,
      options,
      cancelToken: token,
    })
  })
}

/**
 * @param {string} url
 * @param {*} body
 * @param {*} headers
 * @param {*} ConfigOptions
 * These config options can be passed to the api options
 * - errMsg: Error message to be shown in case of error
 * - hasFormData: to convert api data into form data
 * - fullResponse: to get the actual axios api response (only data object in the apu response is returned)
 * - hideDefaultError: to hide the default error message (use in case of custom conditional error message)
 * - onProgressCallback: to get the progress of the upload (in put and post requests)
 */
const post = (url, body, headers = {}, options = {}) => {
  const finalBody = body
  return applyCancelPromise((token) => {
    return instance.post(url, finalBody, {
      headers,
      options,
      cancelToken: token,
      ...(options.onProgressCallback &&
        typeof options.onProgressCallback === 'function' && {
          onUploadProgress: (progressEvent) =>
            options.onProgressCallback(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
        }),
    })
  })
}

/**
 * @param {string} url
 * @param {*} body
 * @param {*} headers
 * @param {*} ConfigOptions
 * These config options can be passed to the api options
 * - errMsg: Error message to be shown in case of error
 * - hasFormData: to convert api data into form data
 * - fullResponse: to get the actual axios api response (only data object in the apu response is returned)
 * - hideDefaultError: to hide the default error message (use in case of custom conditional error message)
 * - onProgressCallback: to get the progress of the upload (in put and post requests)
 */
const httpPut = (url, body, headers = {}, options = {}) => {
  const finalBody = body
  return applyCancelPromise((token) => {
    return instance.put(url, finalBody, {
      headers,
      options,
      cancelToken: token,
      ...(options.onProgressCallback &&
        typeof options.onProgressCallback === 'function' && {
          onUploadProgress: (progressEvent) =>
            options.onProgressCallback(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
        }),
    })
  })
}

const httpDelete = (url, body, headers = {}, options = {}) => {
  const finalBody = body
  return applyCancelPromise((token) => {
    return instance.delete(url, finalBody, {
      headers,
      options,
      cancelToken: token,
      ...(options.onProgressCallback &&
        typeof options.onProgressCallback === 'function' && {
          onUploadProgress: (progressEvent) =>
            options.onProgressCallback(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
        }),
    })
  })
}

const patch = (url, body, headers, options = {}) => {
  const finalBody = body
  return applyCancelPromise((token) => {
    return instance.patch(url, finalBody, {
      headers,
      options,
      cancelToken: token,
    })
  })
}

getInstance()

export { get, post, httpPut, patch, httpDelete }
