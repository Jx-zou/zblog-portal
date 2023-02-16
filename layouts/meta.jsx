import Head from 'next/head'
import { PROJECT_NAME } from '@/lib/constants'

const Meta = () => {
  return (
    <Head>
      <title>{PROJECT_NAME}</title>
      <meta name="description" content="Z-Blog" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta