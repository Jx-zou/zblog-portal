import { Layout } from '@/layouts/layout'

import { Inter } from '@next/font/google'
import { useDispatch } from 'react-redux'
import { initialize } from '@/redux/slices/initialSlice'
import { FETCH_PKEY_URL } from '@/lib/api'
import { useEffect } from 'react'
import View from '@/layouts/view'
import { nanoid } from '@/lib/utils'
import Base64 from 'crypto-js/enc-base64'

const inter = Inter({ subsets: ['latin'] })

function Home({ data }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize({ data: data }))
  }, [data, dispatch])

  return (
    <div className={inter.className}>
      <Layout>
        <View />
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  let data = null
  let zblogId = nanoid()
  try {
    const res = await fetch(FETCH_PKEY_URL, {
      method: "POST",
      headers: {
        cid: Base64.stringify(zblogId)
      }
    })
    const publickey = res.headers.get('pkey')
    if (publickey) {
      data = {
        permission: {
          publickey: publickey,
          zblogId: zblogId
        }
      }
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  } finally {
    if (!data) {
      return { notFound: true }
    }
  }

  return {
    props: { data }
  }
}

export default Home
