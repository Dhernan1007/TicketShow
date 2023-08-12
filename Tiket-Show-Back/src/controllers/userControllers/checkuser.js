const { User, Artist } = require('../../db');

const checkUserDisabled = async (req, res) => {
  const { email } = req.params;

  try {
    const artist = await Artist.findOne({
      where: { email: email },
      attributes: ['disabled'],
    });

    const user = await User.findOne({
      where: { email: email },
      attributes: ['disabled'],
    });

    const isDisabled = artist?.disabled || user?.disabled || false;
    res.json({ disabled: isDisabled });
  } catch (error) {
    console.error("Error al verificar el estado del usuario:", error);
    res.status(500).json({ error: 'Error al verificar el estado del usuario' });
  }
};

module.exports = checkUserDisabled;