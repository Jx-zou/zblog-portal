import { Text, Card, User, Badge, Modal } from "@nextui-org/react"

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
        <Text>{item.description}</Text>
      </Card.Body>
      <Card.Divider />
      <Badge css={{ pr: '4rem' }} color='secondary' content={item.time} enableShadow variant='bordered'>
        <Card.Footer>
          <User
            css={{ pl: '$0', '.nextui-user-desc': { w: '10rem', ov: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
            squared
            src={item.author.avatar.url}
            color="gradient"
            name={item.author.name}
            size="xs"
            description={item.author.desc}
            altText="Z-Blog"
          />
        </Card.Footer>
      </Badge>
    </Card>
  )
}

export default CardContext