const allGenres = require('../../controllers/genresControllers/allGenres');

 const getGenres = async (req, res)=>{
    try {
const genres = await allGenres();
res.status(200).json(genres)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = getGenres