import { PROJECT_INPUT_TIP, PROJECT_NAME } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";


export const ArticleSlice = createSlice({
  name: 'article',
  initialState: {
    isView: false,
    item: {
      author: {
        name: PROJECT_NAME,
        desc: PROJECT_INPUT_TIP.default.welcome,
        avatar: {
          url: "/images/head.png"
        }
      }
    }
  },
  reducers: {
    changeCardView: (state, action) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { changeCardView } = ArticleSlice.actions

export default ArticleSlice.reducer