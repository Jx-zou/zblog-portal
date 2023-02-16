import { createSlice } from "@reduxjs/toolkit";

export const AudioSlice = createSlice({
  name: 'audio',
  initialState: {
    isPlay: false,
    duration: 0,
    currentTime: 0
  },
  reducers: {
    toggleAudioPlay: (state) => {
      state.isPlay = state.isPlay ? false : true
    },
    changeDuration: (state, action) => {
      const time = action.payload.duration
      if (time && time !== 0) {
        state.duration = time
      }
    },
    changeCurrentTime: (state, action) => {
      state.currentTime = action.payload.currentTime
    }
  }
})

export const { toggleAudioPlay, changeDuration, changeCurrentTime } = AudioSlice.actions;

export default AudioSlice.reducer;