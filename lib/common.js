import { COOKIE_EXPIRES, COOKIE_NAMES } from './constants'
import { CookieUtils, StringUtils } from './utils'

export class InputHelper {
  static inputHelperParams = (text = '', color = '') => {
    return { text: text, color: color }
  }

  static createInputHelper = (value, validate, setIsValid, helperText, helperColor, statueColor) => {
    if (StringUtils.isBlank(value)) {
      return this.inputHelperParams()
    }
    let isValid = validate(value)
    setIsValid(isValid)
    return this.inputHelperParams(isValid ? '' : helperText, isValid ? statueColor : helperColor)
  }

  static resetInputHelper = (params) => {
    params.color = ''
    params.text = ''
  }
}


export const refreshPkey = () => {
  CookieUtils.refresh(COOKIE_NAMES.PUBLICKEY, COOKIE_EXPIRES.PUBLICKEY)
}

export const refreshClientId = () => {
  CookieUtils.refresh(COOKIE_NAMES.CLIENTID, COOKIE_EXPIRES.CLIENTID)
}

export const refreshToken = () => {
  CookieUtils.refresh(COOKIE_NAMES.TOKEN, COOKIE_EXPIRES.TOKEN)
}

export const refreshUserinfo = () => {
  CookieUtils.refresh(COOKIE_NAMES.USERINFO, COOKIE_EXPIRES.TOKEN)
}