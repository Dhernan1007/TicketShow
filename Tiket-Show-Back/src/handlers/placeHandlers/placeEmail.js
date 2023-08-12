const placeControl = require('../../controllers/placesController/placesEmail');

const placeEmail = async (req, res)=>{
    const {email} = req.params;
    try {
        const getEmail = await placeControl(email);
        res.status(200).json(getEmail)
    } catch (error) {
        res.status(400).json({msg: error.message})

    }
}

module.exports = placeEmail