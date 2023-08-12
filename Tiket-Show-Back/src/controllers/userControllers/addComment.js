const { User } = require('../../db');

const changeUser = async (email, body = null, stars = null) => {
  const updateUser = await User.findOne({ where: { email: email } });

  if (!updateUser) {
    return 'Usuario no encontrado';
  }

  if (body) {
    updateUser.body = body;
  }

  if (stars) {
    updateUser.stars = stars;
  }

  await updateUser.save();

  return updateUser;
};

module.exports = changeUser;