import { background } from '@/lib/config';
import { createSlice } from '@reduxjs/toolkit';

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    global: {
      current: ''
    },
    background: {
      mode: background.default.mode,
      color: background.default.color
    }
  },
  reducers: {
    changeBgTheme: (state, action) => {
      let mode = action.payload.mode;
      let color = action.payload.color;
      if (mode && (background.modes.includes(mode))) {
        state.background.mode = mode;
      }
      if (color && (background.colors.includes(color) || color === background.default.color)) {
        state.background.color = color;
      }
    }
  }
})

export const { changeBgTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;