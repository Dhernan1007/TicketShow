// const User= require('../models/User');
const { User, CartItem } = require("../db");
// console.log(User, "Holis soy el user")
console.log(User.findOne, "Holis soy el user")
//clearconst { User } = require("../../db");
//Obtener los elementos del carrito para el usuario autenticado

const updateUser = async (req, res) => {
  try {
    const email = req.params.email; // Cambiamos 'id' por 'email' en los parámetros
    const userData = req.body;

    // Verificar si el usuario existe en la base de datos por su dirección de correo electrónico
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    await existingUser.update(userData);

    res.json({ message: 'Usuario actualizado correctamente', user: existingUser });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};






// const getCartItemsBackend = async (req, res) => {
//   try {
//     const { user } = req.body; // Obtenemos el email del usuario desde el cuerpo de la solicitud
// console.log(req.body, "necesito ver la propiedad del get")
//     // Buscamos al usuario en la base de datos utilizando el email recibido
//     const existingUser = await User.findOne({ where: { email: user } });

//     if (!existingUser) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }

//     // Buscamos los elementos del carrito asociados al usuario
//     const cartItems = await CartItem.findAll({ where: { user_id: existingUser.id } });

//     res.json({ items: cartItems });
//   } catch (error) {
//     console.error('Error al obtener el carrito:', error);
//     res.status(500).json({ message: 'Error al obtener el carrito' });
//   }
// };


const addToCartBackend = async (req, res) => {
  const { id, name, user } = req.body; // Obtenemos el email del usuario desde el cuerpo de la solicitud
  console.log(id, name, user, "esta info necesito ver si llega");

  try {
    // Buscamos al usuario en la base de datos utilizando el email recibido
    const existingUser = await User.findOne({ where: { email: user } });

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el artículo ya existe en el carrito del usuario
    const existingCartItem = await CartItem.findOne({include:{model:User, as: "cart", userId: existingUser.id}, where:{id:id} } );

    if (existingCartItem) {
      // Si el artículo ya existe, puedes actualizar su cantidad u otras propiedades si es necesario
      await existingCartItem.update({ quantity: existingCartItem.quantity + 1 }); // Por ejemplo, aquí sumamos 1 a la cantidad actual
      return res.json({ message: 'Artículo actualizado en el carrito', id: existingCartItem.id });
    } else {
      // Si el artículo no existe, lo creamos en el carrito del usuario
      const newItem = await CartItem.create({ user_id: existingUser.id, id, name, quantity: 1 }); // Por ejemplo, aquí establecemos la cantidad inicial en 1
      return res.json({ message: 'Artículo agregado al carrito', id: newItem.id });
    }

  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};



const removeFromCartBackend = async (req, res) => {
  try {
    const userId = req.body.id;
    const itemId = req.params;
    
    await CartItem.destroy({include:{model:User, as: "cart", userId}, where:{id:itemId} } );
    res.json({ message: 'Artículo eliminado del carrito', itemId });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};


const updateCartItemBackend = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body; 
    
    await CartItem.update({ quantity }, { where: { user_id: userId, id: itemId } });
    res.json({ message: 'Artículo actualizado en el carrito', itemId, quantity });
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};


module.exports = {
  //getCartItemsBackend,
  addToCartBackend,
  removeFromCartBackend,
  updateUser,
  updateCartItemBackend,
};
