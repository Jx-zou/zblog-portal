import { PROJECT_NAME } from "@/lib/constants"
import { Logo } from "@/lib/icons"
import { Card, Grid, Image, Link, Text } from "@nextui-org/react"

const ProjectInfoCard = () => {
  return (
    <Card css={{ p: "$6", mw: "400px" }}>
      <Card.Header>
        <Logo fill="#451773" size={34} />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {PROJECT_NAME}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>{PROJECT_NAME}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Make beautiful websites regardless of your design experience.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/"
        >
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  )
}

export default ProjectInfoCard