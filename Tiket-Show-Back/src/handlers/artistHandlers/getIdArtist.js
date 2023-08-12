const idArtist = require("../../controllers/artistControllers/idArtist");

 const getIdArtist = async(req, res)=>{
    const {id} = req.params;
    try {
        const getIdArtist = await idArtist(id);
        res.status(200).json(getIdArtist);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = getIdArtist