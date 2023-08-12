const changeUser = require('../../controllers/userControllers/addComment');

 const getComment = async  (req, res)=> {
    const {id} = req.params 
    const {body, stars} = req.body

    try {
        const updateComments = await changeUser(id, body, stars);
        res.status(201).json(updateComments);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = getComment