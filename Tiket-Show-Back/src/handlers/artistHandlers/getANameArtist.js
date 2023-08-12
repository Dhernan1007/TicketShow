 const artistByName = require("../../controllers/artistControllers/nameArtist");

 const nameArtist = async(req, res)=>{
     const {firstName} = req.params;
    try {
        const getName = await artistByName(firstName);
        res.status(200).json(getName);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = nameArtist