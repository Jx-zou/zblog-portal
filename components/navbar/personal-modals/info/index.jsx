import DbInput from '@/components/common/double-input'
import { FETCH_CHANGE_USERINFO_URL, FETCH_UPLOAD_AVATAR_URL, FETCH_UPLOAD_URL } from '@/lib/api'
import { COOKIE_NAMES, httpHeaders, HTTP_HEADERS, PROJECT_USER } from '@/lib/constants'
import { CookieUtils } from '@/lib/utils'
import { changeInfoVisible } from '@/redux/slices/personalSlice'
import { changeUserinfo } from '@/redux/slices/userSlice'
import { Avatar, Col, Grid, Modal, styled } from '@nextui-org/react'
import { useMemo, useRef, useState } from 'react'
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
  const [avatar, setAvatar] = useState(info.avatar)

  const isChange = useMemo(() => {
    return !(info.nickname === nickname && info.desc === desc)
  }, [desc, nickname, info.desc, info.nickname])

  const uploadAvatarHandler = async (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    const formdata = new FormData()
    formdata.append('file', file)
    await fetch(FETCH_UPLOAD_AVATAR_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: CookieUtils.get(COOKIE_NAMES.TOKEN)
      },
      body: formdata,
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          setAvatar(json.url)
        }
      })
      .catch(err => console.error(err))
  }

  const userinfo = useMemo(() => {
    return {
      nickname: nickname,
      desc: desc
    }
  }, [desc, nickname])

  const reset = () => {
    setNickname(info.nickname)
    setDesc(info.desc)
  }

  const userinfoHandler = async () => {
    if (!isChange()) return
    await fetch(FETCH_CHANGE_USERINFO_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: CookieUtils.get(COOKIE_NAMES.TOKEN)
      },
      body: JSON.stringify(userinfo),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          dispatch(changeUserinfo({ userinfo: userinfo }))
          return
        }
        reset()
      })
      .catch((err) => {
        reset()
        console.error(err)
      })
  }

  const closeHandler = () => {
    userinfoHandler()
    dispatch(changeInfoVisible(false))
  }

  const avatarClickHandler = () => {
    imageInputRef.current.click()
  }

  return (
    <Modal css={{ backgroundColor: '$purple800', overflow: 'initial' }} open={infoVisible} onClose={closeHandler} aria-labelledby='Userinfo modal'>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <StyledAvatar pointer css={{ size: '$20' }} src={avatar} alt={PROJECT_USER.avatar.alt} zoomed bordered onClick={avatarClickHandler} />
          <StyledInput type='file' multiple accept='image/*,.wav,.jpg,.png,.gif,.jpeg,.svg' onChange={(e) => uploadAvatarHandler(e)} ref={imageInputRef} />
        </Grid>
        <Grid xs={6}>
          <Col>
            <DbInput css={{ fontWeight: '500', fontSize: '$xl' }} ariaLabel='Nickname view' value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <DbInput css={{ fontSize: '$xs', fontWeight: '100' }} ariaLabel='Nickname view' value={desc} onChange={(e) => setDesc(e.target.value)} />
          </Col>
        </Grid>
      </Grid.Container>
    </Modal>
  )
}

export default InfoModal