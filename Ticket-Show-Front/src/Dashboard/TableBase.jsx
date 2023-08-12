import React from 'react'
import { Badge, Card, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { CameraIcon } from '@heroicons/react/24/solid'
const TableBase = () => {

    const datos = [
        {
            "name": "Kenny Perez",
            "Role": "Admin",
            "departement": "Buenos Aires",
            "status": "active"
        },
        {
            "name": "Maria",
            "Role": "Usuario",
            "departement": "Buenos Aires",
            "status": "active"
        },
        {
            "name": "Boy Band",
            "Role": "Artista",
            "departement": "Buenos Aires",
            "status": "active"
        },
    
    ]
  return (
    <Card>
        <Title>Lista de datos</Title>

        <Table marginTop='mt-4'>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Position</TableHeaderCell>
                    <TableHeaderCell>Departamento</TableHeaderCell>
                    <TableHeaderCell>Estado</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {datos.map((item) => (
                    <TableRow>
                        <TableCell>{item.Role}</TableCell>
                        <TableCell>{item.departement}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><Badge text={item.status} color='teal' icon={CameraIcon}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Card>
  )
}

export default TableBase