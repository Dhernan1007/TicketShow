// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Switch } from "@mui/material";
// import { getUserById, updateUser } from "../redux/actions";

// const UsersPanel = () => {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state?.user);
//   const [localUsers, setLocalUsers] = useState([]);
//   const [initialUsersOrder, setInitialUsersOrder] = useState([]);

//   useEffect(() => {
//     dispatch(getUserById());
//   }, [dispatch]);

//   useEffect(() => {
//     setLocalUsers(users);
//     setInitialUsersOrder(users); // Guardar el orden inicial de los usuarios
//   }, [users]);

//   const findUserByEmail = (email) => localUsers.find((user) => user.email === email);

//   const changeRol = (email) => {
//     const findUser = findUserByEmail(email);
//     if (!findUser) return;

//     const roles = ["admin", "customer", "artist"];
//     const currentRoleIndex = roles.indexOf(findUser.role);
//     const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
//     const updatedUser = { ...findUser, role: roles[nextRoleIndex] };
//     const updatedLocalUsers = localUsers.map((user) =>
//       user.email === email ? updatedUser : user
//     );

//     setLocalUsers(updatedLocalUsers);
//     dispatch(updateUser(updatedUser));
//   };

//   const changeDisabled = async (email) => {
//     const findUser = findUserByEmail(email);
//     if (!findUser) return;

//     const updatedUser = { ...findUser, disabled: !findUser.disabled };
//     const updatedLocalUsers = localUsers.map((user) =>
//       user.email === email ? updatedUser : user
//     );

//     setLocalUsers(updatedLocalUsers);

//     try {
//       await dispatch(updateUser(updatedUser));
//     } catch (error) {
//       setLocalUsers(updatedLocalUsers);
//       console.error("Error al actualizar el usuario:", error);
//     }
//   };

//   return (
//     <div className="Q w-full bg-pink-100 p-6">
//       <Box display="flex" flexWrap="wrap" gap="20px">
//         {initialUsersOrder.map((elemento) => (
//           <div key={elemento.email} className="border p-4 w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg">
//             <div className="mb-4">
//               <strong>Email:</strong> {elemento.email}
//             </div>
//             <div className="mb-4">
//               <span className="enabled">Rol: {elemento.role}</span>
//             </div>
//             <div className="mb-4">
//               <span className="enabled">Habilitado</span>
//               <Switch
//                 key={`disabled-switch-${elemento.email}`}
//                 checked={!elemento.disabled}
//                 onClick={() => changeDisabled(elemento.email)}
//                 inputProps={{ "aria-label": "controlled" }}
//               />
//               <span className="disabled">Deshabilitado</span>
//             </div>
//             <div className="flex item-center">
//               <button
//                 className="bg-primaryColor hover:bg-primaryColorDark text-white font-bold py-2 px-4 rounded"
//                 onClick={() => changeRol(elemento.email)}
//               >
//                 Cambiar Rol
//               </button>
//             </div>
//           </div>
//         ))}
//       </Box>
//     </div>
//   );
// };

// export default UsersPanel;