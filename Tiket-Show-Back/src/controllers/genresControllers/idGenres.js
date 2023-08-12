const {Genre} = require('../../db');

const getId = async(id)=>{
    const idGenre = await Genre.findOne({
        where: {
            id: id,
        }
    });
    return idGenre;
}

module.exports = getId