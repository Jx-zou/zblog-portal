import { SvgButton } from "@/layouts/styles"
import { COOKIE_NAMES, PROJECT_NAME, PROJECT_USER } from "@/lib/constants"
import { DisLike, Like, Share, Star } from "@/lib/icons"
import { CookieUtils } from "@/lib/utils"
import { changeCardView } from "@/redux/slices/articleSlice"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const { Modal, Text, Button, styled, Loading, User } = require("@nextui-org/react")

const StyledContent = styled('div', {
  width: '100%',
  height: '100%',
  m: '$0 auto',
  '@md': {
    width: '80%'
  }
})

const StyledIcons = styled("div", {
  display: 'flex',
  justifyItems: 'center',
})

const Details = () => {
  const [fetching, setFetching] = useState(false)
  const [content, setContent] = useState()
  const [isView, item] = useSelector((state) => [state.article.isView, state.article.item])

  const [collected, setCollected] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const dispatch = useDispatch()

  const closeHandler = () => dispatch(changeCardView({ isView: false }))

  const starClickHandler = () => {
    setCollected(!collected)
    fetchCollect()
  }
  const likeClickHandler = () => {
    setLiked(!liked)
    fetchLike()
  }
  const dislikeClickHandler = () => {
    setDisliked(!disliked)
    fetchDislike()
  }

  const fetchCollect = async () => {

  }

  const fetchLike = async () => {

  }

  const fetchDislike = async () => {

  }

  const fetchContent = useCallback(async () => {
    setFetching(true)
    await fetch('/' + item.url, {
      cid: CookieUtils.get(COOKIE_NAMES.CLIENTID)
    })
      .then(res => res.text())
      .then(text => {
        console.log(text)
        setContent(text)
      })
      .catch(err => console.log(err))
      .finally(() => setFetching(false))
  }, [item.url])

  useEffect(() => {
    if (isView) fetchContent()
  }, [fetchContent, isView])

  return (
    <Modal open={isView} fullScreen css={{ borderRadius: '$0', backgroundColor: '$backgroundContrast' }} onClose={closeHandler} closeButton preventClose aria-labelledby='Card view modal'>
      <Modal.Header justify='flex-start'>
        <Text color='primary' h3>{item.title}</Text>
      </Modal.Header>
      <Modal.Body>
        {fetching ? <Loading /> : <StyledContent css={{ ta: 'center' }} dangerouslySetInnerHTML={{ __html: content }} />}
      </Modal.Body>
      <Modal.Footer justify='space-between' color='$gray500'>
        <User as='button'
          src={item.avatar ? item.avatar : PROJECT_USER.avatar.alt}
          name={item.nickname}
          description={item.uprofile}
          altText={PROJECT_NAME}
        />
        <StyledIcons>
          <SvgButton onClick={starClickHandler} css={{ mx: '$5' }}>
            <Star filled={collected} size={20} fill='var(--nextui-colors-warning)' />
          </SvgButton>
          <SvgButton onClick={likeClickHandler} css={{ mx: '$5' }}>
            <Like size={20} fill={liked ? 'var(--nextui-colors-red700)' : 'currentColor'} />
          </SvgButton>
          <SvgButton onClick={dislikeClickHandler} css={{ mx: '$5' }}>
            <DisLike size={20} fill={disliked ? 'var(--nextui-colors-gray300)' : 'currentColor'} />
          </SvgButton>
          <SvgButton css={{ mx: '$5' }}>
            <Share size={20} fill='var(--nextui-colors-cyan700)' />
          </SvgButton>
        </StyledIcons>
        <Button auto size='xs' color='error' onPress={closeHandler}>关闭</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default Details