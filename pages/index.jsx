import { Inter } from '@next/font/google'

import { Layout } from '@/layouts/layout'
import View from '@/layouts/view'

import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { changeLoginState, changeUserinfo } from '@/redux/slices/userSlice'

import { CookieUtils, NanoIDUtils } from '@/lib/utils'
import { COOKIE_EXPIRES, COOKIE_NAMES, HTTP_HEADERS } from '@/lib/constants'
import { FETCH_PKEY_URL } from '@/lib/api'

import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import { refreshClientId, refreshPkey, refreshToken, refreshUserinfo } from '@/lib/common'
import { changeAuth } from '@/redux/slices/globalSlice'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  const dispatch = useDispatch()

  const local = useCallback(() => {
    if (CookieUtils.has(COOKIE_NAMES.PUBLICKEY)) {
      refreshPkey()
      if (CookieUtils.has(COOKIE_NAMES.TOKEN) && CookieUtils.has(COOKIE_NAMES.USERINFO)) {
        refreshToken()
        refreshUserinfo()
        dispatch(changeAuth({ auth: { cid: CookieUtils.get(COOKIE_NAMES.TOKEN), pkey: CookieUtils.get(COOKIE_NAMES.PUBLICKEY) } }))
        dispatch(changeUserinfo(JSON.parse(CookieUtils.get(COOKIE_NAMES.USERINFO))))
        dispatch(changeLoginState(true))
        return true
      }
      if (CookieUtils.has(COOKIE_NAMES.CLIENTID)) {
        refreshClientId()
        dispatch(changeAuth({ auth: { cid: CookieUtils.get(COOKIE_NAMES.CLIENTID), pkey: CookieUtils.get(COOKIE_NAMES.PUBLICKEY) } }))
        return true
      }
      CookieUtils.remove(COOKIE_NAMES.TOKEN)
      CookieUtils.remove(COOKIE_NAMES.USERINFO)
      CookieUtils.remove(COOKIE_NAMES.CLIENTID)
      CookieUtils.remove(COOKIE_NAMES.PUBLICKEY)
    }
    return false
  }, [dispatch])

  const fetchAuth = useCallback(async () => {
    await fetch(FETCH_PKEY_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        cid: Base64.stringify(Utf8.parse(NanoIDUtils.alphanumericId())),
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 2100) {
          let cid = json.data.cid
          let pkey = json.data.pkey
          if (cid && pkey && cid.length > 0 && pkey.length > 0) {
            CookieUtils.set(COOKIE_NAMES.CLIENTID, cid, COOKIE_EXPIRES.CLIENTID)
            CookieUtils.set(COOKIE_NAMES.PUBLICKEY, pkey, COOKIE_EXPIRES.PUBLICKEY)
            dispatch(changeAuth({ auth: { cid: cid, pkey: pkey } }))
            return
          }
        }
        console.log("初始化错误");
      })
      .catch(err => console.log('初始化错误'))
  }, [dispatch])

  useEffect(() => {
    if (!local()) {
      fetchAuth()
    }
  }, [dispatch, fetchAuth, local])

  return (
    <div className={inter.className}>
      <Layout>
        <View />
      </Layout>
    </div>
  )
}

export default Home
