import Masonry from 'react-masonry-css'

import PropTypes from 'prop-types'

import styles from './waterfall.module.scss'

const Waterfall = ({ children, breakpointColumnsObj }) => {

  return (
    <Masonry
      className={styles.masonryGrid}
      breakpointCols={breakpointColumnsObj}
      columnClassName='masonryGridColumn'>
      {children}
    </Masonry>
  )
}

Waterfall.defaultProps = {
  breakpointColumnsObj: {
    default: 5,
    1700: 4,
    1300: 3,
    950: 2,
    550: 1
  }
}

Waterfall.propTypes = {
  breakpointColumnsObj: PropTypes.objectOf(PropTypes.number)
}

export default Waterfall