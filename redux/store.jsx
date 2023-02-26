import { configureStore } from "@reduxjs/toolkit";

/* reducers:  */
import AudioReducer from "./slices/audioSlice";
import ThemeReducer from "./slices/themeSlice";
import PersonalReducer from "./slices/personalSlice";
import UserReducer from "./slices/userSlice";
import GlobalReducer from "./slices/globalSlice"
import ArticleReducer from './slices/articleSlice'

export default configureStore({
  reducer: {
    theme: ThemeReducer,
    audio: AudioReducer,
    user: UserReducer,
    personal: PersonalReducer,
    global: GlobalReducer,
    article: ArticleReducer
  }
})