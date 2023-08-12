const { User } = require('../../db');

const commentPut = async (email, body = null, date = null, stars = null) => {
  const changeComment = await User.findOne({ where: { email } });

  if (!changeComment) {
    throw new Error('No se ha encontrado el usuario');
  }

  const updatedFields = {};

  if (body !== null) {
    updatedFields.body = body;
  }

  if (date !== null) {
    updatedFields.date = date;
  }

  if (stars !== null) {
    updatedFields.stars = stars;
  }

  if (Object.keys(updatedFields).length > 0) {
    await changeComment.update(updatedFields);
  }

  return updatedFields;
};

module.exports = commentPut;