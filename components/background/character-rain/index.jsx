import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import styles from './characterRain.module.scss'
import useWindowSize from '@/hook/useWindowSize'

const CharacterRain = ({alphabet, fontSize, waveColor, rainbowSpeed, rainbow, matrixSpeed, hueFw}) => {
  const hue = useRef(-0.01)
  const canvasRef = useRef()
  const [width, height] = useWindowSize()

  const draw = useCallback((ctx, drops) => {
    const characters = alphabet.split("");
    if (hue.current > 10 || hue.current < -10) {
      hue.current = -0.01
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#BBB";
    ctx.font = fontSize + "px arial";
    
    for (let i = 0; i < drops.length; i++) {
      ctx.fillStyle = "rgba(10, 10, 10, 1)";
      ctx.fillRect(i * fontSize, drops[i] * fontSize, fontSize, fontSize);
      let text = characters[Math.floor(Math.random() * characters.length)];
      if (rainbow) {
        hue.current += hueFw ? 0.01 : -0.01;
        let rr = Math.floor(127 * Math.sin(rainbowSpeed * hue.current + 0) + 128);
        let rg = Math.floor(127 * Math.sin(rainbowSpeed * hue.current + 2) + 128);
        let rb = Math.floor(127 * Math.sin(rainbowSpeed * hue.current + 4) + 128);
        ctx.fillStyle = `rgba(${rr},${rg},${rb})`;
      } else {
        ctx.fillStyle = `rgba(${waveColor.r},${waveColor.g},${waveColor.b})`;
      }
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
  }, [alphabet, fontSize, height, hueFw, rainbow, rainbowSpeed, waveColor.b, waveColor.g, waveColor.r, width])

  const createDrops = (columns) => {
    let drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    return drops;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const drops = createDrops(width / fontSize);
    const interVal = setInterval(() => draw(ctx, drops), matrixSpeed);

    return () => clearInterval(interVal);
  }, [fontSize, draw, matrixSpeed, width, height])

  return <canvas className={styles.canvas} ref={canvasRef} />
}

CharacterRain.defaultProps = {
  alphabet: "QWERTYUIOPASDFGHJKLZXCVBNM",
  fontSize: 14,
  waveColor: {r: 125, g: 52, b: 253},
  rainbowSpeed: 0.5,
  rainbow: true,
  matrixSpeed: 50,
  hueFw: false
}

CharacterRain.prototype = {
  alphabet: PropTypes.string,
  fontSize: PropTypes.number,
  waveColor: PropTypes.objectOf(PropTypes.number),
  rainbowSpeed: PropTypes.number,
  rainbow: PropTypes.bool,
  matrixSpeed: PropTypes.number,
  hueFw: PropTypes.bool
}

export default CharacterRain