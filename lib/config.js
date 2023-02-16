
export const theme = {
  default: {
    type: 'light'
  },
  self: {
    system: {
      type: 'system',
      theme: {}
    },
    dark: {
      type: 'dark',
      theme: {}
    },
    light: {
      type: 'light',
      theme: {}
    }
  },
  customs: []
}

export const background = {
  default: {
    mode: 'default',
    color: 'var(--nextui-colors-background)',
    zIndex: 'var(--nextui-zIndices-1)',
    music: {
      url: '/musics/BgMusic.flac'
    }
  },
  modes: ['default','rain','particle'],
  colors: [
    'var(--nextui-colors-blue600)',
    'var(--nextui-colors-purple600)',
    'var(--nextui-colors-green600)',
    'var(--nextui-colors-yellow600)',
    'var(--nextui-colors-red600)',
    'var(--nextui-colors-cyan600)',
    'var(--nextui-colors-pink600)',
    'var(--nextui-colors-gray600)',
  ]
}

export const logo = {
  color: {
    dark: 'var(--nextui-colors-purple700)',
    light: 'var(--nextui-colors-purple500)'
  }
}

export const user = {
  info: {
    nickname: '未登录',
    desc: 'Welcome to this blog',
    mail: '...@mail.com',
    avatar: {
      url: '/images/head.png',
      alt: '/images/head.png',
    }
  }
}