import { TimeUtils } from "@/lib/utils"
import { Text, Card, User, Badge } from "@nextui-org/react"

export const CardContext = ({ item }) => {
  return (
    <Card css={{ w: '100%' }}>
      <Card.Header>
        <Text h4 css={{ bgClip: 'text', textGradient: "45deg, $blue600 -20%, $purple600 60%, $yellow600 100%", mb: '$0' }} weight='bold'>
          {item.title}
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$5" }}>
        <Text>{item.profile}</Text>
      </Card.Body>
      <Card.Divider />
      <Badge css={{ pr: '4rem' }} color='secondary' content={TimeUtils.format(new Date(Date.parse(item.createTime)))} enableShadow variant='bordered'>
        <Card.Footer>
          <User
            css={{ pl: '$0', '.nextui-user-desc': { w: '10rem', ov: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
            squared
            src={item.avatar}
            color="gradient"
            name={item.nickname}
            size="xs"
            description={item.uprofile}
            altText="Z-Blog"
          />
        </Card.Footer>
      </Badge>
    </Card>
  )
}

export default CardContext