const {Genre} = require('../../db');


const allGenres = async()=>{
    const findGenre = await Genre.findAll()
    return findGenre
}

module.exports = allGenres