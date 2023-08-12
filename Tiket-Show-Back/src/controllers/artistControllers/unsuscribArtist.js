const {Artist} = require('../../db');

const unsuscribArtist = async (id)=>{
    const findArtist = await Artist.findByPk(id);
    const deleteArtist = await findArtist.destroy();

    return deleteArtist;
}

module.exports = unsuscribArtist