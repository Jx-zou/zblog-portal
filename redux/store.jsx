import { configureStore } from "@reduxjs/toolkit";

/* reducers:  */
import AudioReducer from "./slices/audioSlice";
import ThemeReducer from "./slices/themeSlice";
import PersonalReducer from "./slices/personalSlice";
import UserReducer from "./slices/userSlice";
import InitialReducer from "./slices/initialSlice"
import ContentReducer from './slices/contentSlice'

export default configureStore({
  reducer: {
    theme: ThemeReducer,
    audio: AudioReducer,
    user: UserReducer,
    personal: PersonalReducer,
    initial: InitialReducer,
    content: ContentReducer
  }
})