import { Modal, styled } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

import { changeWriteArticleVisible } from '@/redux/slices/personalSlice'

import Editor from '@/components/markdown/editor'

const StyledEditor = styled('div', {
  width: '100%',
  height: '100%',
  m: '$0 auto',
  '@md': {
    width: '80%'
  }
})

const WriteArticleModal = () => {
  const writeArticleVisible = useSelector((state) => state.personal.writeArticleVisible)
  const dispatch = useDispatch()

  const closeHandler = () => {
    dispatch(changeWriteArticleVisible(false))
  }

  return (
    <Modal fullScreen css={{ borderRadius: '$0', backgroundColor: '$backgroundAlpha' }} open={writeArticleVisible} onClose={closeHandler} closeButton preventClose aria-labelledby='Write article modal'>
      <Editor />
    </Modal>
  )
}

export default WriteArticleModal