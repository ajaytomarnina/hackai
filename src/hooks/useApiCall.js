import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// interface ApiConfigs {
//   successMsg?: string;
//   errorMsg?: string;
//   callBack?: ({
//     isError,
//     response,
//   }: {
//     isError: boolean;
//     response: Record<string, any>;
//   }) => void;
// }

// type ReturnProps<T> = [
//   callApi: (params?: T, configs?: ApiConfigs) => void,
//   loading: boolean,
//   data: any,
//   error: any
// ];

/**
 * ## UseApiCall - is a custom hook, use this to make HTTP API calls
 * ----
 * ### Returns - [makeCallApiFunction, loadingState, successData, errorData]
 * ----
 * @param apiCallService API call service function, that must be defined in service file
 * @param onSuccess optional callback, called on api success
 * @param onFail optional callback, called on api failure
 */
function UseApiCall(apiCallService, onSuccess, onFail) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  /**
   *
   * @param params - directly passed to api service function
   * @param configs - optional configs
   *  - successMsg - optional success message
   *  - errorMsg - optional error message
   *  - hideDefaultError - optional, if true, default error message will not be shown
   *  - callBack - optional, if true, callback will be called on success
   * */

  const callApi = async (params, configs = {}) => {
    setLoading(true)
    apiCallService(params || {})
      .then((response) => {
        if (configs.successMsg)
          enqueueSnackbar(configs.successMsg, { variant: 'success' })
        const finalData = response.data
        setData(finalData)
        if (onSuccess) {
          onSuccess(finalData, response.headers)
        }

        if (configs.callBack)
          configs.callBack({ isError: false, response: finalData })
      })
      .catch((err) => {
        dispatch({ type: 'CLEAR_STATE' })
        navigate('/login?mode=email')
        setError(err)
        if (onFail) {
          onFail(err)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return [callApi, loading, data, error]
}

export default UseApiCall
