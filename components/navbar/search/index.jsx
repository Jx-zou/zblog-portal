import { Input } from "@nextui-org/react"
import { Search } from "@/lib/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeSearch } from "@/redux/slices/globalSlice"

export const SearchInput = () => {
  const [value, setValue] = useState()
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setValue(e.target.value)
    dispatch(changeSearch({ search: value }))
  }

  return (
    <Input
      clearable
      defaultValue={value}
      onChange={onChangeHandler}
      placeholder='搜索...'
      contentLeftStyling={false}
      contentLeft={<Search fill="var(--nextui-colors-accents6)" size={16} />}
      css={{ w: "100%", "@xsMax": { mw: "300px" }, "& .nextui-input-content--left": { h: "100%", ml: "$4", dflex: "center" } }}
      aria-label='search input'
    />
  )
}

export default SearchInput