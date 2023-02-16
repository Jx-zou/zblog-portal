import { changeArticleManagerVisible } from "@/redux/slices/personalSlice"
import { Modal, Text } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"


const ArticleManagerModal = () => {
  const articleManagerVisible = useSelector((state) => state.personal.articleManagerVisible)
  const dispatch = useDispatch()


  return (
    <Modal open={articleManagerVisible} onClose={() => dispatch(changeArticleManagerVisible(false))} closeButton preventClose aria-labelledby='Article manager modal'>
      <Modal.Header>
        <Text></Text>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  )
}

export default ArticleManagerModal