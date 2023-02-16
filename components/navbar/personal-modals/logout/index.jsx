import { user } from "@/lib/config"
import { changeLogoutVisible } from "@/redux/slices/personalSlice"
import { changeUserinfo, changeLoginState } from "@/redux/slices/userSlice"
import { Button, Col, Modal, Row, Text } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"


const LogoutModal = () => {
  const logoutVisible = useSelector((state) => state.personal.logoutVisible)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(changeLoginState(false))
    dispatch(changeUserinfo({ userinfo: user.info }))
    dispatch(changeLogoutVisible(false))
  }

  return (
    <Modal open={logoutVisible} onClose={() => dispatch(changeLogoutVisible(false))} closeButton preventClose aria-labelledby='Logout modal'>
      <Modal.Header justify='flex-start' aria-labelledby='registry title'>
        <Text id='logout-panel-title' color='primary'>确认注销登录?</Text>
      </Modal.Header>
      <Modal.Body aria-labelledby='logout panel'>
        <Row align='center' justify='flex-end'>
          <Button auto color='error' css={{ mr: '$5' }} onPress={logoutHandler}>确认</Button>
          <Button auto color='success' onPress={() => dispatch(changeLogoutVisible(false))}>取消</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default LogoutModal