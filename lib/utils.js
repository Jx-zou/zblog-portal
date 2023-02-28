import { customAlphabet } from "nanoid"
import { NEXTUI_COLORS, PROJECT_REGS } from "./constants"
import { hextob64, KEYUTIL, KJUR } from "jsrsasign"

export class RsaUtils {
  static base64Encrypt = (value, pub) => {
    let pkey = KEYUTIL.getKey("-----BEGIN PUBLIC KEY-----\n" + pub + "-----END PUBLIC KEY-----")
    let enc = KJUR.crypto.Cipher.encrypt(value, pkey)
    return hextob64(enc)
  }
}

export const randomSelfColor = () => {
  const weights = [500, 600, 700, 800]
  return `var(${NEXTUI_COLORS[Math.floor((Math.random() * (NEXTUI_COLORS.length)))]}${weights[Math.floor(Math.random() * weights.length)]})`
}

export class StringUtils {
  static isBlank = (value) => !value || value.trim().length <= 0 ? true : false

  static isNotBlank = (value) => value && value.trim().length > 0 ? true : false

  static isChinese = (value) => PROJECT_REGS.Chinese.test(value)
}

export class ChineseUtils {
  static getSize = (value) => {
    let size = 0
    for (let i = 0; i < value.length; i++) {
      if (StringUtils.isChinese(value.charAt(i))) {
        size += 1
      }
    }
    return size
  }
}

export class CookieUtils {
  static check = (name) => {
    if (!name) {
      return null
    }
    name = name.trim()
    if (name.length <= 0) {
      return null
    }
    const cookie = document.cookie.split(";")
    if (cookie.length <= 0) {
      return null
    }
    return cookie
  }

  static has = (name) => {
    const cookie = this.check(name)
    if (cookie) {
      for (let i = 0; i < cookie.length; i++) {
        const arr = cookie[i].trim().split('=')
        if (arr[0] === name) {
          return true
        }
      }
    }
    return false
  }

  static get = (name) => {
    const cookie = this.check(name)
    if (cookie) {
      for (let i = 0; i < cookie.length; i++) {
        const arr = cookie[i].trim().split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
    }
    return null
  }

  static set = (name, value, expire = 30 * 24 * 60 * 60 * 1000) => {
    document.cookie = `${name}=${value};max-age=${expire}`
  }

  static remove = (name) => {
    if (this.has(name)) {
      this.set(name, "", -1)
    }
  }

  static refresh = (name, expire = 30 * 24 * 60 * 60 * 1000) => {
    let value = this.get(name)
    this.set(name, value, expire)
  }
}


export class NanoIDUtils {
  static alphanumericId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 24)

  static numericId = customAlphabet("0123456789", 24)

  static alphabetId = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 24)
}

export class TimeUtils {
  static format = (time) => {
    return time.getFullYear() + '.' + time.getMonth() + '.' + time.getDate()
  }
}