const { User, Artist } = require('../../db');

const stateUser = async (req, res) => {
    const { email } = req.params;
    const { role, disabled, admin } = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        const artist = await Artist.findOne({
            where: { email },
        });

        if (!user && !artist) {
            return res.status(404).json({
                msg: 'Usuario o artista no existe',
            });
        }

        if (user) {
            if (role !== undefined) {
                // Cambiar "artist" a "artista"
                const updatedRole = role === "artist" ? "artista" : role;
                await user.update({ role: updatedRole });
            }
            if (disabled !== undefined) {
                await user.update({ disabled });
            }
            if (admin !== undefined) {
                await user.update({ admin });
            }
        }

        if (artist) {
            if (role !== undefined) {
                // Cambiar "artist" a "artista"
                const updatedRole = role === "artist" ? "artista" : role;
                await artist.update({ role: updatedRole });
            }
            if (disabled !== undefined) {
                await artist.update({ disabled });
            }
            if (admin !== undefined) {
                await artist.update({ admin });
            }
        }

        res.status(200).json({
            msg: 'Usuario o artista actualizado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = stateUser;
