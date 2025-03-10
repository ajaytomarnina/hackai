import { combineReducers, configureStore } from '@reduxjs/toolkit'
import LoginSlice, { AuthSlice } from 'Store/auth-redux'
import GlobalSlice, { DashboardSlice } from './global-redux'

const CLEAR_STATE = 'CLEAR_STATE'

const appReducer = combineReducers({
  auth: AuthSlice.reducer,
  login: LoginSlice.reducer,
  global: GlobalSlice.reducer,
  dashboard: DashboardSlice.reducer,
})

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STATE) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
})

export default store
