import useDynamicInput from '@/hook/useDynamicInput'
import { SvgButton } from '@/layouts/styles'
import { FETCH_MAIL_CAPTCHA_URL, FETCH_REGISTRY_URL } from '@/lib/api'
import { InputHelper, refreshClientId, refreshPkey } from '@/lib/common'
import { SendMail } from '@/lib/icons'
import { changeRegistryVisible } from '@/redux/slices/personalSlice'
import { changeUserinfo } from '@/redux/slices/userSlice'
import { Button, Input, Loading, Modal, Row, Text, Textarea } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '@/styles/Global.module.scss'
import { COOKIE_NAMES, PROJECT_INPUT_TIP, PROJECT_NAME, PROJECT_REGS } from '@/lib/constants'
import { CookieUtils, RsaUtils } from '@/lib/utils'

const RegistryModal = () => {
  const [sending, setSending] = useState(false)
  const [registering, setRegistering] = useState(false)

  const [errorPrompt, setErrorPrompt] = useState('')
  const [countdown, setCountdown] = useState()

  const registryVisible = useSelector((state) => state.personal.registryVisible)
  const dispatch = useDispatch()

  const [nicknameValid, setNicknameValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [descValid, setDescValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [codeValid, setCodeValid] = useState(false)

  const [nickname, nicknameReset, nicknameBindings] = useDynamicInput(setNicknameValid)
  const [password, passwordReset, passwordBindings] = useDynamicInput(setPasswordValid)
  const [email, emailReset, emailBindings] = useDynamicInput(setEmailValid)
  const [code, codeReset, codeBindings] = useDynamicInput(setCodeValid)
  const [desc, descReset, descBindings] = useDynamicInput(setDescValid, PROJECT_INPUT_TIP.default.desc)

  const isValid = () => (nicknameValid && passwordValid && emailValid && codeValid && descValid) ? true : false

  const validateNickname = (value) => value.match(PROJECT_REGS.nickname)
  const validatePassword = (value) => value.match(PROJECT_REGS.password)
  const validateDesc = (value) => value.match(PROJECT_REGS.desc)
  const validateEmail = (value) => value.match(PROJECT_REGS.email)
  const validateCode = (value) => value.match(PROJECT_REGS.validCode)

  const nicknameHelper = useMemo(() => InputHelper.createInputHelper(nickname, validateNickname, setNicknameValid, PROJECT_INPUT_TIP.error.nickname, 'error', 'success'), [nickname])
  const passwordHelper = useMemo(() => InputHelper.createInputHelper(password, validatePassword, setPasswordValid, PROJECT_INPUT_TIP.error.password.registry, 'error', 'success'), [password])
  const emailHelper = useMemo(() => InputHelper.createInputHelper(email, validateEmail, setEmailValid, PROJECT_INPUT_TIP.error.email, 'error', 'success'), [email])
  const codeHelper = useMemo(() => InputHelper.createInputHelper(code, validateCode, setCodeValid, PROJECT_INPUT_TIP.error.validCode, 'error', 'success'), [code])
  const descHelper = useMemo(() => InputHelper.createInputHelper(desc, validateDesc, setDescValid, PROJECT_INPUT_TIP.error.desc, 'error', 'success'), [desc])

  const pkey = CookieUtils.get(COOKIE_NAMES.PUBLICKEY)

  const registryHandler = async () => {
    if (!isValid()) return
    if (registering) return
    setRegistering(true)
    await fetch(FETCH_REGISTRY_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        cid: CookieUtils.get(COOKIE_NAMES.CLIENTID)
      },
      body: JSON.stringify({
        nickname: RsaUtils.base64Encrypt(nickname, pkey),
        password: RsaUtils.base64Encrypt(password, pkey),
        mail: RsaUtils.base64Encrypt(email, pkey),
        code: RsaUtils.base64Encrypt(code, pkey),
        desc: RsaUtils.base64Encrypt(desc, pkey)
      })
    })
      .then(res => res.json())
      .then(json => {
        refreshPkey()
        refreshClientId()
        if (json.state === 2200) {
          dispatch(changeUserinfo({ userinfo: json.value.userinfo }))
          closeHandler()
          return
        }
        setErrorPrompt(json.message || '注册失败')
      })
      .catch(err => console.error(err))
      .finally(() => setRegistering(false))
  }

  let countdownInterval

  const sendMailHandler = () => {
    setCountdown(60)
    setSending(true)
    countdownInterval = setInterval(() => {
      setCountdown(countdown => {
        if (countdown === 1) {
          setSending(false)
          if (countdownInterval) {
            clearInterval(countdownInterval)
            countdownInterval = null
            return
          }
        }
        return countdown - 1
      })
    }, 1000)
    sendMail()
  }

  const sendMail = async () => {
    await fetch(FETCH_MAIL_CAPTCHA_URL, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      body: RsaUtils.base64Encrypt(email, pkey)
    })
      .then(res => res.json())
      .then(json => {
        if (json.state !== 2000) {
          setErrorPrompt(json.value || "发送失败")
        }
        if (json.state === 5000) {
          CookieUtils.remove(COOKIE_NAMES.CLIENTID)
          CookieUtils.remove(COOKIE_NAMES.PUBLICKEY)
          return
        }
      })
      .catch(err => console.error(err))
  }

  const closeHandler = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval)
    }
    setErrorPrompt('')
    nicknameReset()
    passwordReset()
    descReset()
    emailReset()
    codeReset()
    InputHelper.resetInputHelper(nicknameHelper)
    InputHelper.resetInputHelper(passwordHelper)
    InputHelper.resetInputHelper(descHelper)
    InputHelper.resetInputHelper(emailHelper)
    InputHelper.resetInputHelper(codeHelper)
    dispatch(changeRegistryVisible(false))
  }

  const isCanSend = useMemo(() => sending || !emailValid, [emailValid, sending])

  return (
    <Modal open={registryVisible} onClose={closeHandler} css={{ backgroundColor: '$accents1' }} closeButton preventClose aria-labelledby='Registry modal'>
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
          min={6}
          max={6}
          clearable
          contentRightStyling={false}
          placeholder='valid code'
          contentLeft={sending ? <Text>{countdown}</Text> : ''}
          contentRight={
            <SvgButton
              disabled={isCanSend}
              onClick={sendMailHandler}
              css={{
                mx: '$5',
                cursor: sending ? 'auto' : 'pointer',
                '& svg': { opacity: isCanSend ? '0.4' : '1' },
                '&:hover': { '& svg': { opacity: isCanSend ? '0.4' : '0.7' } },
                '&:active': { '& svg': { opacity: isCanSend ? '0.4' : '0.2' } }
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
        <Textarea
          {...descBindings}
          defaultValue={desc}
          initialValue={desc}
          placeholder='description'
          maxLength={110}
          status={descHelper.color}
          helperColor={descHelper.color}
          helperText={descHelper.text}
          css={{ mt: '$2' }}
          aria-label='User desc textarea'
        />
        <Row justify='flex-end' align='center' css={{ mt: '$3' }}>
          <Text small css={{ ml: '$0', mr: 'auto' }} color='error'>{errorPrompt}</Text>
          <Button auto color='error' css={{ mr: '$5' }} onPress={closeHandler}>退出</Button>
          <Button auto disabled={!isValid()} onPress={registryHandler}>{registering ? <Loading color='currentColor' type="spinner" size='sm' /> : '注册'}</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default RegistryModal