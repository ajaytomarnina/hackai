import { createSlice } from '@reduxjs/toolkit'

const globalSliceInitialState = {
  showSideBarMobile: false,
  showSideBarTablet: false,
  selectedOption: '1',
  scrollEffect: true,
  scrollYValue: 0,
  showTour: false,
  stepNumberInTour: 0,
  subMenu: 'all',
}

const GlobalSlice = createSlice({
  name: 'global-states',
  initialState: globalSliceInitialState,
  reducers: {
    setShowSideBarMobile(state, action) {
      state.showSideBarMobile =
        action.payload === undefined ? !state.showSideBarMobile : action.payload
    },
    setShowSideBarTablet(state, action) {
      state.showSideBarTablet =
        action.payload === undefined ? !state.showSideBarTablet : action.payload
    },
    setSelectedOption(state, action) {
      state.selectedOption = action.payload
    },
    setScrollEffect(state, action) {
      state.scrollEffect = action.payload.scrollEffect
      // console.log('action',action.payload.scrollEffect)
    },
    setScrollYValue(state, action) {
      state.scrollYValue = action.payload
      // console.log('action',action.payload)
    },
    setShowTour(state, action) {
      state.showTour = action.payload
    },
    setStepNumberInTour(state, action) {
      state.stepNumberInTour = action.payload
    },
    setSubMenu(state, action) {
      state.subMenu = action.payload
    },
  },
})

export const GlobalActions = GlobalSlice.actions

export default GlobalSlice

const dashboardInitialState = {
  companyName: '',
  isCompanyNameValid: false,
  selectedAgentId: null,
  clientId: null,
}

export const DashboardSlice = createSlice({
  name: 'dashboard-slice',
  initialState: dashboardInitialState,
  reducers: {
    setCompanyName(state, action) {
      state.companyName = action.payload
    },
    setCompanyNameValidity(state, action) {
      state.isCompanyNameValid = action.payload
    },
    setSelectedAgentId(state, action) {
      state.selectedAgentId = action.payload
    },
    setClientId(state, action) {
      state.clientId = action.payload
    },
  },
})

export const DashboardActions = DashboardSlice.actions
