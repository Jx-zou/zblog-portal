import useDynamicInput from '@/hook/useDynamicInput';
import usePermission from '@/hook/usePermission';
import { FETCH_LOGIN_URL } from '@/lib/api';
import { createInputHelper } from '@/lib/common';
import { PROJECT_INPUT_TIP, PROJECT_NAME, PROJECT_REGS } from '@/lib/constants';
import { LoginUser, Password } from '@/lib/icons'
import { changeLoginVisible } from '@/redux/slices/personalSlice';
import { changeUserinfo, changeLoginState } from '@/redux/slices/userSlice';
import { Button, Checkbox, Input, Link, Loading, Modal, Row, Text } from '@nextui-org/react'
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cookieUtils, RSAEncrypt } from '@/lib/utils';
import JSEncrypt from 'jsencrypt';

const LoginModal = () => {
  const [account, accountReset, accountBindings] = useDynamicInput()
  const [password, passwordReset, passwordBindings] = useDynamicInput()
  const [fetching, setFetching] = useState(false)
  const [errorPrompt, setErrorPrompt] = useState('')
  const [accountValid, setAccountValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)

  const { publickey, zblogId } = usePermission()
  const loginVisible = useSelector((state) => state.personal.loginVisible)
  const dispatch = useDispatch()

  const loginHandler = async () => {
    if (!isValid()) return
    if (fetching) return
    setFetching(true)
    const instance = new JSEncrypt()
    instance.setPublicKey(publickey)
    await fetch(FETCH_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'ZBGID': zblogId
      },
      mode: 'cors',
      body: JSON.stringify({ account: instance.encrypt(account), password: instance.encrypt(password) })
    })
      .then(res => {
        cookieUtils.set('ZBGUK', res.headers.get('ZBGUK'))
        return res.json()
      })
      .then(json => {
        if (json.state === 200) {
          dispatch(changeLoginState(true))
          dispatch(changeUserinfo({ userinfo: json.user.info }))
          dispatch(changeLoginVisible(false))
          return
        }
        setErrorPrompt(json.value || '账户或密码不正确')
      })
      .catch(err => console.log(err))
      .finally(() => setFetching(false))
  }

  const isValid = () => (accountValid && passwordValid) ? true : false

  const validateAccount = (value) => value.match(PROJECT_REGS.account)
  const validatePassword = (value) => value.match(PROJECT_REGS.password)

  const accountHelper = useMemo(() => createInputHelper(account, validateAccount, setAccountValid, PROJECT_INPUT_TIP.error.account, 'error', 'success'), [account])
  const passwordHelper = useMemo(() => createInputHelper(password, validatePassword, setPasswordValid, PROJECT_INPUT_TIP.error.password.login, 'error', 'success'), [password])

  return (
    <Modal open={loginVisible} onClose={() => dispatch(changeLoginVisible(false))} closeButton preventClose aria-labelledby='Login modal'>
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
          <Checkbox aria-label='Remember me'>
            <Text color='var(--nextui-colors-yellow600)' size={14}>记住我</Text>
          </Checkbox>
          <Link aria-label='Forgot password'>
            <Text color='primary' size={14}>忘记密码?</Text>
          </Link>
        </Row>
        <Row justify='flex-end' align='center'>
          <Text css={{ ml: '$0', mr: 'auto' }} color='error'>{errorPrompt}</Text>
          <Button auto flat color='error' onPress={() => dispatch(changeLoginVisible(false))} css={{ mr: '$5' }}>关闭</Button>
          <Button aria-label='Login button' auto onPress={loginHandler} disabled={!isValid() || fetching}>{(!isValid() && fetching) ? <Loading color='currentColor' type='spinner' size='lg' /> : '登录'}</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal