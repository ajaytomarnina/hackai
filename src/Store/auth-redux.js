import { createSlice } from '@reduxjs/toolkit'

const authInitialState = {
  showBackendError: false,
}

export const AuthSlice = createSlice({
  name: 'auth-slice',
  initialState: authInitialState,
  reducers: {
    setShowBackendError(state, action) {
      state.showBackendError = action.payload
    },
  },
})

export const AuthActions = AuthSlice.actions

const loginInitialState = {
  userName: '',
  emailInput: '',
  isEmailValid: false,
  passwordInput: '',
  isPasswordValid: false,
}

const LoginSlice = createSlice({
  name: 'login-slice',
  initialState: loginInitialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload
    },
    setEmailInput(state, action) {
      state.emailInput = action.payload
    },
    setEmailValidity(state, action) {
      state.isEmailValid = action.payload
    },
    setPasswordInput(state, action) {
      state.passwordInput = action.payload
    },
    setPasswordValidity(state, action) {
      state.isPasswordValid = action.payload
    },
  },
})

export const LoginActions = LoginSlice.actions

export default LoginSlice
