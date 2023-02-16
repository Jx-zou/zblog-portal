import { Input } from "@nextui-org/react"
import { Search } from "@/lib/icons"

export const SearchInput = () => {
  return (
    <Input
      clearable
      contentLeft={<Search fill="var(--nextui-colors-accents6)" size={16} />}
      contentLeftStyling={false}
      css={{w: "100%","@xsMax": {mw: "300px"}, "& .nextui-input-content--left": {h: "100%", ml: "$4", dflex: "center"}}}
      placeholder='搜索...'
      aria-label='search input'
    />
  )
}

export default SearchInput