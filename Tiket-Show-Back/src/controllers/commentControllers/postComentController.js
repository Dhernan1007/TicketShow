const { Comment } = require('../../db');

const createCommentAndAssociateUser = async (req, res) => {
    const { body, stars, email, name } = req.body;

    try {
    //const { email } = req.params;

    // Si no existe el usuario, lo creamos

    // Crear un nuevo comentario en la base de datos y asociarlo con el usuario
    const createdComment = await Comment.create({
        body,
        stars,
        email,
        name,
      //userId: user.id // Asociar el comentario con el usuario
    });

    console.log(createdComment, "creando comentario");

    res.json({ comentario_creado: createdComment });
  } catch (error) {
    console.error("Error al verificar el estado del usuario:", error);
    res.status(500).json({ error: 'Error al verificar el estado del usuario', message: error.message });
  }
};

module.exports = createCommentAndAssociateUser;