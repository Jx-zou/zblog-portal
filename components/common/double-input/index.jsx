import { chineseUtils } from "@/lib/utils"
import { styled } from "@nextui-org/react"
import { useState } from "react"

const StyledInput = styled('input', {
  bgColor: 'rgba(0, 0, 0, 0)',
  border: 'none',
  ta: 'center',

})

const DbInput = ({ ariaLabel, onDoubleBlur = () => { }, onChange, value, css, className }) => {
  const [readOnly, setReadOnly] = useState(true)
  const [isDbClick, setIsDbClick] = useState(false)

  const dbClickHandler = () => {
    setReadOnly(false)
    setIsDbClick(true)
  }

  const dbBlurHandler = () => {
    if (isDbClick) {
      setReadOnly(true)
      onDoubleBlur()
      setIsDbClick(false)
    }
  }

  const valueSize = () => value.length + chineseUtils.getSize(value) * 2

  return (
    <StyledInput
      css={css}
      size={valueSize()}
      className={className}
      defaultValue={value}
      aria-label={ariaLabel}
      readOnly={readOnly}
      onChange={onChange}
      onDoubleClick={dbClickHandler}
      onBlur={dbBlurHandler} />
  )
}

export default DbInput