import { useState } from 'react'

function useDynamicInput(setValid, initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const reset = () => {
    setValid(false)
    setValue(initialValue)
  }
  const bindings = {
    defaultValue: initialValue,
    onChange: (e) => {
      setValue(e.target.value)
    }
  }
  return [value, reset, bindings]
}

export default useDynamicInput