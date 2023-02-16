import { createSlice } from "@reduxjs/toolkit";


export const PersonalSlice = createSlice({
  name: 'personal',
  initialState: {
    infoVisible: false,
    loginVisible: false,
    logoutVisible: false,
    registryVisible: false,
    writeArticleVisible: false,
    articleManagerVisible: false
  },
  reducers: {
    changeInfoVisible: (state, action) => {
      state.infoVisible = action.payload
    },
    changeLoginVisible: (state, action) => {
      state.loginVisible = action.payload
    },
    changeLogoutVisible: (state, action) => {
      state.logoutVisible = action.payload
    },
    changeRegistryVisible: (state, action) => {
      state.registryVisible = action.payload
    },
    changeWriteArticleVisible: (state, action) => {
      state.writeArticleVisible = action.payload
    },
    changeArticleManagerVisible: (state, action) => {
      state.articleManagerVisible = action.payload
    },
  }
})

export const {changeInfoVisible, changeLoginVisible, changeLogoutVisible, changeRegistryVisible, changeWriteArticleVisible, changeArticleManagerVisible} = PersonalSlice.actions

export default PersonalSlice.reducer