export default function handler(req, res) {
  if (req.method === 'POST') {
    res.statusCode = 200
    res.setHeader('ContentType', 'application/json;charset=utf-8')
    res.setHeader("ZBGUK", "T4slmHMnIZjWOmlct+HoTwy2mMOJ4g01To0D8vxE+45ZeeRg29zQ19GeTLbT7SKoPsxPQDImpGQ4IfFtQIV9hg==");
    res.write(JSON.stringify({
      state: 200,
      user: {
        info: {
          nickname: 'Jx',
          desc: 'Hi! My mail is jx.zou@foxmail.com',
          mail: 'jx.zou@foxmail.com',
          avatar: {
            url: '/images/jx_head.png',
            alt: '/images/head.png',
          }
        }
      }
    }))
    res.end()
  }
}