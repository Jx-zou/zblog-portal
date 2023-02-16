import { Link, styled, Text, useTheme } from "@nextui-org/react"

import { Logo as LogoIcon } from "@/lib/icons"
import { PROJECT_HOST, PROJECT_NAME } from "@/lib/constants"
import useBackground from "@/hook/useBackground"
import { logo } from "@/lib/config"

const StyledLogo = styled('div', {
  position: 'fixed',
  top: '5%',
  left: '0.5rem',
  zIndex: 'var(--nextui-zIndices-5)',
  w: '10%',
  ta: 'center',
  cursor: 'pointer'
})

const getColor = (isDefault, isDark) => {
  if (isDefault && !isDark) {
    return logo.color.light
  }
  return logo.color.dark
}

const Logo = () => {
  const { isDefault } = useBackground()
  const { isDark } = useTheme()
  const color = getColor(isDefault, isDark)

  return (
    <a href={PROJECT_HOST}>
      <StyledLogo>
        <LogoIcon size={36} fill={color} />
        <Text h3 weight='bold' color={color} hideIn='sm'>
          {PROJECT_NAME}
        </Text>
      </StyledLogo>
    </a>
  )
}

export default Logo