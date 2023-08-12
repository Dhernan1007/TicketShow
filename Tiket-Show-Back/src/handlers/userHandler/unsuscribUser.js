const unsuscribUser = require('../../controllers/userControllers/unsuscribUser');

module.exports = async(req, res)=>{

    const {id} = req.params;
    try {
        const deleteUser = await unsuscribUser(id);
        res.status(204).json(deleteUser);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }

}