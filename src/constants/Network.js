const URL = {
  refreshToken: 'refresh-token',
  signOut: '/sign-out',
  agentList: '/agent/list',
  createClient: '/client/create',
  attachAgentToClient: '/client/{clientId}/agent/{agentId}',
}

const baseUrl = {
  api: (() => {
    const env = process.env.REACT_APP_NODE_ENV || "production";

    switch (env) {
      case "production":
        return "https://hedwigtest.wyzard.in/api/v1";
      case "staging":
        return "https://hedwigtest.wyzard.in/api/v1";
      default: // local/dev
        return "http://localhost:8001/api/v1";
    }
  })(),
};

const COMMON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/**
 * These config options can be passed to the api options
 * errMsg: Error message to be shown in case of error
 * hasFormData - to convert api data into form data
 * fullResponse - to get the actual axios api response (only data object in the apu response is returned)
 * hideDefaultError - to hide the default error message (use in case of custom conditional error message)
 * onProgressCallback - to get the progress of the upload (in put and post requests)
 */
const DEFAULT_INTERCEPTOR_CONFIG = {
  errMsg: "",
  hasFormData: false,
  fullResponse: false,
  hideDefaultError: false,
  onProgressCallback: null,
};

export { COMMON_HEADERS, DEFAULT_INTERCEPTOR_CONFIG, baseUrl };
export default URL;
