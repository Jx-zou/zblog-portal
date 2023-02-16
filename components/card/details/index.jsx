import { SvgButton } from "@/layouts/styles"
import { DisLike, Like, Share, Star } from "@/lib/icons"
import { stringUtils } from "@/lib/utils"
import { changeCardView } from "@/redux/slices/contentSlice"
import { useCallback, useEffect, useMemo, useState } from "react"
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
  const [isView, item] = useSelector((state) => [state.content.isView, state.content.item])

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
    setTimeout(() => {
      setContent('123456')
      setFetching(false)
    }, 3000)
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return (
    <Modal open={isView} fullScreen css={{ borderRadius: '$0', backgroundColor: '$backgroundAlpha' }} onClose={closeHandler} closeButton preventClose aria-labelledby='Card view modal'>
      <Modal.Header>
        <Text h3>{item.title}</Text>
      </Modal.Header>
      <Modal.Body>
        <StyledContent css={{ ta: 'center' }}>
          {fetching ? <Loading /> : content}
        </StyledContent>
      </Modal.Body>
      <Modal.Footer justify='space-between'>
        <User as='button'
          src={item.author.avatar.url}
          name={item.author.name}
          description={item.author.desc}
        />
        <StyledIcons>
          <SvgButton onClick={starClickHandler}>
            <Star filled={collected} size={20} fill='var(--nextui-colors-warning)' />
          </SvgButton>
          <SvgButton onClick={likeClickHandler}>
            <Like size={20} fill={liked ? 'var(--nextui-colors-red700)' : 'currentColor'} />
          </SvgButton>
          <SvgButton onClick={dislikeClickHandler}>
            <DisLike size={20} fill={disliked ? 'var(--nextui-colors-gray300)' : 'currentColor'} />
          </SvgButton>
          <SvgButton>
            <Share size={20} fill='var(--nextui-colors-cyan700)' />
          </SvgButton>
        </StyledIcons>
        <Button auto size='xs' color='error' onPress={closeHandler}>关闭</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Details