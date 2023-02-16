import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeCurrentTime, changeDuration } from "@/redux/slices/audioSlice"
import { background } from "@/lib/config"

const audioVolume = 0.1

const AudioSelf = () => {
  const audioRef = useRef()
  const isPlay = useSelector((state) => state.audio.isPlay)
  const dispatch = useDispatch()
  
  const togglePlay = (isPlay, audio) => {
    isPlay ? audio.play() : audio.pause()
  }

  useEffect(() => {
    const audio = audioRef.current
    audio.load()
    audio.volume = audioVolume
    togglePlay(isPlay, audio)
  }, [dispatch, isPlay])

  return (
    <audio src={background.default.music.url} hidden loop 
      onDurationChange = {() => {dispatch(changeDuration({duration: audioRef.current.duration}))}}
      onTimeUpdate = {() => {dispatch(changeCurrentTime({currentTime: audioRef.current.currentTime}))}}
      ref={audioRef}/>
  )
}

export default AudioSelf