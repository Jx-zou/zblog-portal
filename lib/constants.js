export const PROJECT_NAME = 'Z-Blog'
export const PROJECT_PORT = 9000
export const PROJECT_HOST = `http://localhost:${PROJECT_PORT}/`
export const PROJECT_API_URL = `${PROJECT_HOST}api/`
export const PROJECT_GITHUB_URL = 'https://github.com/Jx-zou/z-blog'


export const PROJECT_BGSOUND_NAME = 'What are words'

export const NEXTUI_COLORS = [
  '--nextui-colors-blue',
  '--nextui-colors-purple',
  '--nextui-colors-green',
  '--nextui-colors-yellow',
  '--nextui-colors-red',
  '--nextui-colors-cyan',
  '--nextui-colors-pink',
  '--nextui-colors-gray',
]

export const PROJECT_REGS = {
  nickname: /^[a-zA-Z\u4e00-\u9fa5!@#%&_-|]{1,15}$/,
  account: /^[a-zA-Z][a-zA-Z0-9_-]{1,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
  password: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#%&_])^[A-Za-z\d!@#%&_]{8,20}$/,
  validCode: /^[0-9]{4}$/,
  Chinese: /^[\u4E00-\u9FA5]+$/,
  title: /^{1, 10}$/,
  desc: /^{100, 1}$/
}

export const PROJECT_INPUT_TIP = {
  default: {
    nickname: '昵称',
    password: '密码',
    account: '账户',
    email: '邮箱',
    validCode: '验证码',
    welcome: 'Welcome to Z-Blog'
  },
  error: {
    nickname: '昵称: 汉字、大小写字母、特殊字符(!@#%&_-|)',
    account: '输入一个有效账户',
    email: '输入一个有效邮箱地址',
    password: {
      login: '输入一个有效密码',
      registry: '密码: 包含大小写字母、数字、特殊符号(!@#%&_)的组合'
    },
    validCode: '输入一个有效验证码',
    title: '标题: 长度应少于30',
    desc: '简介: 长度应少于100'
  }
}

export const PROJECT_USER = {
  avatar: {
    alt: '/images/head.png'
  }
}