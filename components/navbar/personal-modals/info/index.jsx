import DbInput from '@/components/common/double-input'
import { FETCH_UPLOAD_URL, FETCH_USER_URL } from '@/lib/api'
import { PROJECT_USER } from '@/lib/constants'
import { cookieUtils } from '@/lib/utils'
import { changeInfoVisible } from '@/redux/slices/personalSlice'
import { changeUserinfo } from '@/redux/slices/userSlice'
import { Avatar, Col, Grid, Modal, Row, styled, Text, User } from '@nextui-org/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const StyledAvatar = styled(Avatar, {
  transform: 'translateY(-50%)',
  m: '0 auto',
})

const StyledInput = styled('input', {
  display: 'none'
})

const InfoModal = () => {
  const imageInputRef = useRef()
  const infoVisible = useSelector((state) => state.personal.infoVisible)
  const info = useSelector((state) => state.user.info)

  const dispatch = useDispatch()

  const [nickname, setNickname] = useState(info.nickname)
  const [desc, setDesc] = useState(info.desc)
  const [mail, setMail] = useState(info.mail)
  const [avatarUrl, setAvatarUrl] = useState(info.avatar.url)

  const isChange = () => !(info.nickname === nickname && info.desc === desc && info.mail === mail)

  const uploadAvatarHandler = async (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('type', 'user')
    formdata.append('file', file)
    await fetch(FETCH_UPLOAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        'ZBGUK': cookieUtils.get('ZBGUK')
      },
      body: formdata,
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          setAvatarUrl(json.url)
        }
      })
      .catch(err => console.error(err))
  }

  const userinfo = (nickname, mail, desc) => {
    return {
      nickname: nickname,
      mail: mail,
      desc: desc
    }
  }

  const reset = () => {
    setNickname(info.nickname)
    setMail(info.mail)
    setDesc(info.desc)
  }

  const putUserinfo = async () => {
    if (!isChange()) return
    console.log(isChange())
    const info = userinfo(nickname, mail, desc)
    await fetch(FETCH_USER_URL, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'ZBGUK': cookieUtils.get('ZBGUK'),
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(info),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          dispatch(changeUserinfo({ userinfo: info }))
          return
        }
        reset()
      })
      .catch((err) => {
        reset()
        console.error(err)
      })
  }

  const onCloseHandler = () => {
    putUserinfo()
    dispatch(changeInfoVisible(false))
  }

  const avatarClickHandler = () => {
    imageInputRef.current.click()
  }

  return (
    <Modal css={{ backgroundColor: '$purple800', overflow: 'initial' }} open={infoVisible} onClose={onCloseHandler} aria-labelledby='Userinfo modal'>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <StyledAvatar pointer css={{ size: '$20' }} src={avatarUrl} alt={PROJECT_USER.avatar.alt} zoomed bordered onClick={avatarClickHandler} />
          <StyledInput type='file' multiple accept='image/*,.wav,.jpg,.png,.gif,.jpeg,.svg' onChange={(e) => uploadAvatarHandler(e)} ref={imageInputRef} />
        </Grid>
        <Grid xs={6}>
          <Col>
            <DbInput css={{ fontWeight: '500', fontSize: '$xl' }} ariaLabel='Nickname view' value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <DbInput css={{ fontSize: '$xs', fontWeight: '100' }} ariaLabel='Nickname view' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <DbInput css={{ fontSize: '$md', fontWeight: '400', color: '$primary' }} ariaLabel='Nickname view' value={mail} onChange={(e) => setMail(e.target.value)} />
          </Col>
        </Grid>
      </Grid.Container>
    </Modal>
  )
}

export default InfoModal