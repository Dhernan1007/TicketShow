import { Card, DonutChart, Title } from '@tremor/react';
import React from 'react';
import { useSelector } from 'react-redux';

const ChartDonutUsers = () => {
  const usersList = useSelector((state) => state?.user);

  // Filtrar usuarios activos, inactivos y bloqueados
  const activeUsers = usersList ? usersList.filter((user) => !user.disabled) : [];
  const inactiveUsers = usersList ? usersList.filter((user) => user.disabled) : [];
  const blockedUsers = inactiveUsers.filter((user) => user.disabled);

  const Usuarios = [
    {
      name: 'Activos',
      status: activeUsers.length,
    },
    {
      name: 'Bloqueados',
      status: blockedUsers.length,
    },
    {
      name: 'Inactivos',
      status: inactiveUsers.length - blockedUsers.length,
    },
  ];

  return (
    <Card>
      <Title>Cuentas de usuarios</Title>
      <DonutChart
        data={Usuarios}
        category="status"
        dataKey="name"
        marginTop="mt-6"
        color={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
      />
    </Card>
  );
};

export default ChartDonutUsers;
