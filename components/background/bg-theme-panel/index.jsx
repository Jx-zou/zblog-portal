import useBackground from "@/hook/useBackground"
import { SvgButton, SvgIcon } from "@/layouts/styles"
import { background } from "@/lib/config"
import { BgThemeColor, DynamicBgTheme, Reset } from "@/lib/icons"
import { randomSelfColor } from "@/lib/utils"
import { Container, Grid, Row, styled, Text } from "@nextui-org/react"

const Label = styled(Text, {
  cursor: 'pointer',
  fontSize: 'small',
  px: '$3',
  m: '$2',
  lineHeight: '1',
  '&:hover': {
    opacity: 0.7
  },
  '&:active': {
    opacity: 0.5
  }
})

const DisplayColor = styled('div', {
  minSize: '1.5rem',
  m: '$2',
  shadow: '$sm',
  opacity: 0.8,
  '&:hover': {
    opacity: 1
  },
  '&:active': {
    opacity: 0.9
  }
})

const DTheme_fill_1 = 'var(--nextui-colors-purple700)'
const DTheme_fill_2 = 'var(--nextui-colors-blue700)'
const ColorIcons = 'var(--nextui-colors-cyan700)'

const BgThemePanel = () => {
  const {setMode, setColor} = useBackground()

  return (
    <Container justify="left" css={{p: '$xs', maxW: '20rem', minSize: '13rem', width: '14rem'}}>
      <Row>
        <SvgIcon>
          <DynamicBgTheme size={30} fill_1={DTheme_fill_1} fill_2={DTheme_fill_2} />
        </SvgIcon>
        <Grid.Container alignItems='center' css={{pt: '$4'}}>
          {background.modes.map((mode, index) => {
            const color = randomSelfColor()
            return <Label em css={{color: `${color}`, border: `${color} 1px solid`}} onClick={() => setMode(mode)} key={index}>{mode}</Label>
          })}
        </Grid.Container>
      </Row>
      <Row>
        <SvgIcon>
          <BgThemeColor size={30} fill={ColorIcons} />
        </SvgIcon>
        <Grid.Container alignItems='center' css={{pt: '$2'}}>
          {background.colors.map((color, index) => {
              return <DisplayColor onClick={() => setColor(color)} css={{backgroundColor: color, border: '1 solid' + color}} key={index} />
          })}
        </Grid.Container>
      </Row>
      <SvgButton css={{position: 'absolute', bottom: '$3', transition: 'all', '&:active': {'& svg': {transform: 'rotate(-360deg)'}}}} onClick={() => setColor(background.default.color)}>
        <Reset size={30} fill='var(--nextui-colors-red700)' />
      </SvgButton>
    </Container>
  )
}

export default BgThemePanel