import { stringUtils } from "@/lib/utils"

export default function handler(req, res) {
  if(req.method !== 'POST'){
    res.status(500).json({
      state: 500,
      value: '注册失败.'
    })
  }
  console.log(req);

  const {nickname, password, email, code} = req.body
  
  if (code !== '1234') {
    res.status(500).json({
      state: 500,
      value: '验证码错误.'
    })
  }
  if (stringUtils.isBlank(password)) {
    res.status(500).json({
      state: 500,
      value: '密码格式错误.'
    })
  }
  res.status(200).json({ 
    state: 200,
    value: {
      userinfo: {
        nickname: nickname,
        desc: `Hi! ${email} is My mail`,
        mail: email,
        avatar: {
          url: '/images/jx_head.png',
          alt: '/images/head.png',
        }
      }
    }
  })
}