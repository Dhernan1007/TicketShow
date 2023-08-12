import { BadgeDelta, Card, Flex, Grid, Metric, ProgressBar, Text } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { getUserById, updateUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const CardGridMapUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const usersList = useSelector((state) => state?.user);
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    dispatch(getUserById());
  }, [user]);

  useEffect(() => {
    // Comparamos el estado global con el estado local para evitar el bucle infinito
    if (usersList !== localUsers) {
      setLocalUsers(usersList);
    }
  }, [usersList, localUsers]);

  const findUserByEmail = (email) => usersList?.find((user) => user.email === email);

  // Filtrar usuarios activos, inactivos y bloqueados
  const activeUsers = localUsers ? localUsers.filter((user) => !user.disabled) : [];
  const inactiveUsers = localUsers ? localUsers.filter((user) => user.disabled) : [];

  // Obtener la cantidad total de usuarios
  const totalUsers = localUsers?.length;

  const data = [
    {
      title: 'Activos',
      deltaType: 'moderateIncrease'
    },
    {
      title: 'Inactivos/Bloqueados',
      deltaType: 'increase'
    },
  ];

  return (
    <Grid numColsMd={2} numColsLg={3} marginTop='mt-6' gapX='gap-x-6' gapY='gap-y-6'>
      {data.map((item, index) => (
        <Card key={index}>
          <Flex alignItems='items-start'>
            <div>
              <Text>{item.title}</Text>
              {/* Mostrar la cantidad de usuarios activos, inactivos y bloqueados según el título */}
              <Metric>{item.title === 'Activos' ? activeUsers.length : inactiveUsers.length}</Metric>
            </div>
            <BadgeDelta text={`${item.deltaType === 'moderateDecrease' ? '-' : ''}${item.title === 'Activos' ? activeUsers.length : inactiveUsers.length}%`} />
          </Flex>
          <Flex marginTop='mt-4' spaceX='space-x-2'>
            <Text>{`${item.title === 'Activos' ? activeUsers.length : inactiveUsers.length} (${(item.title === 'Activos' ? activeUsers.length : inactiveUsers.length) / totalUsers * 100}%)`}</Text>
          </Flex>
          {/* Mostrar la barra de progreso según el porcentaje de usuarios activos, inactivos y bloqueados */}
          <ProgressBar percentageValue={item.title === 'Activos' ? activeUsers.length / totalUsers * 100 : inactiveUsers.length / totalUsers * 100} marginTop='mt-3' />
        </Card>
      ))}
    </Grid>
  );
};

export default CardGridMapUsers;
