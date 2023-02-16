import { NEXTUI_COLORS, PROJECT_REGS } from "./constants"

export const randomSelfColor = () => {
  const weights = [500, 600, 700, 800]
  return `var(${NEXTUI_COLORS[Math.floor((Math.random() * (NEXTUI_COLORS.length)))]}${weights[Math.floor(Math.random() * weights.length)]})`
}

export const stringUtils = {
  isBlank: (value) => {
    if (value && value.trim().length > 0) {
      return false
    }
    return true
  },
  isChinese: (value) => PROJECT_REGS.Chinese.test(value),
}

export const chineseUtils = {
  getSize: (value) => {
    let size = 0
    for (let i = 0; i < value.length; i++) {
      if (stringUtils.isChinese(value.charAt(i))) {
        size += 1
      }
    }
    return size
  }
}

export const cookieUtils = {
  get: (name) => {
    if (!stringUtils.isBlank(name)) {
      name = name.trim()
      const cookie = document.cookie.split(";")
      if (cookie.length > 0) {
        cookie.forEach(value => {
          if (value.trim().startsWith(name)) {
            return value.substring(name.length, value.length)
          }
        })
      }
    }
    return ""
  },
  set: (name, value, expire = 30 * 24 * 60 * 60 * 1000) => {
    const current = new Date()
    current.setTime(expire)
    document.cookie = `${name}=${value};expires=${current.toUTCString}`
  }
}

export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 24)

