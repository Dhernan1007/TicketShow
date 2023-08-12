import { Card, Flex, Metric, ProgressBar, Text} from '@tremor/react'
import React from 'react'

const CardBase = () => {
  return (
    <Card maxWidth='max-w-sm'>
        <Text>Sales</Text>
        <Metric>$71</Metric>
        <Flex marginTop='mt-4'>
            <Text>10% of annual</Text>
            <Text>Sales</Text>
        </Flex>
        <ProgressBar value={40} color='teal' marginTop='mt-3'/>
    </Card>
  )
}

export default CardBase