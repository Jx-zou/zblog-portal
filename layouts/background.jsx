import React from "react"

import { useSelector } from "react-redux"
import CharacterRain from "@/components/background/character-rain"
import Fluid from "@/components/background/fluid/fluid"
import { styled } from "@nextui-org/react"
import { background } from "@/lib/config"
import ColorsParticle from "@/components/background/particles"

const StyledBackground = styled('div', {
  position: 'fixed',
  top: 0,
  zIndex: background.default.zIndex,
  minSize: '100%'
})

const Background = () => {
  const [mode, color] = useSelector((state) => {
    let background = state.theme.background
    return [background.mode, background.color]
  })

  const switchBackground = () => {
    switch (mode) {
      case 'default': return <div style={{ width: '100%', height: '100%', backgroundColor: color }} />
      case 'rain': return <CharacterRain />
      case 'fluid': return <Fluid />
      case 'particle': return <ColorsParticle />
    }
  }

  return (
    <StyledBackground>
      {switchBackground()}
    </StyledBackground>
  )
}

export default Background