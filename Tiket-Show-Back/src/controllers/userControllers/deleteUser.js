const { User } = require("../../db");

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no existe',
            });
        }

        await user.update({ state: false });

        res.status(200).json({
            msg: 'Usuario eliminado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = deleteUser
