import { createSlice } from "@reduxjs/toolkit";


export const CardSlice = createSlice({
  name: 'card',
  initialState: {
    isView: false,
    item: {}
  },
  reducers: {
    changeCardView: (state, action) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { changeCardView } = CardSlice.actions

export default CardSlice.reducer