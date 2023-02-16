import { SvgButton } from "@/layouts/styles";
import { Sun, Moon } from "@/lib/icons";
import { useTheme } from "@nextui-org/react";

import {useTheme as useNextTheme} from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = ({className, css}) => {
  const [mounted, setMounted] = useState(false)
  const {setTheme} = useNextTheme();
  const {isDark} = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <SvgButton
      aria-label="toggle a light and dark color scheme"
      className={['themeToggle', {className}]}
      css={{mx: '$4', ...css}}
      onClick={handleToggleTheme}
    >
      {isDark ? <Sun filled size={20} /> : <Moon filled className="theme-selector-icon" size={20} />}
    </SvgButton>
  )
}

export default ThemeToggle