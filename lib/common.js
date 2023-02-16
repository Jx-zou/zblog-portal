import { stringUtils } from './utils'

export const createInputHelper = (value, validate, setIsValid, helperText, helperColor, statueColor) => {
  if (stringUtils.isBlank(value)) {
    return inputHelperParams()
  }
  const isValid = validate(value)
  setIsValid(isValid)
  return inputHelperParams(isValid ? '' : helperText, isValid ? statueColor : helperColor)
}

export const inputHelperParams = (text = '', color = '') => {
  return {text: text, color: color}
}