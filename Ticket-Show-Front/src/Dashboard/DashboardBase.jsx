import React, { useState } from 'react';
import { Card, Grid, Tab, TabGroup, TabList, Text, Title, TabPanel, TabPanels, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import CardGridMap from './CardGridMap';
import ChartDonut from './ChartDonut';
import TableBase from './TableBase';
import CardBase from './CardBase';
import { BoltIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import useMyShopping from '../components/UserProfile/useMyShopping'; // Importamos el nuevo Hook

const DashboardBase = () => {
    const datos = [
        // ...
    ];

    const [selectedView, setSelectedView] = useState(1);

    // Utilizamos el nuevo Hook useMyShopping
    const { purchases, totalBoletosVendidos, totalIngresos } = useMyShopping();

    return (
        <main className="bg-slate-200 p-6 sm:p-10">
            <Title>Dashboard</Title>
            <Text>Graficos y Detalles de venta</Text>
            <TabGroup defaultValue={selectedView} handleSelect={value => setSelectedView(value)} marginTop='mt-6'>
                <TabList>
                    <Tab value={1}>Vista Gráfica</Tab>
                    <Tab value={2}>Detalles</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <CardGridMap purchases={purchases} totalBoletosVendidos={totalBoletosVendidos} totalIngresos={totalIngresos} />
                        <div className="mt-6">
                            <ChartDonut />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Card>
                            <Title>Tabla de datos ventas</Title>
                            <Table marginTop='mt-4'>
                                <TableHead>
                                    <TableRow >
                                        <TableHeaderCell>Nombre del Evento</TableHeaderCell>
                                        <TableHeaderCell>Stock</TableHeaderCell>
                                        <TableHeaderCell>Boletos vendidos</TableHeaderCell>
                                        <TableHeaderCell>Costo del Evento</TableHeaderCell>
                                        <TableHeaderCell>Ciudad del Evento</TableHeaderCell>
                                        <TableHeaderCell>Total de boletos</TableHeaderCell>
                                        <TableHeaderCell>Total $</TableHeaderCell>
                                        <TableHeaderCell>Estado de compra</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {purchases.map((purchase) => (
                                        <TableRow key={purchase.id}>
                                            <TableCell>{purchase.name}</TableCell>
                                            <TableCell>{purchase.hasPurchased ? purchase.stock : 0}</TableCell>
                  <TableCell>{purchase.hasPurchased ? purchase.quantity : 0}</TableCell>
                  <TableCell>{purchase.hasPurchased ? purchase.monto : 0}</TableCell>
                  <TableCell>{purchase.hasPurchased ? purchase.departement : ''}</TableCell>
                  <TableCell>{purchase.hasPurchased ? purchase.totalBoletos : 0}</TableCell>
                  <TableCell>{purchase.hasPurchased ? purchase.total : 0}</TableCell>
                                            <TableCell><Badge text={purchase.status} color='teal' icon={ShoppingBagIcon}></Badge></TableCell>
                                        </TableRow>
                                    ))}
                                    {/* Renderizar las compras desde MyShopping */}
                                    {purchases.map((purchase) => (
                                        <TableRow key={purchase.id}>
                                            <TableCell>{purchase.name}</TableCell>
                                            {/* ... Agregar aquí el resto de los datos de las compras */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    );
};

export default DashboardBase;
