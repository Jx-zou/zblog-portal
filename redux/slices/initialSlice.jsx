import { createSlice } from "@reduxjs/toolkit"


export const InitialSlice = createSlice({
  name: 'initial',
  initialState: {
    data: {
      permission: {
        publickey: '',
        zblogId: '',
      }
    }
  },
  reducers: {
    initialize: (state, action) => {
      Object.assign(state.data, action.payload.data)
    },
  }
})

export const { initialize } = InitialSlice.actions

export default InitialSlice.reducer