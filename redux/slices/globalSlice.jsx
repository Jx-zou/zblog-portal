import { createSlice } from "@reduxjs/toolkit"

export const GlobalSlice = createSlice({
  name: 'global',
  initialState: {
    auth: {
      cid: '',
      pkey: '',
      token: '',
    },
    search: {
      value: ''
    }
  },
  reducers: {
    changeAuth: (state, action) => {
      Object.assign(state.auth, action.payload)
    },
    changeSearch: (state, action) => {
      state.search.value = action.payload.value
    }
  }
})

export const { changeAuth, changeSearch } = GlobalSlice.actions

export default GlobalSlice.reducer