import { SvgButton } from "@/layouts/styles"
import { PROJECT_BGSOUND_NAME } from "@/lib/constants"
import { Pause, Play } from "@/lib/icons"
import { toggleAudioPlay } from "@/redux/slices/audioSlice"
import { Badge, Progress, Row, styled, Text } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"

const StyledPlayer = styled('div', {
  width: '100%',
  height: '100%',
  p: '$2',
  backgroundColor: '$backgroundAlpha',
  border: '$yellow500 1px solid',
  borderRadius: '0.2rem'
})

const audioMax = 100

const AudioPlayer = () => {
  const [isPlay, duration, currentTime] = useSelector((state) => {
    const audio = state.audio
    return [audio.isPlay, audio.duration, audio.currentTime]
  })
  const dispatch = useDispatch()

  const timeFormat = (time) => {
    let m = Math.floor(time / 60)
    let s = Math.floor(time % 60)
    if (s < 10) {
      return `${m}:0${s}`
    }
    return `${m}:${s}`
  }

  return (
    <StyledPlayer>
      <Row align="center" justify="flex-start">
        <Badge isSquared variant='flat' color='warning' >{PROJECT_BGSOUND_NAME}</Badge>
        <Text small css={{ border: '$primary 1px solid', mr: '0', ml: 'auto' }} color="primary">`T: {timeFormat(currentTime)} / {timeFormat(duration)}`</Text>
      </Row>
      <Row align="center">
        <Progress
          css={{ width: '10rem', height: '1rem', mt: '$1' }}
          squared='true'
          color='primary'
          status='primary'
          value={(currentTime / duration) * audioMax}
          max={audioMax}
          size='md' />
        <SvgButton css={{ p: '0', ml: '$2' }} onClick={() => dispatch(toggleAudioPlay())}>
          {isPlay ? <Pause size={25} /> : <Play size={25} />}
        </SvgButton>
      </Row>
    </StyledPlayer>
  )
}

export default AudioPlayer