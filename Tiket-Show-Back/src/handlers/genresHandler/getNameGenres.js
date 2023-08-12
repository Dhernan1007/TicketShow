const getName = require('../../controllers/genresControllers/nameGenres');

const nameGenres = async(req, res)=>{
    const {name} = req.params;
    try {
        const genresName = await getName(name);
        res.status(200).json(genresName);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
module.exports = nameGenres