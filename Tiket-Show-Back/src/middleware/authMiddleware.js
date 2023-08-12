// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de acceso.' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'El token de acceso no es válido.' });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
