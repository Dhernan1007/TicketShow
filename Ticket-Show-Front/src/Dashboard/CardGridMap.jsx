import { BadgeDelta, Card, Flex, Grid, Metric, ProgressBar, Text } from '@tremor/react'
import React from 'react'

const data = [
    {
        title: 'Sales',
        metric: '$200',
        progress: 16,
        target: '$2000',
        delta: '13%',
        deltaType: 'moderateIncrease'
    },
    {
        title: 'Profit',
        metric: '$1800',
        progress: 16,
        target: '$4000',
        delta: '23%',
        deltaType: 'increase'
    },
    {
        title: 'Customers',
        metric: '1,000',
        progress: 53,
        target: '2,000',
        delta: '10%',
        deltaType: 'moderateDecrease'
    },
]
const CardGridMap = ({ purchases, totalBoletosVendidos, totalIngresos }) => {
    return (
        <Grid numColsMd={2} numColsLg={3} marginTop='mt-6' gapX='gap-x-6' gapY='gap-y-6'>
          <Card>
            <Flex alignItems='items-start'>
              <div>
                <Text>Total Boletos Vendidos</Text>
                <Metric>{totalBoletosVendidos}</Metric>
              </div>
              <BadgeDelta text="Porcentaje de cambio respecto al objetivo"></BadgeDelta>
            </Flex>
            <Flex marginTop='mt-4' spaceX='space-x-2'>
              <Text>Progresso: {totalBoletosVendidos}% ({totalBoletosVendidos})</Text>
            </Flex>
            <ProgressBar percentageValue={totalBoletosVendidos} marginTop='mt-3'/>
          </Card>
          <Card>
            <Flex alignItems='items-start'>
              <div>
                <Text>Total Ingresos</Text>
                <Metric>{totalIngresos}</Metric>
              </div>
              <BadgeDelta text="Porcentaje de cambio respecto al objetivo"></BadgeDelta>
            </Flex>
            <Flex marginTop='mt-4' spaceX='space-x-2'>
              <Text>Progresso: {totalIngresos}% ({totalIngresos})</Text>
            </Flex>
            <ProgressBar percentageValue={totalIngresos} marginTop='mt-3'/>
          </Card>
        </Grid>
      );
    };
    
    export default CardGridMap;