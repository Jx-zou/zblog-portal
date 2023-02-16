import AudioPlayer from "@/components/audio/audio-player"
import AudioSelf from "@/components/audio/audio-self"
import ProjectInfoCard from "@/components/sidebar/project-info-card"
import useBackground from "@/hook/useBackground"
import { Audio, Info, More, RankList } from "@/lib/icons"
import { Collapse, styled, Col, Popover, useModal, Modal, Text, Tooltip } from "@nextui-org/react"
import { SvgButton } from "./styles"

const StyledPanel = styled('div', {
  position: 'fixed',
  top: '5%',
  right: 'var(--nextui-space-xs)',
  zIndex: 'var(--nextui-zIndices-5)',
})

const PanelIconButton = styled(SvgButton, {
  my: '$10'
})

export const Sidebar = () => {
  const { isDefault } = useBackground()

  const switchFill = (vColor) => {
    if (!isDefault) return vColor
  }

  const MoreIcon = <More size={30} fill={switchFill('var(--nextui-colors-cyan700)')} />
  const RankIcon = <RankList size={30} fill={switchFill('var(--nextui-colors-yellow700)')} />
  const InfoIcon = <Info size={30} fill={switchFill('var(--nextui-colors-green700)')} />
  const AudioIcon = <Audio size={30} fill={switchFill('var(--nextui-colors-red700)')} />

  const { setVisible, bindings } = useModal()

  return (
    <StyledPanel>
      <Collapse divider={false} title=' ' arrowIcon={MoreIcon} css={{ '.nextui-collapse-view': { p: '$0', mb: '$xl' } }}>
        <Col>
          <Tooltip placement="left" content={<AudioPlayer />} color='$backgroundAlpha'>{AudioIcon}</Tooltip>
          <PanelIconButton onClick={() => setVisible(true)}>{RankIcon}</PanelIconButton>
          <Modal scroll width="80%" aria-labelledby="Ranking List Title" aria-describedby="Ranking List desc" {...bindings}>
            <Modal.Header>
              <Text id="ranking list title" h4>Ranking List</Text>
            </Modal.Header>
            <Modal.Body>
              Ranking List...be continued
              {/* <Table id="ranking list desc"></Table> */}
            </Modal.Body>
          </Modal>
          <Popover>
            <Popover.Trigger>
              <PanelIconButton>{InfoIcon}</PanelIconButton>
            </Popover.Trigger>
            <Popover.Content css={{ px: '$4', py: '$2' }}>
              <ProjectInfoCard />
            </Popover.Content>
          </Popover>
        </Col>
      </Collapse>
      <AudioSelf />
    </StyledPanel>
  )
}

export default Sidebar