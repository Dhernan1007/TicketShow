const artist = require("../../controllers/artistControllers/allArtist");

const allArtist = async (req, res)=>{
    try {
        const getArtists = await artist();
        res.status(200).json(getArtists);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

module.exports = allArtist