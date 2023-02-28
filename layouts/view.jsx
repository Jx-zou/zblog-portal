import { useMemo, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroller'
import Waterfall from '@/components/common/waterfall'
import ParallaxTiltEffectCard from '@/components/common/parallax-tilt-effect-card'
import CardContext from '@/components/card/context'
import { FETCH_CARDS_URL } from '@/lib/api'
import { useDispatch, useSelector } from 'react-redux'
import { changeCardView } from '@/redux/slices/articleSlice'
import Details from '@/components/card/details'

import sampleItems from '/public/json/sampleItems.json'
import { search } from '@/lib/config'
import { CookieUtils } from '@/lib/utils'
import { COOKIE_NAMES } from '@/lib/constants'
import useAuth from '@/hook/useAuth'

const View = () => {
  const [loading, setLoading] = useState(false)
  const [isSample, setIsSample] = useState(false)
  const [cards, setCards] = useState([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1000)

  const { cid, token } = useAuth()
  const searchValue = useSelector(state => state.global.search.value)
  const dispatch = useDispatch()

  useMemo(() => {
    if (searchValue) {
      setCards([])
    }
  }, [searchValue])

  const loadMoreData = async () => {
    if (!cid && !token) {
      setIsSample(true)
      setCards([...cards, ...sampleItems.cards])
      return null
    }
    if (loading) return;
    setLoading(true)
    await fetch(`${FETCH_CARDS_URL}/${search.page.size}/${offset}`, {
      method: 'POST',
      headers: {
        cid: CookieUtils.get(COOKIE_NAMES.CLIENTID)
      },
      body: searchValue
    })
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.data.length > 0 && json.status === 2220) {
          if (isSample) {
            setCards([...json.data.data])
          }
          setOffset(offset + 1)
          setTotal(json.data.total)
          setCards([...cards, ...json.data.data])
          return
        }
        setIsSample(true)
        setCards([...cards, ...sampleItems.cards])
      })
      .catch(e => {
        setIsSample(true)
        setCards([...cards, ...sampleItems.cards])
        console.log(e)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreData}
        hasMore={offset * search.page.size < total}
        threshold={300}
        useWindow
      >
        <Waterfall>
          {cards.map((card, index) => {
            return (
              <ParallaxTiltEffectCard tiltEffect='reverse' key={index} onClick={() => dispatch(changeCardView({ isView: true, item: card }))}>
                <CardContext item={card} />
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