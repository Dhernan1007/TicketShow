const { Comment } = require('../../db');

const getComment = async (req, res) => {

  try {
    const response = await Comment.findAll()

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al buscar el comentario", error);
    res.status(500).json({ error: 'Error al buscar el comentario', message: error.message });
  }
};

module.exports = getComment;