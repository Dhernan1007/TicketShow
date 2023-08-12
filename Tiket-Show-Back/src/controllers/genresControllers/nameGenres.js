const {Genre} = require('../../db');
const {Op} = require('sequelize');

const getName = async(name)=>{
    const getGenre = await Genre.findOne({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            }
        }
    })
    return getGenre;
}
module.exports = getName