import { createSlice } from "@reduxjs/toolkit"

export const GlobalSlice = createSlice({
  name: 'global',
  initialState: {
    search: {
      value: ''
    }
  },
  reducers: {
    changeSearch: (state, action) => {
      Object.assign(state.search, action.payload.search)
    }
  }
})

export const { changeAuth, changeSearch } = GlobalSlice.actions

export default GlobalSlice.reducer