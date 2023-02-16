import { useState } from 'react'

import InfiniteScroll from 'react-infinite-scroller'
import Waterfall from '@/components/common/waterfall'
import ParallaxTiltEffectCard from '@/components/common/parallax-tilt-effect-card'
import CardContext from '@/components/card/card-context'
import { FETCH_CARDS_URL } from '@/lib/api'
import { useDispatch } from 'react-redux'
import { changeCardView } from '@/redux/slices/contentSlice'
import Details from '@/components/card/details'

const View = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [detailsItem, setDetailsItem] = useState({})
  const dispatch = useDispatch()

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true)
    await fetch(FETCH_CARDS_URL)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHasMore(items ? true : false)
          setItems([...items, ...data.items])
        }
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMoreData}
        hasMore={hasMore}
        threshold={300}
        useWindow
      >
        <Waterfall>
          {items.map((item, index) => {
            return (
              <ParallaxTiltEffectCard tiltEffect='reverse' key={index} onClick={() => dispatch(changeCardView({ isView: true, item: item }))}>
                <CardContext item={item} />
              </ParallaxTiltEffectCard>
            )
          })}
        </Waterfall>
      </InfiniteScroll>
      <Details />
    </>
  )
}

export default View