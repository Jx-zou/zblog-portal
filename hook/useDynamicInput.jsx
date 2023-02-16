import { useState } from 'react'

function useDynamicInput(initialValue) {
  const [value, setValue] = useState()
  const reset = () => { }
  const bindings = {
    defaultValue: initialValue,
    onChange: (e) => {
      setValue(e.target.value)
    }
  }
  return [value, reset, bindings]
}

export default useDynamicInput