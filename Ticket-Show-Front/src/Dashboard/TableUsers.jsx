import React from 'react'
import ChartDonutUsers from './ChartDonutsUsers'
import CardGridMapUsers from './CardGridMapUsers'
import { TabPanel, TabPanels } from '@tremor/react'

const TableUsers = () => {
  return (
    <TabPanels>

      <TabPanel>
            <CardGridMapUsers/>
    <div>
        <ChartDonutUsers/>
    </div>

    </TabPanel>
    </TabPanels>
    
  )
}

export default TableUsers