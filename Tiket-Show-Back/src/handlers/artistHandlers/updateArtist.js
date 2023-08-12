const changeArtist = require('../../controllers/artistControllers/changeArtist');

 const updateArtist = async  (req, res)=> {
    const {id} = req.params 
    const {firstName, lastName, nickName, email, password, phone, decription} = req.body

    try {
        const updatetArtist = await changeArtist(id, firstName, lastName, nickName, email, password, phone, decription);
        res.status(200).json(updatetArtist);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

module.exports = updateArtist