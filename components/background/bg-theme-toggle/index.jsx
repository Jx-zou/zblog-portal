import { SvgButton } from "@/layouts/styles"
import { BgTheme } from "@/lib/icons"
import BgThemePanel from "../bg-theme-panel"

const { Popover } = require("@nextui-org/react")

const BgThemeToggle = ({ className, css }) => {
  return (
    <Popover className={className}>
      <Popover.Trigger>
        <SvgButton
          aria-label="toggle character rain and default background scheme"
          className={['bgThemeToggle', { className }]}
          css={{ mx: '$4', ...css }}
        >
          <BgTheme size={20} />
        </SvgButton>
      </Popover.Trigger>
      <Popover.Content>
        <BgThemePanel />
      </Popover.Content>
    </Popover>
  )
}

export default BgThemeToggle