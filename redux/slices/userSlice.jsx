import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isSigned: false,
    info: {
      username: '',
      nickname: 'z-blog',
      desc: 'Welcome to z-blog',
      avatar: '/images/head.png',
    }
  },
  reducers: {
    changeLoginState: (state, action) => {
      state.isSigned = action.payload
    },
    changeUserinfo: (state, action) => {
      Object.assign(state.info, action.payload.userinfo)
    },
  }
})

export const { changeLoginState, changeUserinfo } = UserSlice.actions

export default UserSlice.reducer