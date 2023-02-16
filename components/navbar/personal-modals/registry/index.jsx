import useDynamicInput from '@/hook/useDynamicInput'
import { SvgButton } from '@/layouts/styles'
import { FETCH_MAIL_URL, FETCH_REGISTRY_URL } from '@/lib/api'
import { createInputHelper } from '@/lib/common'
import { SendMail } from '@/lib/icons'
import { changeRegistryVisible } from '@/redux/slices/personalSlice'
import { changeLoginState, changeUserinfo } from '@/redux/slices/userSlice'
import { Button, Input, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '@/styles/Global.module.scss'
import { PROJECT_INPUT_TIP, PROJECT_NAME, PROJECT_REGS } from '@/lib/constants'
import usePermission from '@/hook/usePermission'
import { RSAEncrypt } from '@/lib/utils'
import JSEncrypt from 'jsencrypt'

const RegistryModal = () => {
  const [sending, setSending] = useState(false)
  const [registering, setRegistering] = useState(false)

  const [errorPrompt, setErrorPrompt] = useState('')
  const [countdown, setCountdown] = useState()
  const [countdownInterval, setCountdownInterval] = useState()

  const registryVisible = useSelector((state) => state.personal.registryVisible)
  const dispatch = useDispatch()

  const [nickname, nicknameReset, nicknameBindings] = useDynamicInput()
  const [password, passwordReset, passwordBindings] = useDynamicInput()
  const [email, emailReset, emailBindings] = useDynamicInput()
  const [code, codeReset, codeBindings] = useDynamicInput()

  const [nicknameValid, setNicknameValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [codeValid, setCodeValid] = useState(false)

  const isValid = () => (nicknameValid && passwordValid && emailValid && codeValid) ? true : false

  const validateNickname = (value) => value.match(PROJECT_REGS.nickname)
  const validatePassword = (value) => value.match(PROJECT_REGS.password)
  const validateEmail = (value) => value.match(PROJECT_REGS.email)
  const validateCode = (value) => value.match(PROJECT_REGS.validCode)

  const nicknameHelper = useMemo(() => createInputHelper(nickname, validateNickname, setNicknameValid, PROJECT_INPUT_TIP.error.nickname, 'error', 'success'), [nickname])
  const passwordHelper = useMemo(() => createInputHelper(password, validatePassword, setPasswordValid, PROJECT_INPUT_TIP.error.password.registry, 'error', 'success'), [password])
  const emailHelper = useMemo(() => createInputHelper(email, validateEmail, setEmailValid, PROJECT_INPUT_TIP.error.email, 'error', 'success'), [email])
  const codeHelper = useMemo(() => createInputHelper(code, validateCode, setCodeValid, PROJECT_INPUT_TIP.error.validCode, 'error', 'success'), [code])

  const { publickey, zblogId } = usePermission()

  const registryHandler = async () => {
    if (!isValid()) return
    if (registering) return
    setRegistering(true)
    const instance = new JSEncrypt()
    instance.setPublicKey(publickey)
    await fetch(FETCH_REGISTRY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'ZBGID': zblogId
      },
      mode: 'cors',
      body: JSON.stringify({
        nickname: instance.encrypt(nickname),
        password: instance.encrypt(password),
        email: instance.encrypt(email),
        code: instance.encrypt(code)
      })
    })
      .then(res => {
        cookieUtils.set('ZBGUK', res.headers.get('ZBGUK'))
        return res.json()
      })
      .then(json => {
        if (json.state === 200) {
          dispatch(changeLoginState(true))
          dispatch(changeUserinfo({ userinfo: json.value.userinfo }))
          dispatch(changeRegistryVisible(false))
          return
        }
        setErrorPrompt(json.value || '注册失败')
      })
      .catch(err => console.error(err))
      .finally(() => setRegistering(false))
  }

  const sendMailHandler = () => {
    setCountdown(60)
    setSending(true)
    setCountdownInterval(setInterval(() => {
      setCountdown(countdown => {
        if (countdown === 1) {
          setSending(false)
          clearInterval(countdownInterval)
        }
        return countdown - 1
      })
    }, 1000))
    sendMail()
  }

  const sendMail = async () => {
    await fetch(FETCH_MAIL_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'ZBGID': zblogId
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(json => {
        if (json.state !== 200) {
          setErrorPrompt(json.value || "发送失败")
        }
      })
      .catch(err => console.error(err))
  }

  const closeHandler = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval)
    }
    dispatch(changeRegistryVisible(false))
  }

  return (
    <Modal open={registryVisible} onClose={() => dispatch(changeRegistryVisible(false))} css={{ backgroundColor: '$accents1' }} closeButton preventClose aria-labelledby='Registry modal'>
      <Modal.Header justify='flex-start' aria-labelledby='registry title'>
        <Text id='registry-panel-title' css={{ bgClip: 'text', textGradient: '45deg, $blue600 -20%, $purple600 60%, $yellow600 100%', mb: '$0' }} size={18}>
          Welcome to join
          <Text b size={18}> {PROJECT_NAME}</Text>
        </Text>
      </Modal.Header>
      <Modal.Body aria-labelledby='registry panel'>
        <Input
          {...nicknameBindings}
          type='text'
          clearable
          labelLeft='nickname'
          onClearClick={nicknameReset}
          status={nicknameHelper.color}
          color={nicknameHelper.color}
          helperColor={nicknameHelper.color}
          helperText={nicknameHelper.text}
          aria-label='nickname input'
          css={{ mb: '$9' }}
        />
        <Input.Password
          {...passwordBindings}
          type='password'
          clearable
          labelLeft='password'
          onClearClick={passwordReset}
          status={passwordHelper.color}
          color={passwordHelper.color}
          helperColor={passwordHelper.color}
          helperText={passwordHelper.text}
          aria-label='Registry Password input'
          css={{ mb: '$9' }}
        />
        <Input
          {...emailBindings}
          type='email'
          clearable
          labelLeft='email'
          onClearClick={emailReset}
          status={emailHelper.color}
          color={emailHelper.color}
          helperColor={emailHelper.color}
          helperText={emailHelper.text}
          aria-label='Email input'
          css={{ mb: '$9' }}
        />
        <Input
          {...codeBindings}
          type='number'
          clearable
          contentRightStyling={false}
          placeholder='valid code'
          contentLeft={sending ? <Text>{countdown}</Text> : ''}
          contentRight={
            <SvgButton
              disabled={sending}
              onClick={sendMailHandler}
              css={{
                mr: '$5',
                cursor: sending ? 'auto' : 'pointer',
                '& svg': { opacity: sending ? '0.4' : '1' },
                '&:hover': { '& svg': { opacity: sending ? '0.4' : '0.7' } },
                '&:active': { '& svg': { opacity: sending ? '0.4' : '0.2' } }
              }}>
              <SendMail />
            </SvgButton>
          }
          onClearClick={codeReset}
          status={codeHelper.color}
          color={codeHelper.color}
          helperColor={codeHelper.color}
          helperText={codeHelper.text}
          className={styles['number-input']}
          aria-label='Valid code input'
        />
        <Row justify='flex-end' align='center' css={{ mt: '$3' }}>
          <Text css={{ ml: '$0', mr: 'auto' }} color='error'>{errorPrompt}</Text>
          <Button auto color='error' css={{ mr: '$5' }} onPress={closeHandler}>退出</Button>
          <Button auto disabled={!isValid()} onPress={registryHandler}>{registering ? <Loading color='currentColor' type="spinner" size="lg" /> : '注册'}</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default RegistryModal