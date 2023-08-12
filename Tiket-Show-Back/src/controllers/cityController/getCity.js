const {City} = require('../../db');
const {Op} = require('sequelize')

const searchCity = async (name)=>{
    const getCity = await City.findOne({
        where: {
            name: {
                [Op.iLike]:`%${name}%`
            }
        }
    })
    return getCity
}

module.exports = searchCity