import { useState, useEffect } from "react"


function useWindowSize(width, height) {
  const [windowWidth, setWindowWidth] = useState(width | 0)
  const [windowHeight, setWindowHeight] = useState(height | 0)

  function updateSize(width, height) {
    setWindowWidth(width)
    setWindowHeight(height)
  }

  useEffect(() => {
    updateSize(window.innerWidth, window.innerHeight)
    window.onresize = () => {
      updateSize(window.innerWidth, window.innerHeight)
    }
  }, [])

  return [windowWidth, windowHeight, setWindowWidth, setWindowHeight]
}

export default useWindowSize