// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
//const { authenticateToken } = require('../middleware/authMiddleware');
const { getCartItemsBackend,addToCartBackend,removeFromCartBackend,updateUser, updateCartItemBackend } = require('../controllers/cartController');

// Obtener los elementos del carrito para el usuario autenticado
//router.get('/cart',getCartItemsBackend);
// Agregar elemento al carrito para el usuario autenticado
router.post('/cart', addToCartBackend);
// Eliminar elemento del carrito para el usuario autenticado
router.delete('/cart/:itemId', removeFromCartBackend);
// Actualizar elemento del carrito para el usuario autenticado
router.put('/cart/:itemId',updateCartItemBackend);
router.put('/users/:email', updateUser);


module.exports = router;
