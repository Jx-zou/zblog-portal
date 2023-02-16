import React, { useRef } from 'react';

import PropTypes from 'prop-types'

import styles from './parallaxTiltEffectCard.module.scss'

const ParallaxTiltEffectCard = ({ children, onClick, tiltEffect, width, height, bgColor }) => {
  const container = useRef()

  const onMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    let X, Y
    if (tiltEffect === 'normal') {
      X = (-(offsetX - ((width) / 2)) / 3) / 3
      Y = ((offsetY - ((height) / 2)) / 3) / 3
    } else {
      X = ((offsetX - ((width) / 2)) / 3) / 3
      Y = (-(offsetY - ((height) / 2)) / 3) / 3
    }
    dynamicStyle(X.toFixed(2), Y.toFixed(2), (80 - (X / 4).toFixed(2)) + '%', (50 - (Y / 4).toFixed(2)) + '%')
  }
  const onMouseEnter = () => {
    setTransition('none')
  }
  const onMouseLeave = () => {
    setTransition('transform .6s 1s')
    dynamicStyle(0, 0, '80%', '50%')
  }
  const dynamicStyle = (rX, rY, bX, bY) => {
    container.current.style.transform = 'rotateX(calc(' + rX + ' * 1deg)) rotateY(calc(' + rY + ' * 1deg))'
    container.current.style.backgroundPositionX = bY
    container.current.style.backgroundPositionY = bX
  }
  const setTransition = (value) => {
    container.current.style.transition = value
  }
  return (
    <div className={styles.wrap} onClick={onClick} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
      <div ref={container} className={styles.container} style={{ background: bgColor }}>
        {children}
      </div>
    </div>
  )
}

ParallaxTiltEffectCard.defaultProps = {
  tiltEffect: 'reverse',
  width: 300,
  height: 360,
  bgColor: 'var(--nextui-colors-backgroundAlpha)'
}

ParallaxTiltEffectCard.prototype = {
  children: PropTypes.element.isRequired,
  tiltEffect: PropTypes.oneOf(['normal', 'reverse']),
  width: PropTypes.number,
  height: PropTypes.number,
  bgColor: PropTypes.string
}

export default ParallaxTiltEffectCard
