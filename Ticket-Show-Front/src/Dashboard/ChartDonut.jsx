import { Card, DonutChart, Title } from '@tremor/react'
import React from 'react'

const ChartDonut = ({ cityData }) => {
    return (
        <Card>
            <Title>Sales by City</Title>
            <DonutChart
                data={cityData}
                category='sales'
                dataKey='name'
                marginTop='mt-6'
                color={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
            />
        </Card>
    )
}

export default ChartDonut;