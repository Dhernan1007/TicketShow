const {Artist} = require("../../db");
const {Op} = require("sequelize");

const artistByName = async (name) => {
    try {
      const nameArtist = await Artist.findOne({
        where: {
          firstName: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
  
      if (!nameArtist) {
        console.log("El artista buscado no existe en la base de datos");
      } else {
        return nameArtist;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = artistByName;
  