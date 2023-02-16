import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { theme } from "@/lib/config"
import { Provider } from "react-redux"

import Store from "@/redux/store"

const systemTheme = createTheme(theme.self.system).className
const darkTheme = createTheme(theme.self.dark).className
const lightTheme = createTheme(theme.self.light).className

const allThemes = () => {
  const themes = {}
  themes[theme.self.system.type] = systemTheme
  themes[theme.self.dark.type] = darkTheme
  themes[theme.self.light.type] = lightTheme
  if (theme.customs.length > 0) {
    theme.customs.forEach((t) => {
      themes[t.type] = createTheme(t).className
    })
  }
  return themes
}

const App = ({Component, pageProps}) => {
  return (
      <NextThemesProvider
        defaultTheme={theme.default.type}
        attribute="class"
        value={allThemes()}
      >
        <NextUIProvider>
          <Provider store={Store}>
            <Component {...pageProps} />
          </Provider>
        </NextUIProvider>
      </NextThemesProvider>
    
  )
}

export default App