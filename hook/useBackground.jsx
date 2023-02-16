import { background } from "@/lib/config";
import { changeBgTheme } from "@/redux/slices/themeSlice";

import { useSelector, useDispatch } from "react-redux";

const params = (mode, color) => ({
  mode: mode,
  color: color
})

function useBackground() {
  const [mode, color] = useSelector((state) => {
    let background = state.theme.background
    return [background.mode, background.color]
  })
  const dispatch = useDispatch()
  const isDefault = mode === 'default' ? true : false
  
  const setColor = (bgColor) => {
    if(bgColor && (mode !== background.default.mode || bgColor !== color)) {
      dispatch(changeBgTheme(params(background.default.mode, bgColor)))
    }
  }

  const setMode = (bgMode) => {
    if(bgMode && bgMode !== mode) {
      dispatch(changeBgTheme(params(bgMode, background.default.color)))
    }
  }

  return {isDefault, mode, color, setMode, setColor}
}

export default useBackground