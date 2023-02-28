import useDynamicInput from '@/hook/useDynamicInput';
import { FETCH_LOGIN_URL } from '@/lib/api';
import { InputHelper, refreshClientId, refreshPkey } from '@/lib/common';
import { COOKIE_EXPIRES, COOKIE_NAMES, PROJECT_INPUT_TIP, PROJECT_NAME, PROJECT_REGS } from '@/lib/constants';
import { LoginUser, Password } from '@/lib/icons'
import { changeUserinfo, changeLoginState } from '@/redux/slices/userSlice';
import { Button, Checkbox, Input, Link, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginVisible } from '@/redux/slices/personalSlice';
import { CookieUtils, RsaUtils, StringUtils } from '@/lib/utils';
import { changeAuth } from '@/redux/slices/globalSlice';

const LoginModal = () => {
  const [fetching, setFetching] = useState(false)
  const [errorPrompt, setErrorPrompt] = useState('')
  const [accountValid, setAccountValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)

  const [account, accountReset, accountBindings] = useDynamicInput(setAccountValid)
  const [password, passwordReset, passwordBindings] = useDynamicInput(setPasswordValid)

  const loginVisible = useSelector((state) => state.personal.loginVisible)
  const dispatch = useDispatch()

  const loginHandler = async () => {
    if (!isValid()) return
    if (fetching) return
    setFetching(true)
    const pkey = CookieUtils.get(COOKIE_NAMES.PUBLICKEY)
    await fetch(FETCH_LOGIN_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': "application/json;charset=UTF-8",
        cid: CookieUtils.get(COOKIE_NAMES.CLIENTID)
      },
      body: JSON.stringify({
        username: RsaUtils.base64Encrypt(account, pkey),
        password: RsaUtils.base64Encrypt(password, pkey)
      })
    })
      .then(res => res.json())
      .then(json => {
        refreshPkey()
        refreshClientId()
        if (json.status === 2140) {
          let token = json.data.token
          let nickname = json.data.nickname
          let desc = json.data.desc
          let avatar = json.data.avatar
          if (StringUtils.isNotBlank(token) && StringUtils.isNotBlank(nickname) && StringUtils.isNotBlank(desc) && StringUtils.isNotBlank(avatar)) {
            dispatch(changeLoginState(true))
            dispatch(changeAuth({ token: token }))
            CookieUtils.set(COOKIE_NAMES.TOKEN, token, COOKIE_EXPIRES.TOKEN)
            let userinfo = { nickname: nickname, desc: desc, avatar: avatar }
            dispatch(changeUserinfo(userinfo))
            CookieUtils.set(COOKIE_NAMES.USERINFO, JSON.stringify(userinfo), COOKIE_EXPIRES.CLIENTID)
            closeHandler()
          }
        }
        setErrorPrompt(json.value || '账户或密码不正确')
      })
      .catch(err => console.log(err))
      .finally(() => setFetching(false))
  }

  const isValid = () => (accountValid && passwordValid) ? true : false

  const validateAccount = (value) => value.match(PROJECT_REGS.account) || value.match(PROJECT_REGS.email)
  const validatePassword = (value) => value.match(PROJECT_REGS.password)

  const accountHelper = useMemo(() => InputHelper.createInputHelper(account, validateAccount, setAccountValid, PROJECT_INPUT_TIP.error.account, 'error', 'success'), [account])
  const passwordHelper = useMemo(() => InputHelper.createInputHelper(password, validatePassword, setPasswordValid, PROJECT_INPUT_TIP.error.password.login, 'error', 'success'), [password])

  const closeHandler = () => {
    setErrorPrompt('')
    accountReset()
    passwordReset()
    InputHelper.resetInputHelper(accountHelper)
    InputHelper.resetInputHelper(passwordHelper)
    dispatch(changeLoginVisible(false))
  }

  return (
    <Modal open={loginVisible} onClose={closeHandler} closeButton preventClose aria-labelledby='Login modal'>
      <Modal.Header aria-labelledby='Login title'>
        <Text id='login-panel-title' css={{ bgClip: 'text', textGradient: '45deg, $blue600 -20%, $purple600 60%, $yellow600 100%', mb: '$0' }} size={18}>
          Welcome to
          <Text b size={18}> {PROJECT_NAME}</Text>
        </Text>
      </Modal.Header>
      <Modal.Body aria-labelledby='Login panel'>
        <Input
          {...accountBindings}
          clearable
          bordered
          type='text'
          placeholder='账号/手机号/邮箱'
          contentLeft={<LoginUser fill='currentColor' />}
          onClearClick={accountReset}
          status={accountHelper.color}
          color={accountHelper.color}
          helperColor={accountHelper.color}
          helperText={accountHelper.text}
          aria-label='Account input'
        />
        <Input.Password
          {...passwordBindings}
          clearable
          bordered
          placeholder='密码'
          type='password'
          contentLeft={<Password fill='currentColor' />}
          onClearClick={passwordReset}
          status={passwordHelper.color}
          color={passwordHelper.color}
          helperColor={passwordHelper.color}
          helperText={passwordHelper.text}
          aria-label='Login password input'
          css={{ mt: '$4' }}
        />
        <Row justify='space-between' css={{ mt: '$5' }}>
          <Checkbox aria-label='Remember me' size='sm'>
            <Text color='var(--nextui-colors-yellow600)' size={12}>记住我</Text>
          </Checkbox>
          <Link aria-label='Forgot password'>
            <Text color='primary' size={12}>忘记密码?</Text>
          </Link>
        </Row>
        <Row justify='flex-end' align='center'>
          <Text css={{ ml: '$0', mr: 'auto' }} color='error' small>{errorPrompt}</Text>
          <Button auto flat color='error' onPress={closeHandler} css={{ mr: '$5' }}>关闭</Button>
          <Button aria-label='Login button' auto onPress={loginHandler} disabled={!isValid() || fetching}>{(!isValid() && fetching) ? <Loading color='currentColor' type='spinner' size='lg' /> : '登录'}</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal